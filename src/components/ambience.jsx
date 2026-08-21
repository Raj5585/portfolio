import React, { useContext, useEffect, useRef } from 'react';
import { ThemeContext } from '../contexts/theme-context';
import './ambience.css';

/**
 * Full-screen seasonal particle layer: rain droplets, drifting summer
 * leaves, or falling snow. Canvas-based, pointer-events: none, pauses
 * when the tab is hidden, and disabled under prefers-reduced-motion.
 */

const COUNTS = { rain: 110, summer: 26, winter: 160 };

function makeParticle(kind, w, h, spawnAnywhere) {
    const y = spawnAnywhere ? Math.random() * h : -20 - Math.random() * 80;
    switch (kind) {
        case 'rain':
            return {
                x: Math.random() * (w + 100) - 50,
                y,
                len: 9 + Math.random() * 14,
                speed: 9 + Math.random() * 7,
                drift: 1.2 + Math.random() * 0.8,
                alpha: 0.25 + Math.random() * 0.35,
            };
        case 'summer':
            return {
                x: Math.random() * w,
                y,
                size: 5 + Math.random() * 7,
                speed: 0.5 + Math.random() * 0.9,
                sway: 0.6 + Math.random() * 1.2,
                phase: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.05,
                angle: Math.random() * Math.PI * 2,
                alpha: 0.5 + Math.random() * 0.4,
                hue: 20 + Math.random() * 75, // amber -> green
            };
        default: {
            // winter: mostly snow dots, ~1 in 5 is a real six-armed flake
            const flake = Math.random() < 0.22;
            return {
                flake,
                x: Math.random() * w,
                y,
                r: flake ? 4 + Math.random() * 5 : 1 + Math.random() * 2.8,
                speed: flake ? 0.5 + Math.random() * 0.8 : 0.7 + Math.random() * 1.6,
                sway: 0.4 + Math.random() * 1.1,
                phase: Math.random() * Math.PI * 2,
                angle: Math.random() * Math.PI * 2,
                spin: (Math.random() - 0.5) * 0.02,
                alpha: flake ? 0.5 + Math.random() * 0.4 : 0.35 + Math.random() * 0.5,
            };
        }
    }
}

function Ambience() {
    const { season, isDark } = useContext(ThemeContext);
    const canvasRef = useRef(null);
    const darkRef = useRef(isDark);
    darkRef.current = isDark;

    useEffect(() => {
        if (season === 'off') return undefined;
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let w = window.innerWidth;
        let h = window.innerHeight;
        let raf;
        let running = true;
        const dpr = Math.min(window.devicePixelRatio || 1, 2);

        const resize = () => {
            w = window.innerWidth;
            h = window.innerHeight;
            canvas.width = w * dpr;
            canvas.height = h * dpr;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };
        resize();

        let particles = Array.from({ length: COUNTS[season] }, () =>
            makeParticle(season, w, h, true)
        );
        let t = 0;

        const step = () => {
            if (!running) return;
            t += 1;
            ctx.clearRect(0, 0, w, h);
            const dark = darkRef.current;

            for (let i = 0; i < particles.length; i++) {
                let p = particles[i];

                if (season === 'rain') {
                    p.x += p.drift;
                    p.y += p.speed;
                    if (p.y > h + 30) particles[i] = p = makeParticle(season, w, h, false);
                    ctx.strokeStyle = dark
                        ? `rgba(160, 190, 255, ${p.alpha})`
                        : `rgba(70, 110, 180, ${p.alpha})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p.x - p.drift * 1.6, p.y - p.len);
                    ctx.stroke();
                } else if (season === 'summer') {
                    p.phase += 0.015 * p.sway;
                    p.x += Math.sin(p.phase) * p.sway + 0.3;
                    p.y += p.speed;
                    p.angle += p.spin;
                    if (p.y > h + 30) particles[i] = p = makeParticle(season, w, h, false);
                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate(p.angle + Math.sin(p.phase) * 0.5);
                    ctx.fillStyle = `hsla(${p.hue}, ${dark ? 70 : 60}%, ${dark ? 55 : 42}%, ${p.alpha})`;
                    ctx.beginPath();
                    ctx.ellipse(0, 0, p.size, p.size * 0.45, 0, 0, Math.PI * 2);
                    ctx.fill();
                    ctx.restore();
                } else {
                    p.phase += 0.012 * p.sway;
                    p.x += Math.sin(p.phase) * p.sway * 0.6;
                    p.y += p.speed;
                    p.angle += p.spin;
                    if (p.y > h + 14) particles[i] = p = makeParticle(season, w, h, false);
                    const snow = dark
                        ? `rgba(235, 240, 255, ${p.alpha})`
                        : `rgba(140, 160, 200, ${p.alpha})`;
                    if (p.flake) {
                        // six-armed snowflake with branch ticks
                        ctx.save();
                        ctx.translate(p.x, p.y);
                        ctx.rotate(p.angle);
                        ctx.strokeStyle = snow;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        for (let a = 0; a < 6; a++) {
                            ctx.rotate(Math.PI / 3);
                            ctx.moveTo(0, 0);
                            ctx.lineTo(0, p.r);
                            const b = p.r * 0.62;
                            const tick = p.r * 0.28;
                            ctx.moveTo(0, b);
                            ctx.lineTo(tick, b + tick);
                            ctx.moveTo(0, b);
                            ctx.lineTo(-tick, b + tick);
                        }
                        ctx.stroke();
                        ctx.restore();
                    } else {
                        ctx.fillStyle = snow;
                        ctx.beginPath();
                        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
                        ctx.fill();
                    }
                }
            }
            raf = requestAnimationFrame(step);
        };

        const onVisibility = () => {
            running = !document.hidden;
            if (running) raf = requestAnimationFrame(step);
            else cancelAnimationFrame(raf);
        };

        // weather intensity by scroll: full over the hero, dimmed over the
        // About section, and gone entirely once About scrolls away
        const clamp01 = (v) => Math.max(0, Math.min(1, v));
        const onScroll = () => {
            const about = document.getElementById('about');
            if (!about) {
                canvas.style.opacity = '1';
                return;
            }
            const vh = window.innerHeight;
            // 1 at the top, easing down to 0.35 by the time About is on screen
            const dim = 1 - 0.65 * clamp01(window.scrollY / (vh * 0.9));
            // cuts to 0 as the bottom of About leaves the upper viewport
            const cut = clamp01(about.getBoundingClientRect().bottom / (vh * 0.5));
            canvas.style.opacity = String(dim * cut);
        };
        onScroll();

        window.addEventListener('resize', resize);
        window.addEventListener('scroll', onScroll, { passive: true });
        document.addEventListener('visibilitychange', onVisibility);
        raf = requestAnimationFrame(step);

        return () => {
            running = false;
            cancelAnimationFrame(raf);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', onScroll);
            document.removeEventListener('visibilitychange', onVisibility);
        };
    }, [season]);

    if (season === 'off') return null;
    return <canvas ref={canvasRef} className='ambience' aria-hidden='true' />;
}

export default Ambience;
