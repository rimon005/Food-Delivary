import { client } from '../../lib/client'
import Layouts from '../../Components/Layouts'
import { UilBill , UilBox } from '@iconscout/react-unicons'
import css from '../../styles/Order.module.css'
import cooking from '../../assets/cooking.png'
import onWay from '../../assets/onway.png'
import Spinner from '../../assets/spinner.svg'
import Image from 'next/image'
import { useEffect } from 'react'
export const getServerSideProps = async ({ params }) => {
    const query = `*[_type == 'order' && _id == '${params.id}']`
    const order = await client.fetch(query);

    return {
        props: {
            order: order[0]
        }
    }
}

export default function Orders(order) {
    useEffect(()=> {
        if(order.order.status > 3){
            localStorage.clear();
        }
    },[order.order])
    return (
        <Layouts >
            <div className={css.container}>
                <span className={css.heading}>
                    Order in Process
                </span>
                <div className={css.details}>
                    <div>
                        <span>ID</span>
                        <span>{order.order._id}</span>
                    </div>
                    <div>
                        <span>Customer Name</span>
                        <span>{order.order.name}</span>
                    </div>
                    <div>
                        <span>Phone</span>
                        <span>{order.order.phone}</span>
                    </div>
                    <div>
                        <span>Method</span>
                        <span>
                            {
                                order.order.method === 0 ? 'Cash on Deliver' : 'online payment(Paid) '
                            }
                        </span>
                    </div>
                    <div>
                        <span>Total</span>
                        <span>${order.order.total}</span>
                    </div>
                </div>

                <div className={css.statusContainer}>
                    <div className={css.status}>
                        <UilBill width={50} height={50}/>
                        <span>Payment</span>
                        {
                            order.order.method === 0 ? 
                            <span className={css.pending}> On Delivery</span>:
                            <span className={css.completed}> Completed</span>
                        }
                    </div>

                    <div className={css.status}>
                        <Image src={cooking} alt='' width={50} height={50} />
                        <span>Cooking</span>
                        {
                            order.order.status === 1 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt='' />
                                </div>
                            )
                        }
                        {
                            order.order.status > 1 && (
                                <span className={css.completed}>Completed</span>
                            )
                        }
                    </div>

                    <div className={css.status}>
                        <Image src={onWay} alt='' width={50} height={50} />
                        <span>OnWay</span>
                        {
                            order.order.status === 2 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt='' />
                                </div>
                            )
                        }
                        {
                            order.order.status > 2 && (
                                <span className={css.completed}>Completed</span>
                            )
                        }
                    </div>

                    <div className={css.status}>
                        <UilBox width={50} height={50}  />
                        <span>Delivered</span>
                        {
                            order.order.status === 3 && (
                                <div className={css.spinner}>
                                    <Image src={Spinner} alt='' />
                                </div>
                            )
                        }
                        {
                            order.order.status > 3 && (
                                <span className={css.completed}>Completed</span>
                            )
                        }
                    </div>
                </div>
            </div>
        </Layouts>
    )
};
