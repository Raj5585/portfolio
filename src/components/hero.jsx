import React from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiArrowDown, FiDownload, FiMail } from 'react-icons/fi';
import { contactsData } from '../data/contactsData';
import { headerData } from '../data/headerData';
import useTyped from '../hooks/use-typed';
import Fade from './fade';
import SketchPhoto from './sketch-photo';
import './hero.css';

const SOCIALS = [
    { key: 'github', icon: FaGithub, label: 'GitHub' },
    { key: 'linkedIn', icon: FaLinkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: FaTwitter, label: 'Twitter' },
    { key: 'facebook', icon: FaFacebook, label: 'Facebook' },
];

function Hero() {
    const { text, blink } = useTyped(headerData.roles);

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
                    <div className='hero-visual'>
                        <div className='hero-photo-ring' />
                        <SketchPhoto src={headerData.image} alt='Raj Kumar Dhakal' />
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
