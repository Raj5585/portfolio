import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { projectsData } from '../data/projectsData';
import Fade from './fade';
import ProjectCard from './project-card';
import './projects.css';

function Projects() {
    if (!projectsData.length) return null;

    return (
        <section className='section' id='projects'>
            <div className='container'>
                <Fade>
                    <div className='section-head'>
                        <p className='section-eyebrow'>04 — Work</p>
                        <h2 className='section-title'>Selected projects.</h2>
                    </div>
                </Fade>

                <div className='projects-grid'>
                    {projectsData.slice(0, 3).map((p, i) => (
                        <Fade key={p.id} delay={i * 110}>
                            <ProjectCard project={p} />
                        </Fade>
                    ))}
                </div>

                {projectsData.length > 3 && (
                    <Fade delay={200}>
                        <div className='projects-more'>
                            <Link to='/projects' className='btn btn-ghost'>
                                View all projects <FiArrowRight />
                            </Link>
                        </div>
                    </Fade>
                )}
            </div>
        </section>
    );
}

export default Projects;
