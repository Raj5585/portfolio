import React, { useEffect, useState } from 'react';
import { FiArrowUp } from 'react-icons/fi';
import './back-to-top.css';

function BackToTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const onScroll = () => setVisible(window.scrollY > 400);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
        <button
            className={`back-to-top ${visible ? 'back-to-top--visible' : ''}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            aria-label='Back to top'
        >
            <FiArrowUp />
        </button>
    );
}

export default BackToTop;
