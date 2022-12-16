import React, { useEffect, useState } from 'react';
import css from '../styles/Header.module.css'
import Image from 'next/image';
import Logo from '../assets/Logo.png'
import { UilShoppingBag, UilReceipt } from '@iconscout/react-unicons'
import { useStore } from '../Store/store';
import Link from 'next/link';
const Header = () => {
    const [Order, setOrder] = useState('')

    useEffect(() => {
        setOrder(localStorage.getItem('order'))
    }, [])

    const items = useStore((state) => state.cart.pizzas.length)
    return (
        <div className={css.header}>
            {/* Logo side */}
            <div className={css.logo}>
                <Image src={Logo} alt='' height={50} width={50} />
                <span>Fudo</span>
            </div>
            {/* Menu Side  */}
            <ul className={css.menu}>
                <Link href={'/'}>Home</Link>
                <li>Menu</li>
                <li>Contact</li>
            </ul>
            {/* Right Side */}
            <div className={css.rightSide}>
                <Link href='/pizza/cart'>
                    <div className={css.cart}>
                        <UilShoppingBag size={35} color="#2E2E2E" />
                        <div className={css.badge}>
                            {items}
                        </div>
                    </div>
                </Link>
                {
                    Order && (
                        <Link href={`/order/${Order}`}>
                            <div className={css.cart}>
                                <UilReceipt size={35} color="#2E2E2E" />
                                {Order !== "" &&
                                    <div className={css.badge}>
                                        1
                                    </div>
                                }
                            </div>
                        </Link>
                    )
                }
            </div>
        </div>
    );
};

export default Header;