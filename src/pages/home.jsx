import React, { useEffect } from 'react';
import About from '../components/about';
import Contact from '../components/contact';
import Hero from '../components/hero';
import Journey from '../components/journey';
import Navbar from '../components/navbar';
import Projects from '../components/projects';
import Skills from '../components/skills';

function HomePage() {
    useEffect(() => {
        document.title = 'Raj Kumar Dhakal | AI Engineer';
    }, []);

    return (
        <>
            <Navbar />
            <main>
                <Hero />
                <About />
                <Journey />
                <Skills />
                <Projects />
                <Contact />
            </main>
        </>
    );
}

export default HomePage;
