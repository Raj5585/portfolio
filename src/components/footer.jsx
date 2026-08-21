import React from 'react';
import './footer.css';

function Footer() {
    return (
        <footer className='footer'>
            <div className='container footer-inner'>
                <p>
                    © 2022 <span className='footer-name'>Raj Kumar Dhakal</span>
                </p>
                <p className='footer-note'>
                    Designed & built with <span className='footer-heart'>❤</span> & care in{' '}
                    <span className='footer-flag'>🇳🇵</span>
                </p>
            </div>
        </footer>
    );
}

export default Footer;
