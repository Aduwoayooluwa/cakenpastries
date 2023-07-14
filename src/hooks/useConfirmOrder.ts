import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from "next/router";


const useConfirmOrder = (tx_ref:string) => {
    const ORDER_URL = `${BASE_URL}/complete-order?payment_ref=${parseInt(tx_ref)}`
    // const ORDER_URL = `${BASE_URL}/confirm_order?payment_ref=${parseInt(tx_ref)}`
    const router = useRouter()


    return useMutation(() => {
        return axios.post(ORDER_URL, {

        })
    },
        {
            onSuccess: ({ data }) => {
                
                console.log(data,'confirmed order')

                router.push("/")
                setTimeout(() => {
    
                    localStorage?.clear()
                }, 1000)
                setTimeout(() => {
                    // console.log(router)
                }, 2000)
                
            },
            onError: (error: any) => {
                
                //errorNotification(error?.response.data?.message)
            }
    })
}

export default useConfirmOrder