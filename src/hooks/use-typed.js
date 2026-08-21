import { useEffect, useState } from 'react';

/**
 * Minimal typewriter effect: types each string, pauses, deletes, moves on.
 * Replaces the react-typed dependency.
 */
export default function useTyped(strings, { typeSpeed = 65, backSpeed = 35, pause = 1800 } = {}) {
    const [text, setText] = useState('');
    const [blink, setBlink] = useState(true);

    useEffect(() => {
        let index = 0;
        let char = 0;
        let deleting = false;
        let timer;

        const tick = () => {
            const current = strings[index % strings.length];
            char = deleting ? char - 1 : char + 1;
            setText(current.slice(0, char));

            let delay = deleting ? backSpeed : typeSpeed;
            if (!deleting && char === current.length) {
                deleting = true;
                delay = pause;
            } else if (deleting && char === 0) {
                deleting = false;
                index += 1;
                delay = 400;
            }
            timer = setTimeout(tick, delay);
        };

        timer = setTimeout(tick, 400);
        return () => clearTimeout(timer);
    }, [strings, typeSpeed, backSpeed, pause]);

    useEffect(() => {
        const t = setInterval(() => setBlink((b) => !b), 530);
        return () => clearInterval(t);
    }, []);

    return { text, blink };
}
