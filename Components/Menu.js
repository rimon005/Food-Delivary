import Image from 'next/image';
import React from 'react';
import { urlFor } from '../lib/client';
import css from '../styles/Menu.module.css'
import Link from 'next/link'

const Menu = ({ pizzas }) => {
    // console.log(pizzas);
    return (
        <div className={css.container}>
            <div className={css.heading}>
                <span>OUR MENU</span>
                <span>Menu that always</span>
                <span>Make you Fall in Love</span>
            </div>
            <div className={css.menu}>
                {/* pizzas */}
                {
                    pizzas.pizzas.map((pizza, id) => {
                        const src = urlFor(pizza.image).url()
                        return (
                            <div className={css.pizza} key={id}>

                                <Link href={`./pizza/${pizza.slug.current}`}>
                                    <div className={css.imageWrapper}>
                                        <Image
                                            loader={() => src} layout='fill'
                                            objectFit='cover'
                                            src={src} alt="" />
                                    </div>
                                </Link>

                                <span>{pizza.name}</span>
                                <span><span style={{ color: 'var(--themeRed)' }}>$</span>{pizza.price[1]}</span>

                            </div>
                        )
                    })
                }
            </div>


        </div>
    );
};

export default Menu;