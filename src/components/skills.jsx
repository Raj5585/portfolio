import React from 'react';
import { skillsData } from '../data/skillsData';
import { skillsImage } from '../utils/skillsImage';
import Fade from './fade';
import './skills.css';

function Row({ items, reverse }) {
    // content duplicated so the loop is seamless
    const doubled = [...items, ...items];
    return (
        <div className='skills-marquee'>
            <div className={`skills-track ${reverse ? 'skills-track--reverse' : ''}`}>
                {doubled.map((skill, i) => (
                    <div className='skill-pill' key={`${skill}-${i}`}>
                        <img src={skillsImage(skill)} alt='' loading='lazy' />
                        <span>{skill}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Skills() {
    const mid = Math.ceil(skillsData.length / 2);
    const rowA = skillsData.slice(0, mid);
    const rowB = skillsData.slice(mid);

    return (
        <section className='section' id='skills'>
            <div className='container'>
                <Fade>
                    <div className='section-head'>
                        <p className='section-eyebrow'>03 — Toolbox</p>
                        <h2 className='section-title'>Technologies I work with.</h2>
                    </div>
                </Fade>
            </div>
            <Fade>
                <div className='skills-rows'>
                    <Row items={rowA} />
                    <Row items={rowB} reverse />
                </div>
            </Fade>
        </section>
    );
}

export default Skills;
