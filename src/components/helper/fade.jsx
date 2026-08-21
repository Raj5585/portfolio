import React, { useEffect, useRef, useState } from 'react';
import './fade.css';

/**
 * Reveals its children once they scroll into view.
 * Replaces `react-reveal`, which is unmaintained and warns on React 18.
 * Respects `prefers-reduced-motion` and degrades to "always visible"
 * where IntersectionObserver is unavailable.
 */
function Fade({ children, direction = 'bottom', duration = 600, delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;

        if (!node || typeof IntersectionObserver === 'undefined') {
            setVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`fade fade--${direction} ${visible ? 'fade--visible' : ''}`}
            style={{
                transitionDuration: `${duration}ms`,
                transitionDelay: `${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

export default Fade;
