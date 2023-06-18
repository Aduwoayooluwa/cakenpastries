import { useAuthenticationStore } from '@/lib/store'
import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import Cookies from 'js-cookie';
import { useQueryClient } from '@tanstack/react-query';

type payloadTypes = {
    role: string,
    password: string,
    email: string
    name: string
}

const { REACT_APP_BASE_URI } = process.env

const REGISTER_URL = `${BASE_URL}/auth/register`

const successNotification = () => toast('Account creation Successful')
const errorNotification = (message: string) => toast(message)

const useRegister = () => {
    const router =  useRouter()
    const queryClient = useQueryClient()

    const { setUserDetails, setIsAuthenticated } = useAuthenticationStore()

    return useMutation((payload: payloadTypes) => {
        return axios.post(REGISTER_URL, payload, {
            headers: {
                "Access-Control-Allow-Origin": "*",
                'Content-Type': 'application/json'
            }
        });
    }, {
        onSuccess: ({ data }) => {
            //console.log(data)

        router.push("/login")
        successNotification()
        },
        onError: (error: any) => {
            errorNotification(error.message || "Error while registering...")
            if (error.message === "Network Error") {
                return
            }
            //console.log(error)
        }
    })

}

export default useRegister
