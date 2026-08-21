import React from 'react';
import { FaCode, FaGithub } from 'react-icons/fa';
import Fade from '../../helper/fade';
import placeholder from '../../../assets/png/placeholder.png';
import './single-project.css';

const slugify = (value) =>
    value.trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

function SingleProjectUI({ id, name, desc, tags, code, demo, image, theme, classes }) {
    const slug = slugify(name);

    return (
        <Fade>
            <div
                className='singleProject'
                style={{ backgroundColor: theme.quaternary }}
            >
                <div className='projectContent'>
                    <h2 id={slug} style={{ color: theme.tertiary }}>
                        {name}
                    </h2>
                    <img src={image ? image : placeholder} alt={name} />
                    <div className='project--showcaseBtn'>
                        {demo && (
                            <a
                                href={demo}
                                target='_blank'
                                rel='noreferrer'
                                className={classes.iconBtn}
                                aria-labelledby={`${slug} ${slug}-demo`}
                            >
                                <FaGithub
                                    id={`${slug}-demo`}
                                    className={classes.icon}
                                    aria-label='Demo'
                                />
                            </a>
                        )}
                        {code && code.trim() && (
                            <a
                                href={code}
                                target='_blank'
                                rel='noreferrer'
                                className={classes.iconBtn}
                                aria-labelledby={`${slug} ${slug}-code`}
                            >
                                <FaCode
                                    id={`${slug}-code`}
                                    className={classes.icon}
                                    aria-label='Code'
                                />
                            </a>
                        )}
                    </div>
                </div>
                <p
                    className='project--desc'
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary,
                    }}
                >
                    {desc}
                </p>
                <div
                    className='project--lang'
                    style={{
                        background: theme.secondary,
                        color: theme.tertiary,
                    }}
                >
                    {tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            </div>
        </Fade>
    );
}

export default SingleProjectUI;
