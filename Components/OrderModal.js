import React, { useState } from 'react';
import { Modal, useMantineTheme } from '@mantine/core';
import css from '../styles/OrderModal.module.css'
import { createOrder } from '../lib/orderHandler';
import toast, { Toaster } from 'react-hot-toast';
import { useStore } from '../Store/store';

const OrderModal = ({ opened, setOpened, paymentMethod }) => {
    const theme = useMantineTheme();
    const [formData, setFormData] = useState({});
    const handleInput = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const resetCart = useStore((state) => state.resetCart)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const id = await createOrder({ ...formData, total, paymentMethod });
        toast.success('Order Placed')
        resetCart();
        {
            typeof window !== 'undefined' && localStorage.setItem('order' , id)
        }
    }
    const total = typeof window !== 'undefined' && localStorage.getItem('total')
    return (
        <Modal
            overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
            overlayOpacity={0.55}
            overlayBlur={3}
            opened={opened}
            onClose={() => setOpened(null)}
        >
            {/* Modal content */}

            <form onSubmit={handleSubmit} action='' className={css.formContainer}>
                <input onChange={handleInput} type="text" name='name' required placeholder='Name' />
                <input onChange={handleInput} type="text" name='phone' required placeholder='Phone Number' />
                <textarea onChange={handleInput} name="address" placeholder='Address' rows={3} ></textarea>
                <span>
                    You will pay <span>${total}</span> on delivery
                </span>
                <button type='submit' className='btn'>Place Order</button>
            </form>
            <Toaster />
        </Modal>
    );
};

export default OrderModal;