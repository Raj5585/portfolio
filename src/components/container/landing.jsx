import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { ThemeContext } from '../../contexts/theme-context';
import LandingUI from '../core-ui/landing/landing-ui';

const useStyles = makeStyles((t) => ({
  resumeBtn: ({ theme }) => ({
    color: theme.primary,
    backgroundColor: theme.secondary,
    borderRadius: '30px',
    textTransform: 'inherit',
    textDecoration: 'none',
    width: '150px',
    fontSize: '1rem',
    fontWeight: '500',
    height: '50px',
    fontFamily: 'var(--primaryFont)',
    border: `3px solid ${theme.primary}`,
    transition: '500ms ease-out',
    '&:hover': {
      backgroundColor: theme.buttonColor,
      color: theme.secondary,
      border: `3px solid ${theme.buttonColor}`,
    },
    [t.breakpoints.down('sm')]: {
      width: '180px',
    },
  }),
  contactBtn: ({ theme }) => ({
    backgroundColor: theme.primary,
    color: theme.secondary,
    borderRadius: '30px',
    textTransform: 'inherit',
    textDecoration: 'none',
    width: '150px',
    height: '50px',
    fontSize: '1rem',
    fontWeight: '500',
    fontFamily: 'var(--primaryFont)',
    border: `3px solid ${theme.primary}`,
    transition: '500ms ease-out',
    '&:hover': {
      backgroundColor: theme.buttonColor,
      color: theme.secondary,
      border: `3px solid ${theme.buttonColor}`,
    },
    [t.breakpoints.down('sm')]: {
      display: 'none',
    },
  }),
}));

const Landing = () => {
  const { theme, drawerOpen } = useContext(ThemeContext);
  const classes = useStyles({ theme });

  return (
    <LandingUI drawerOpen={drawerOpen} theme={theme} classes={classes} />
  );
};

export default Landing;
