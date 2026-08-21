import emailjs from '@emailjs/browser';
import { makeStyles } from '@mui/styles';
import React, { useContext, useRef, useState } from 'react';
import isEmail from 'validator/lib/isEmail';
import { ThemeContext } from '../../contexts/theme-context';
import ContactUI from '../core-ui/contacts/contacts-ui';

const EMAILJS_SERVICE_ID = 'service_5ejz9w9';
const EMAILJS_TEMPLATE_ID = 'template_1yy53ck';
const EMAILJS_PUBLIC_KEY = 'abnWBNqvUGpasAVNK';

const useStyles = makeStyles(() => ({
  input: ({ theme }) => ({
    border: `2px solid ${theme.buttonColor}`,
    backgroundColor: theme.secondary,
    color: theme.tertiary,
    fontFamily: 'var(--primaryFont)',
    fontWeight: 500,
    transition: 'border 0.2s ease-in-out',
    '&:focus': {
      border: `2px solid ${theme.primary}`,
    },
  }),
  message: ({ theme }) => ({
    border: `2px solid ${theme.buttonColor}`,
    backgroundColor: theme.secondary,
    color: theme.tertiary,
    fontFamily: 'var(--primaryFont)',
    fontWeight: 500,
    transition: 'border 0.2s ease-in-out',
    '&:focus': {
      border: `2px solid ${theme.primary}`,
    },
  }),
  label: ({ theme }) => ({
    backgroundColor: theme.secondary,
    color: theme.tertiary,
    fontFamily: 'var(--primaryFont)',
    fontWeight: 600,
    fontSize: '0.9rem',
    padding: '0 5px',
    transform: 'translate(25px,50%)',
    display: 'inline-flex',
  }),
  socialIcon: ({ theme }) => ({
    width: '45px',
    height: '45px',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '21px',
    backgroundColor: theme.buttonColor,
    color: theme.secondary,
    transition: '250ms ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
      color: theme.secondary,
      backgroundColor: theme.primary,
    },
  }),
  detailsIcon: ({ theme }) => ({
    backgroundColor: theme.buttonColor,
    color: theme.secondary,
    borderRadius: '50%',
    width: '45px',
    height: '45px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '23px',
    transition: '250ms ease-in-out',
    flexShrink: 0,
    '&:hover': {
      transform: 'scale(1.1)',
      color: theme.secondary,
      backgroundColor: theme.primary,
    },
  }),
  submitBtn: ({ theme }) => ({
    backgroundColor: theme.primary,
    color: theme.secondary,
    transition: '250ms ease-in-out',
    '&:hover': {
      transform: 'scale(1.08)',
      color: theme.secondary,
      backgroundColor: theme.buttonColor,
    },
  }),
}));

const Contacts = () => {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const form = useRef();

  const { theme } = useContext(ThemeContext);
  const classes = useStyles({ theme });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleContactForm = (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      setErrMsg('Enter all the fields');
      setOpen(true);
      return;
    }

    if (!isEmail(email)) {
      setErrMsg('Invalid email');
      setOpen(true);
      return;
    }

    emailjs
      .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
      .then(
        () => {
          setSuccess(true);
          setErrMsg('');
          setName('');
          setEmail('');
          setMessage('');
          setOpen(false);
        },
        (error) => {
          setSuccess(false);
          setErrMsg(error?.text || 'Could not send your message. Please try again.');
          setOpen(true);
        }
      );
  };

  return (
    <ContactUI
      open={open}
      success={success}
      errMsg={errMsg}
      handleClose={handleClose}
      classes={classes}
      handleContactForm={handleContactForm}
      name={name}
      setName={setName}
      form={form}
      email={email}
      setEmail={setEmail}
      message={message}
      setMessage={setMessage}
    />
  );
};

export default Contacts;
