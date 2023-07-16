import React, { useState, useEffect } from 'react'
import { useFlutterwave, closePaymentModal } from 'flutterwave-react-v3';
import Cookies from 'js-cookie';
import useGetSubtotal from './useGetSubtotal';


const usePayment = (subtotalToBePayed: number, payment_ref: string) => {
    let userInfo;
    const real_publickey = "FLWPUBK-64c75350874e4ff079114051bc423779-X"
    const test_publickey = "FLWPUBK_TEST-25a1368444a5e8a0519d88b11589f3dd-X"

    const [amountToBePaid, setAmountToBePaid] = useState(0)
    const [address, setAddress] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')


    useEffect(() => {
        if (typeof window !== "undefined") {
            setAmountToBePaid(JSON.parse(window.sessionStorage.getItem('subtotal')!))
            setAddress(window.localStorage.getItem('address')!)
            setPhoneNumber((window.localStorage.getItem('phoneNumber')!))
        }
    }, [])

    let subtotalID;

    if (typeof window !== 'undefined') {
        userInfo = Cookies.get('userDetails') ? JSON.parse(Cookies.get('userDetails')!) : null;
         // getting the proce from the server
        subtotalID = Cookies.get("subtotalId") ? JSON.parse(Cookies.get("subtotalId")!) : null
    }

    const { data } = useGetSubtotal(subtotalID)

    //let subtotalToBePayed = data?.data?.message?.subtotal
    //console.log(subtotalToBePayed)
    const config = {
        public_key: real_publickey,
        tx_ref: payment_ref,
        amount:subtotalToBePayed,
        address,
        currency: 'NGN',
        payment_options: 'card,mobilemoney,ussd',
        customer: {
            email: userInfo?.email,
            phone_number: phoneNumber,
            name: userInfo?.name,
        },
    
        customizations: {
            title: 'Cake and Pastries Payment',
            description: 'Food Payment',
            logo: 'https://st2.depositphotos.com/4403291/7418/v/450/depositphotos_74189661-stock-illustration-online-shop-log.jpg',
        },
    };

    const handleFlutterPayment = useFlutterwave(config)

    return { closePaymentModal, handleFlutterPayment }
}

export default usePayment
