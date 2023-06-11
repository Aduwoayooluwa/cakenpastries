import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { useState } from "react"
type payloadTypes = {

}


const successNotification = () => toast('Proceeding to payment...')
const errorNotification = (error: string) => toast(error)

const useOrder = (address: string, items: any, 
                payment_ref: string, amount: number,
                name: string, phoneNumber: string,
                location: string, 
                setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
    
                    
    // order url
    const ORDER_URL = `${BASE_URL}/create-order?address=${encodeURIComponent(address)}&user_id=4&items=${items}&payment_ref=${encodeURIComponent(payment_ref)}&amount=${amount}&name=${encodeURIComponent(name)}&phoneNumber=${encodeURIComponent(phoneNumber)}&location=${encodeURIComponent(location)}`
    
    
    return useMutation(() => {
        return axios.post(ORDER_URL, {
            
        })
    }, {
        onSuccess: () => {
            successNotification()
            setOrderSuccess(true)
        },
        onError: (error: any) => {
            errorNotification('error')
            errorNotification(error?.response.data?.message)
        }
    })

}

export default useOrder