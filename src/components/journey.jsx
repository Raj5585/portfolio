import React from 'react';
import { FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import { educationData } from '../data/educationData';
import { experienceData } from '../data/experienceData';
import Fade from './fade';
import './journey.css';

function Timeline({ icon: Icon, heading, items }) {
    return (
        <div className='journey-col'>
            <Fade>
                <h3 className='journey-heading'>
                    <span className='journey-heading-icon'>
                        <Icon />
                    </span>
                    {heading}
                </h3>
            </Fade>
            <div className='timeline'>
                {items.map((item, i) => (
                    <Fade key={item.id} delay={i * 100}>
                        <div className='timeline-item'>
                            <span className='timeline-dot' />
                            <div className='card timeline-card'>
                                <span className='timeline-date tag'>{item.date}</span>
                                <h4 className='timeline-title'>{item.title}</h4>
                                <p className='timeline-sub'>{item.sub}</p>
                            </div>
                        </div>
                    </Fade>
                ))}
            </div>
        </div>
    );
}

function Journey() {
    const range = (start, end) => (start ? `${start} — ${end}` : `${end}`);

    const experience = experienceData.map((e) => ({
        id: e.id,
        date: range(e.startYear, e.endYear),
        title: e.jobtitle,
        sub: e.company,
    }));

    const education = educationData.map((e) => ({
        id: e.id,
        date: range(e.startYear, e.endYear),
        title: e.course,
        sub: e.institution,
    }));

    return (
        <section className='section' id='experience'>
            <div className='container'>
                <Fade>
                    <div className='section-head'>
                        <p className='section-eyebrow'>02 — Journey</p>
                        <h2 className='section-title'>Where I&apos;ve been.</h2>
                    </div>
                </Fade>

                <div className='journey-grid'>
                    <Timeline icon={FaBriefcase} heading='Experience' items={experience} />
                    <Timeline icon={FaGraduationCap} heading='Education' items={education} />
                </div>
            </div>
        </section>
    );
}

export default Journey;
