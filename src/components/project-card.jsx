import React from 'react';
import { FaCode, FaGithub } from 'react-icons/fa';
import { FiArrowUpRight } from 'react-icons/fi';
import placeholder from '../assets/png/placeholder.png';
import './project-card.css';

function ProjectCard({ project }) {
    const { projectName, projectDesc, tags, code, demo, image } = project;
    const primaryLink = (demo && demo.trim()) || (code && code.trim()) || null;

    return (
        <article className='card project-card'>
            <div className='project-media'>
                <img src={image || placeholder} alt={projectName} loading='lazy' />
            </div>
            <div className='project-body'>
                <div className='project-title-row'>
                    <h3 className='project-title'>{projectName}</h3>
                    <div className='project-links'>
                        {code && code.trim() && (
                            <a
                                href={code}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={`${projectName} source code`}
                                className='project-link'
                            >
                                <FaCode />
                            </a>
                        )}
                        {demo && demo.trim() && (
                            <a
                                href={demo}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={`${projectName} on GitHub`}
                                className='project-link'
                            >
                                <FaGithub />
                            </a>
                        )}
                        {primaryLink && (
                            <a
                                href={primaryLink}
                                target='_blank'
                                rel='noreferrer'
                                aria-label={`Open ${projectName}`}
                                className='project-link project-link--arrow'
                            >
                                <FiArrowUpRight />
                            </a>
                        )}
                    </div>
                </div>
                <p className='project-desc'>{projectDesc}</p>
                <div className='project-tags'>
                    {tags.map((t) => (
                        <span className='tag' key={t}>
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

export default ProjectCard;
