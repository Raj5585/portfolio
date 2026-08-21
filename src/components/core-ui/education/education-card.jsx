import { makeStyles } from '@mui/styles';
import React, { useContext } from 'react';
import Fade from '../../helper/fade';
import eduImgBlack from '../../../assets/svg/education/eduImgBlack.svg';
import eduImgWhite from '../../../assets/svg/education/eduImgWhite.svg';
import { ThemeContext } from '../../../contexts/theme-context';
import './education.css';

const useStyles = makeStyles(() => ({
    educationCard: ({ theme }) => ({
        backgroundColor: theme.quaternary,
    }),
}));

function EducationCard({ id, institution, course, startYear, endYear }) {

    const { theme } = useContext(ThemeContext);
    const classes = useStyles({ theme });

    return (
        <Fade>
            <div key={id} className={`education-card ${classes.educationCard}`} >
                <div className="educard-img" style={{ backgroundColor: theme.primary }}>
                    <img src={theme.type === 'light' ? eduImgBlack : eduImgWhite} alt="" />
                </div>
                <div className="education-details">
                    <h6 style={{ color: theme.primary }}>{startYear}-{endYear}</h6>
                    <h4 style={{ color: theme.tertiary }}>{course}</h4>
                    <h5 style={{ color: theme.tertiary }}>{institution}</h5>
                </div>
            </div>
        </Fade>
    )
}

export default EducationCard
