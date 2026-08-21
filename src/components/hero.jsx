import React, { useEffect, useRef, useState } from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi';
import { contactsData } from '../data/contactsData';
import { headerData } from '../data/headerData';
import useTyped from '../hooks/use-typed';
import Fade from './fade';
import './hero.css';

const SOCIALS = [
    { key: 'github', icon: FaGithub, label: 'GitHub' },
    { key: 'linkedIn', icon: FaLinkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: FaTwitter, label: 'Twitter' },
    { key: 'facebook', icon: FaFacebook, label: 'Facebook' },
];

const DODGE_MOVES = [
    [0, -34],
    [0, 34],
    [-40, 0],
    [40, 0],
    [-28, -24],
    [30, 26],
];

function Hero() {
    const { text, blink } = useTyped(headerData.roles);

    // The photo playfully dodges the cursor: dart a random direction,
    // then spring back.
    const [dodge, setDodge] = useState({ x: 0, y: 0 });
    const dodgeTimer = useRef(null);

    const handleDodge = () => {
        const [x, y] = DODGE_MOVES[Math.floor(Math.random() * DODGE_MOVES.length)];
        setDodge({ x, y });
        clearTimeout(dodgeTimer.current);
        dodgeTimer.current = setTimeout(() => setDodge({ x: 0, y: 0 }), 550);
    };

    useEffect(() => () => clearTimeout(dodgeTimer.current), []);

    return (
        <section className='hero' id='top'>
            <div className='grid-bg' />
            <div className='orb hero-orb-a' />
            <div className='orb hero-orb-b' />

            <div className='container hero-inner'>
                <div className='hero-text'>
                    <Fade direction='bottom' delay={0}>
                        <p className='hero-hello'>
                            <span className='hero-hello-line' /> Hello, I&apos;m
                        </p>
                    </Fade>

                    <Fade direction='bottom' delay={90}>
                        <h1 className='hero-name'>
                            Raj Kumar
                            <br />
                            <span className='gradient-text'>Dhakal</span>
                        </h1>
                    </Fade>

                    <Fade direction='bottom' delay={180}>
                        <p className='hero-typed'>
                            {text}
                            <span className={`hero-caret ${blink ? 'hero-caret--on' : ''}`}>|</span>
                        </p>
                    </Fade>

                    <Fade direction='bottom' delay={260}>
                        <p className='hero-desc'>{headerData.description}</p>
                    </Fade>

                    <Fade direction='bottom' delay={340}>
                        <div className='hero-actions'>
                            {headerData.resumePdf && (
                                <a
                                    href={headerData.resumePdf}
                                    target='_blank'
                                    rel='noreferrer'
                                    className='btn btn-primary'
                                >
                                    <FiDownload /> Download CV
                                </a>
                            )}
                            <a href='#contacts' className='btn btn-ghost'>
                                <FiMail /> Get in touch
                            </a>
                        </div>
                    </Fade>

                    <Fade direction='bottom' delay={420}>
                        <div className='hero-socials'>
                            {SOCIALS.filter((s) => contactsData[s.key]).map((s) => (
                                <a
                                    key={s.key}
                                    href={contactsData[s.key]}
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-label={s.label}
                                    className='hero-social'
                                >
                                    <s.icon />
                                </a>
                            ))}
                        </div>
                    </Fade>
                </div>

                <Fade direction='right' delay={200} className='hero-visual-wrap'>
                    <div
                        className='hero-visual'
                        onPointerEnter={handleDodge}
                        style={{ transform: `translate(${dodge.x}px, ${dodge.y}px)` }}
                    >
                        <div className='hero-photo-ring' />
                        <img
                            src={headerData.image}
                            alt='Raj Kumar Dhakal'
                            className='hero-photo'
                            draggable={false}
                        />
                        <div className='hero-chip hero-chip-a tag'>SE II @ Verisk Nepal</div>
                        <div className='hero-chip hero-chip-b tag'>Micro Degree in AI</div>
                    </div>
                </Fade>
            </div>

            <a href='#about' className='hero-scroll' aria-label='Scroll to About'>
                <FiArrowDown />
            </a>
        </section>
    );
}

export default Hero;
