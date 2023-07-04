import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ModalContext } from '@/context/ModalContext'
import { useContext } from "react"
import { useRouter } from 'next/router'
import { useEffect } from "react"
import Cookie from 'js-cookie'




const useOrder = (address: string, items: any, 
                payment_ref: string, amount: number,
                name: string, phoneNumber: string,
                location: string, 
                deliveryFee: number,
                setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
    

    
    let proteinCart: any;

    if (typeof window !== 'undefined') {
        proteinCart = Cookie.get('proteinCart') && JSON.parse(Cookie.get('proteinCart')!)
    }   
        
    
    const router = useRouter()
    // order url
    const ORDER_URL = `${BASE_URL}/create-order?address=${encodeURIComponent(address)}&user_id=4&items=${encodeURIComponent(JSON.stringify(items))}&payment_ref=${encodeURIComponent(payment_ref)}&amount=${amount}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phoneNumber)}&location=${encodeURIComponent(location)}&deliveryFee=${encodeURIComponent(deliveryFee)}&protein=${encodeURIComponent(JSON.stringify(proteinCart))}}`
    
    return useMutation(() => {
        return axios.post(ORDER_URL, {
            
        })
    }, {
        onSuccess: ({ data }) => {

            setTimeout(() => {
                //router.push("/")
                // console.log(router)
            }, 2000)
            
        },
        onError: (error: any) => {
            
            //errorNotification(error?.response.data?.message)
        }
    })

}

export default useOrder