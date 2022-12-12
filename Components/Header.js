import React from 'react';
import css from '../styles/Header.module.css'
import Image from 'next/image';
import Logo from '../assets/Logo.png'
const Header = () => {
    return (
        <div className={css.header}> 
            {/* Logo side */}
           <div className={css.logo}>
            <Image src={Logo} alt='' />
           </div>
        </div>
    );
};

export default Header;