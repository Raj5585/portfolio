import React from 'react';
import { aboutData } from '../data/aboutData';
import Fade from './fade';
import './about.css';

function About() {
    return (
        <section className='section' id='about'>
            <div className='container'>
                <Fade>
                    <div className='section-head'>
                        <p className='section-eyebrow'>01 — About</p>
                        <h2 className='section-title'>{aboutData.title}</h2>
                    </div>
                </Fade>

                <div className='about-grid'>
                    <div className='about-text'>
                        {aboutData.paragraphs.map((p, i) => (
                            <Fade key={i} delay={i * 90}>
                                <p>{p}</p>
                            </Fade>
                        ))}
                    </div>

                    <div className='about-stats'>
                        {aboutData.stats.map((s, i) => (
                            <Fade key={s.label} delay={120 + i * 90}>
                                <div className='card about-stat'>
                                    <span className='about-stat-value gradient-text'>{s.value}</span>
                                    <span className='about-stat-label'>{s.label}</span>
                                </div>
                            </Fade>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
