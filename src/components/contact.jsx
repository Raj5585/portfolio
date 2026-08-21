import emailjs from '@emailjs/browser';
import React, { useRef, useState } from 'react';
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { FiAtSign, FiCheckCircle, FiMapPin, FiPhone, FiSend } from 'react-icons/fi';
import { contactsData } from '../data/contactsData';
import Fade from './fade';
import './contact.css';

const EMAILJS_SERVICE_ID = 'service_5ejz9w9';
const EMAILJS_TEMPLATE_ID = 'template_1yy53ck';
const EMAILJS_PUBLIC_KEY = 'abnWBNqvUGpasAVNK';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const SOCIALS = [
    { key: 'github', icon: FaGithub, label: 'GitHub' },
    { key: 'linkedIn', icon: FaLinkedin, label: 'LinkedIn' },
    { key: 'twitter', icon: FaTwitter, label: 'Twitter' },
    { key: 'facebook', icon: FaFacebook, label: 'Facebook' },
];

function Contact() {
    const form = useRef();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [status, setStatus] = useState({ kind: 'idle', text: '' });
    const [sending, setSending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!name || !email || !message) {
            setStatus({ kind: 'error', text: 'Please fill in all the fields.' });
            return;
        }
        if (!EMAIL_RE.test(email)) {
            setStatus({ kind: 'error', text: 'That email address doesn’t look right.' });
            return;
        }

        setSending(true);
        emailjs
            .sendForm(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, form.current, EMAILJS_PUBLIC_KEY)
            .then(
                () => {
                    setStatus({ kind: 'success', text: 'Message sent — I’ll get back to you soon!' });
                    setName('');
                    setEmail('');
                    setMessage('');
                    setSending(false);
                },
                (error) => {
                    setStatus({
                        kind: 'error',
                        text: error?.text || 'Could not send your message. Please try again.',
                    });
                    setSending(false);
                }
            );
    };

    return (
        <section className='section' id='contacts'>
            <div className='container'>
                <Fade>
                    <div className='section-head'>
                        <p className='section-eyebrow'>05 — Contact</p>
                        <h2 className='section-title'>
                            Let&apos;s build something <span className='gradient-text'>together.</span>
                        </h2>
                    </div>
                </Fade>

                <div className='contact-grid'>
                    <Fade direction='left'>
                        <div className='contact-info'>
                            <p className='contact-lead'>
                                Have a project in mind, a role to discuss, or just want to say
                                hi? My inbox is always open.
                            </p>

                            <div className='contact-rows'>
                                <a href={`mailto:${contactsData.email}`} className='contact-row'>
                                    <span className='contact-row-icon'>
                                        <FiAtSign />
                                    </span>
                                    {contactsData.email}
                                </a>
                                <a href={`tel:${contactsData.phone}`} className='contact-row'>
                                    <span className='contact-row-icon'>
                                        <FiPhone />
                                    </span>
                                    {contactsData.phone}
                                </a>
                                <div className='contact-row'>
                                    <span className='contact-row-icon'>
                                        <FiMapPin />
                                    </span>
                                    {contactsData.address}
                                </div>
                            </div>

                            <div className='contact-socials'>
                                {SOCIALS.filter((s) => contactsData[s.key]).map((s) => (
                                    <a
                                        key={s.key}
                                        href={contactsData[s.key]}
                                        target='_blank'
                                        rel='noreferrer'
                                        aria-label={s.label}
                                        className='contact-social'
                                    >
                                        <s.icon />
                                    </a>
                                ))}
                            </div>
                        </div>
                    </Fade>

                    <Fade direction='right' delay={120}>
                        <form ref={form} onSubmit={handleSubmit} className='card contact-form'>
                            <label className='contact-field'>
                                <span>Name</span>
                                <input
                                    type='text'
                                    name='user_name'
                                    placeholder='Your name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </label>
                            <label className='contact-field'>
                                <span>Email</span>
                                <input
                                    type='email'
                                    name='user_email'
                                    placeholder='you@example.com'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </label>
                            <label className='contact-field'>
                                <span>Message</span>
                                <textarea
                                    name='message'
                                    rows={5}
                                    placeholder='Tell me about it…'
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                />
                            </label>

                            <button type='submit' className='btn btn-primary contact-submit' disabled={sending}>
                                {status.kind === 'success' ? (
                                    <>
                                        Sent <FiCheckCircle />
                                    </>
                                ) : (
                                    <>
                                        {sending ? 'Sending…' : 'Send message'} <FiSend />
                                    </>
                                )}
                            </button>

                            {status.kind !== 'idle' && (
                                <p className={`contact-status contact-status--${status.kind}`} role='status'>
                                    {status.text}
                                </p>
                            )}
                        </form>
                    </Fade>
                </div>
            </div>
        </section>
    );
}

export default Contact;
