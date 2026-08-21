import React, { useEffect, useRef, useState } from 'react';
import './fade.css';

/**
 * Reveals its children once they scroll into view.
 * Respects `prefers-reduced-motion` and degrades to "always visible"
 * where IntersectionObserver is unavailable.
 */
function Fade({ children, direction = 'bottom', duration = 700, delay = 0, className = '' }) {
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
            { threshold: 0.08, rootMargin: '0px 0px -48px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={`fade fade--${direction} ${visible ? 'fade--visible' : ''} ${className}`}
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
