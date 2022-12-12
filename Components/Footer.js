import React from 'react';
import Image from 'next/image'
import Logo from '../assets/Logo.png'
import {UilFacebook , UilGithub , UilLinkedin } from '@iconscout/react-unicons'
import css from '../styles/Footer.module.css'
const Footer = () => {
    return (
        <div className={css.container}>
            <span>ALL RIGHT RESERVED</span>
            <div className={css.social}>
                <UilFacebook size={54} />
                <UilGithub  size={54}/>
                <UilLinkedin size={54} />
            </div>
            <div className={css.logo}>
                <Image src={Logo} alt='' height={50} width={50} />
                <span>Fudo</span>
            </div>
        </div>
    );
};

export default Footer;