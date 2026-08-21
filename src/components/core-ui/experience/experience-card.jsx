import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import Fade from '../../helper/fade';
import expImgBlack from '../../../assets/svg/experience/expImgBlack.svg';
import expImgWhite from '../../../assets/svg/experience/expImgWhite.svg';
import { ThemeContext } from '../../../contexts/theme-context';
import './experience.css';

const useStyles = makeStyles(() => ({
    experienceCard: ({ theme }) => ({
        backgroundColor: theme.quaternary,
    }),
}));

function ExperienceCard({ id, company, jobtitle, startYear, endYear }) {
    const { theme } = useContext(ThemeContext);
    const classes = useStyles({ theme });

    return (
        <Fade>
            <div key={id} className={`experience-card ${classes.experienceCard}`}>
                <div className="expcard-img" style={{backgroundColor: theme.primary}}>
                    <img src={theme.type === 'light' ? expImgBlack : expImgWhite} alt="" />
                </div>
                <div className="experience-details">
                    <h6 style={{color: theme.primary}}>{startYear}-{endYear}</h6>
                    <h4 style={{color: theme.tertiary}}>{jobtitle}</h4>
                    <h5 style={{color: theme.tertiary}}>{company}</h5>
                </div>
            </div>
        </Fade>   
    )
}

export default ExperienceCard;
