import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'react-hot-toast'

type payloadTypes = {
    payment_ref: string,
    user_id: string,
    amount: number
    items: any
}
const ORDER_URL = ``

const successNotification = () => toast('Order Successful')
const errorNotification = () => toast('Error')

const useOrder = () => {
    return useMutation((payload: payloadTypes) => {
        return axios.post(ORDER_URL, payload)
    }, {
        onSuccess: () => {
            successNotification()
        },
        onError: () => {
            errorNotification()
        }
    })

}

export default useOrder