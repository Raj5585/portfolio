import React, { useContext, useEffect, useState } from 'react';
import { BsCloudRain, BsFillMoonFill, BsFillSunFill, BsSnow, BsCircle } from 'react-icons/bs';
import { IoClose, IoMenuSharp } from 'react-icons/io5';
import { LuLeaf } from 'react-icons/lu';
import { ThemeContext } from '../contexts/theme-context';
import './navbar.css';

const LINKS = [
    { href: '#about', label: 'About' },
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Work' },
    { href: '#contacts', label: 'Contact' },
];

const SEASON_META = {
    rain: { icon: BsCloudRain, label: 'Rainy mode' },
    summer: { icon: LuLeaf, label: 'Summer mode' },
    winter: { icon: BsSnow, label: 'Winter mode' },
    off: { icon: BsCircle, label: 'Normal mode — no weather effects' },
};

function Navbar() {
    const { isDark, changeTheme, season, cycleSeason } = useContext(ThemeContext);
    const [open, setOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 24);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    useEffect(() => {
        document.body.style.overflow = open ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const SeasonIcon = SEASON_META[season].icon;

    const controls = (
        <>
            <button
                className='nav-icon-btn'
                onClick={cycleSeason}
                aria-label={`Ambience: ${SEASON_META[season].label} — click to change`}
                title={SEASON_META[season].label}
            >
                <SeasonIcon />
            </button>
            <button
                className='nav-icon-btn'
                onClick={changeTheme}
                aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
            >
                {isDark ? <BsFillSunFill /> : <BsFillMoonFill />}
            </button>
        </>
    );

    return (
        <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
            <nav className='navbar-inner container'>
                <a href='#top' className='nav-logo' aria-label='Home'>
                    Raj Kumar
                </a>

                <div className='nav-links'>
                    {LINKS.map((l) => (
                        <a key={l.href} href={l.href} className='nav-link'>
                            {l.label}
                        </a>
                    ))}
                </div>

                <div className='nav-controls'>
                    {controls}
                    <button
                        className='nav-icon-btn nav-burger'
                        onClick={() => setOpen(true)}
                        aria-label='Open menu'
                    >
                        <IoMenuSharp />
                    </button>
                </div>
            </nav>

            <div className={`nav-overlay ${open ? 'nav-overlay--open' : ''}`}>
                <button
                    className='nav-icon-btn nav-overlay-close'
                    onClick={() => setOpen(false)}
                    aria-label='Close menu'
                >
                    <IoClose />
                </button>
                <div className='nav-overlay-links'>
                    {LINKS.map((l, i) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className='nav-overlay-link'
                            style={{ transitionDelay: `${80 + i * 60}ms` }}
                            onClick={() => setOpen(false)}
                        >
                            <span className='nav-overlay-num'>0{i + 1}</span>
                            {l.label}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
}

export default Navbar;
