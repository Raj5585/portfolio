import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const SEASONS = ['rain', 'summer', 'winter', 'off'];

const WEATHER_CACHE_KEY = 'season-weather';
const WEATHER_CACHE_TTL = 3 * 60 * 60 * 1000; // re-check every 3 hours

function getInitialTheme() {
    try {
        const stored = localStorage.getItem('theme');
        if (stored === 'light' || stored === 'dark') return stored === 'dark';
    } catch (e) {
        /* storage unavailable */
    }
    return true; // dark by default
}

function seasonForMonth() {
    const m = new Date().getMonth() + 1; // 1-12
    if (m >= 6 && m <= 9) return 'rain'; // monsoon
    if (m >= 3 && m <= 5) return 'summer';
    return 'winter';
}

function getManualSeason() {
    try {
        const stored = localStorage.getItem('season');
        if (SEASONS.includes(stored)) return stored;
    } catch (e) {
        /* storage unavailable */
    }
    return null;
}

function getCachedWeatherSeason() {
    try {
        const cached = JSON.parse(localStorage.getItem(WEATHER_CACHE_KEY) || 'null');
        if (
            cached &&
            SEASONS.includes(cached.value) &&
            Date.now() - cached.t < WEATHER_CACHE_TTL
        ) {
            return cached.value;
        }
    } catch (e) {
        /* storage unavailable or corrupt */
    }
    return null;
}

/**
 * Map live conditions to an ambience season.
 * WMO weather codes: 51-67 drizzle/rain, 71-77 & 85-86 snow,
 * 80-82 showers, 95+ thunderstorms.
 */
function seasonForWeather(code, temp) {
    if ([71, 73, 75, 77, 85, 86].includes(code)) return 'winter';
    if ((code >= 51 && code <= 67) || (code >= 80 && code <= 82) || code >= 95) return 'rain';
    if (typeof temp === 'number') {
        if (temp >= 18) return 'summer';
        if (temp <= 8) return 'winter';
    }
    return null; // mild & dry — keep the calendar's pick
}

function ThemeContextProvider({ children }) {
    const [isDark, setIsDark] = useState(getInitialTheme);
    const [season, setSeason] = useState(
        () => getManualSeason() || getCachedWeatherSeason() || seasonForMonth()
    );

    useEffect(() => {
        document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
        try {
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
        } catch (e) {
            /* storage unavailable */
        }
    }, [isDark]);

    useEffect(() => {
        document.documentElement.dataset.season = season;
    }, [season]);

    // Live weather detection: only when the visitor hasn't chosen manually
    // and there's no fresh cached reading. IP-based location (no permission
    // prompt) -> Open-Meteo current conditions. Falls back silently to the
    // calendar season on any failure.
    useEffect(() => {
        if (getManualSeason() || getCachedWeatherSeason()) return undefined;

        let cancelled = false;
        const ctl = new AbortController();
        const timer = setTimeout(() => ctl.abort(), 6000);

        (async () => {
            try {
                const geo = await fetch('https://get.geojs.io/v1/ip/geo.json', {
                    signal: ctl.signal,
                }).then((r) => r.json());

                const lat = parseFloat(geo.latitude);
                const lon = parseFloat(geo.longitude);
                if (Number.isNaN(lat) || Number.isNaN(lon)) return;

                const wx = await fetch(
                    `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code`,
                    { signal: ctl.signal }
                ).then((r) => r.json());

                const detected = seasonForWeather(
                    wx?.current?.weather_code,
                    wx?.current?.temperature_2m
                );

                if (detected && !cancelled) {
                    setSeason(detected);
                    try {
                        localStorage.setItem(
                            WEATHER_CACHE_KEY,
                            JSON.stringify({ value: detected, t: Date.now() })
                        );
                    } catch (e) {
                        /* storage unavailable */
                    }
                }
            } catch (e) {
                /* offline, blocked, or timed out — calendar season stands */
            } finally {
                clearTimeout(timer);
            }
        })();

        return () => {
            cancelled = true;
            ctl.abort();
        };
    }, []);

    const changeTheme = () => setIsDark((d) => !d);

    // Manual choice is persisted separately and always wins over detection.
    const cycleSeason = () =>
        setSeason((s) => {
            const next = SEASONS[(SEASONS.indexOf(s) + 1) % SEASONS.length];
            try {
                localStorage.setItem('season', next);
            } catch (e) {
                /* storage unavailable */
            }
            return next;
        });

    return (
        <ThemeContext.Provider value={{ isDark, changeTheme, season, cycleSeason }}>
            {children}
        </ThemeContext.Provider>
    );
}

export default ThemeContextProvider;
