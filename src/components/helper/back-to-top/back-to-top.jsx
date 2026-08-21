import { makeStyles } from '@mui/styles';
import React, { useContext, useEffect, useState } from 'react';
import { IoIosArrowDropupCircle } from 'react-icons/io';
import { ThemeContext } from '../../../contexts/theme-context';
import './back-to-top.css';

const useStyles = makeStyles(() => ({
    icon: ({ theme }) => ({
        fontSize: '2rem',
        color: theme.primary,
        '&:hover': {
            transform: 'scale(1.08)',
            color: theme.tertiary,
        },
    }),
}));

function BackToTop() {
    const [visible, setVisible] = useState(false);

    const { theme } = useContext(ThemeContext);
    const classes = useStyles({ theme });

    useEffect(() => {
        const toggleVisible = () => {
            setVisible(document.documentElement.scrollTop > 300);
        };

        toggleVisible();
        window.addEventListener('scroll', toggleVisible, { passive: true });
        return () => window.removeEventListener('scroll', toggleVisible);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <div
            style={{ display: visible ? 'inline' : 'none' }}
            className='backToTop'
        >
            <button onClick={scrollToTop} aria-label='Back to top'>
                <IoIosArrowDropupCircle className={classes.icon} />
            </button>
        </div>
    );
}

export default BackToTop;
