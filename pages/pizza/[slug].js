import Image from 'next/image';
import React, { useState } from 'react';
import Layout from '../../Components/Layouts'
import { client, urlFor } from '../../lib/client'
import css from '../../styles/pizza.module.css'
import LeftArrow from '../../assets/arrowLeft.png'
import RightArrow from '../../assets/arrowRight.png'
const Pizza = ({ pizza }) => {
    const src = urlFor(pizza.image).url();
    const [size, setSize] = useState(1);
    const [quantity , setQuantity ] = useState(1)
    // handle Quantity
    const handleQuantity = (type) =>{
        type === 'inc' ? 
        setQuantity((prev) => prev+1):
        quantity === 1 ? null : setQuantity((prev) => prev-1)

    }
    return (
        <Layout>
            <div className={css.container}>
                <div className={css.imageWrapper}>
                    <Image
                        loader={() => src}
                        src={src}
                        alt=''
                        layout='fill'
                        unoptimized
                        objectFit='cover'
                    />
                </div>
                {/* right side */}
                <div className={css.right}>
                    <span>{pizza.name}</span>
                    <span>{pizza.details}</span>
                    <span><span style={{ color: 'var(--themeRed)' }}>$</span>{pizza.price[size]}</span>
                    <div className={css.size}>
                        <span>Size</span>
                        <div className={css.SizeVariants}>
                            <div
                                onClick={() => setSize(0)}
                                className={size === 0 ? css.selected : ''}
                            >Small</div>
                            <div
                                onClick={() => setSize(1)}
                                className={size === 1 ? css.selected : ''}
                            >Medium</div>
                            <div
                                onClick={() => setSize(2)}
                                className={size === 2 ? css.selected : ''}
                            >Large</div>
                        </div>
                    </div>
                    {/* Quantity counter */}
                    <div className={css.quantity}>
                        <span>Quantity</span>
                        <div className={css.counter}>
                            <Image
                                src={LeftArrow}
                                alt=''
                                height={20}
                                width={20}
                                objectFit='contain'
                                onClick={()=>handleQuantity('dec')}
                            />
                            <span>{quantity}</span>
                            <Image
                                src={RightArrow}
                                alt=''
                                height={20}
                                width={20}
                                objectFit='contain'
                                onClick={()=> handleQuantity('inc')}
                            />
                        </div>
                    </div>
                    {/* Button  */}
                    <div className={`btn ${css.btn}`}>
                        Add to Cart
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Pizza;

export async function getStaticPaths() {
    const paths = await client.fetch(
        `*[_type=="pizza" && defined(slug.current)][].slug.current`
    )

    return {
        paths: paths.map((slug) => ({ params: { slug } })),
        fallback: 'blocking'
    }
}

export async function getStaticProps(context) {
    const { slug = "" } = context.params;
    const pizza = await client.fetch(
        `*[_type=="pizza" && slug.current == "${slug}"][0]`
    )
    return {
        props: {
            pizza,
        }
    }
}