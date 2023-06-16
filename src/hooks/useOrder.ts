import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { ModalContext } from '@/context/ModalContext'
import { useContext } from "react"
import { useRouter } from 'next/router'

const successNotification = () => toast('You have successfully ordered...')
const errorNotification = (error: string) => toast(error)

const useOrder = (address: string, items: any, 
                payment_ref: string, amount: number,
                name: string, phoneNumber: string,
                location: string, 
                deliveryFee: number,
                setOrderSuccess: React.Dispatch<React.SetStateAction<boolean>>) => {
    
    // bringing the success modal from the useContext
    const { setIsSuccessModalOpen } = useContext(ModalContext)  
    
    const router = useRouter()
    // order url
    const ORDER_URL = `${BASE_URL}/create-order?address=${encodeURIComponent(address)}&user_id=4&items=${encodeURIComponent(JSON.stringify(items))}&payment_ref=${encodeURIComponent(payment_ref)}&amount=${amount}&name=${encodeURIComponent(name)}&phone=${encodeURIComponent(phoneNumber)}&location=${encodeURIComponent(location)}&deliveryFee=${encodeURIComponent(deliveryFee)}`
    
    
    return useMutation(() => {
        return axios.post(ORDER_URL, {
            
        })
    }, {
        onSuccess: ({ data }) => {
            successNotification()
            setOrderSuccess(true)
            setIsSuccessModalOpen(true)
            //console.log(data)
            setTimeout(() => {
                router.push("/")
                localStorage?.clear()
                router.reload()
            }, 1000)
            setTimeout(() => {
                // router.push("/")
                // console.log(router)
            }, 2000)
            
        },
        onError: (error: any) => {
            errorNotification('error')
            errorNotification(error?.response.data?.message)
        }
    })

}

export default useOrder