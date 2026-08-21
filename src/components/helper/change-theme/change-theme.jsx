import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import { BsFillMoonFill, BsFillSunFill } from 'react-icons/bs';
import { ThemeContext } from '../../../contexts/theme-context';
import './change-theme.css';

const useStyles = makeStyles(() => ({
  icon: ({ theme }) => ({
    fontSize: '1.5rem',
    color: theme.buttonColor,
    '&:hover': {
      transform: 'scale(1.08)',
      color: theme.tertiary,
    },
  }),
}));

const ChangeTheme = () => {
  const { theme, changeTheme, isDark } = useContext(ThemeContext);
  const classes = useStyles({ theme });

  return (
    <div className='changeTheme'>
      <button
        onClick={changeTheme}
        aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      >
        {isDark ?
          <BsFillSunFill className={classes.icon} />
          :
          <BsFillMoonFill className={classes.icon} />
        }
      </button>
    </div>
  );
};

export default ChangeTheme;
