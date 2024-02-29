import flutter from '../assets/svg/skills/flutter.svg'
import mysql from '../assets/svg/skills/mysql.svg'
import nginx from '../assets/svg/skills/nginx.svg'
import numpy from '../assets/svg/skills/numpy.svg'
import opencv from '../assets/svg/skills/opencv.svg'
import django from '../assets/svg/skills/django.svg'
import aws from '../assets/svg/skills/aws.svg'
import mongoDB from '../assets/svg/skills/mongoDB.svg'
import docker from '../assets/svg/skills/docker.svg'
import firebase from '../assets/svg/skills/firebase.svg'
import git from '../assets/svg/skills/git.svg'
import python from '../assets/svg/skills/python.svg'
import pytorch from '../assets/svg/skills/pytorch.svg'
import react from '../assets/svg/skills/react.svg'
import selenium from '../assets/svg/skills/selenium.svg'
import tailwind from '../assets/svg/skills/tailwind.svg'
import tensorflow from '../assets/svg/skills/tensorflow.svg'
import vitejs from '../assets/svg/skills/vitejs.svg'
import postgresql from '../assets/svg/skills/postgresql.svg';


export const skillsImage = (skill) => {
    const skillID = skill.toLowerCase();
    switch (skillID) {

        case 'docker':
            return docker;

        case 'git':
        return git;

        case 'opencv':
        return opencv;

        case 'react':
            return react;


        case 'pytorch':
            return pytorch;
;
        case 'mongodb':
            return mongoDB;
        case 'mysql':
            return mysql;
        case 'postgresql':
            return postgresql;
        case 'tailwind':
            return tailwind;
        case 'vitejs':
            return vitejs;
   
        case 'python':
            return python;
   
        case 'aws':
            return aws;
      
        case 'django':
            return django;
        case 'firebase':
            return firebase;
  
  
  
        case 'nginx':
            return nginx;
        case 'numpy':
            return numpy;

 

        case 'selenium':
            return selenium;
     
        case 'tensorflow':
            return tensorflow;

        case 'flutter':
            return flutter;
   
         
        default:
            break;
    }
}
