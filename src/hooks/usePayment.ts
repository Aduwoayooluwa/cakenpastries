import React from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Cookies from 'js-cookie';


const usePayment = (public_key: string, amount: number, phoneNumber?: string) => {
    let userInfo;

    if (typeof window !== 'undefined') {
        userInfo = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')!) : null;
    }


    const config = {
        public_key,
        tx_ref: Date.now().toString(),
        amount,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userInfo?.email,
            phone_number: phoneNumber || '070********',
            name: userInfo?.name,
        },
    
        customizations: {
            title: 'Cake and Pastries Payment',
            description: 'Food Payment',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config)

    return { config, closePaymentModal, handleFlutterPayment, userInfo }
}

export default usePayment