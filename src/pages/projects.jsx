import React, { useEffect, useMemo, useState } from 'react';
import { FiArrowLeft, FiSearch } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Fade from '../components/fade';
import ProjectCard from '../components/project-card';
import { projectsData } from '../data/projectsData';
import './projects-page.css';

function ProjectsPage() {
    const [search, setSearch] = useState('');

    useEffect(() => {
        document.title = 'Projects | Raj Kumar Dhakal';
        window.scrollTo(0, 0);
    }, []);

    const filtered = useMemo(() => {
        const q = search.trim().toLowerCase();
        if (!q) return projectsData;
        return projectsData.filter((p) =>
            [p.projectName, p.projectDesc, ...p.tags].join(' ').toLowerCase().includes(q)
        );
    }, [search]);

    return (
        <main className='projects-page'>
            <div className='grid-bg' />
            <div className='container projects-page-inner'>
                <Fade>
                    <Link to='/' className='projects-back'>
                        <FiArrowLeft /> Back home
                    </Link>
                </Fade>

                <Fade delay={60}>
                    <div className='section-head'>
                        <p className='section-eyebrow'>All work</p>
                        <h1 className='section-title'>
                            Every <span className='gradient-text'>project.</span>
                        </h1>
                    </div>
                </Fade>

                <Fade delay={120}>
                    <div className='projects-search'>
                        <FiSearch />
                        <input
                            type='text'
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder='Search by name, tech, or keyword…'
                        />
                    </div>
                </Fade>

                <div className='projects-grid projects-page-grid'>
                    {filtered.map((p, i) => (
                        <Fade key={p.id} delay={i * 80}>
                            <ProjectCard project={p} />
                        </Fade>
                    ))}
                </div>

                {!filtered.length && (
                    <p className='projects-empty'>No projects match “{search}”.</p>
                )}
            </div>
        </main>
    );
}

export default ProjectsPage;
