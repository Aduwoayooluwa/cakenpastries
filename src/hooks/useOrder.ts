import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

type payloadTypes = {
    payment_ref: string,
    user_id: string,
    amount: number
    items: any
}
const ORDER_URL = `${BASE_URL}/create-order`

const successNotification = () => toast('Proceeding to payment...')
const errorNotification = (error: string) => toast(error)

const useOrder = () => {
    return useMutation((payload: payloadTypes) => {
        return axios.post(ORDER_URL, payload)
    }, {
        onSuccess: () => {
            successNotification()
        },
        onError: (error: any) => {
            errorNotification('error')
            errorNotification(error?.response.data?.message)
        }
    })

}

export default useOrder