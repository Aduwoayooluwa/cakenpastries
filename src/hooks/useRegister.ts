import { useAuthenticationStore } from '@/lib/store'
import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';

type payloadTypes = {
    role: string,
    password: string,
    email: string
    name: string
}

const { REACT_APP_BASE_URI } = process.env

const REGISTER_URL = `${BASE_URL}/auth/register/`

const successNotification = () => toast('Log in Successful')
const errorNotification = () => toast('Error while logging in')

const useRegister = () => {
    const router =  useRouter()

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
            console.log(data)
            successNotification()
            localStorage.setItem("token", data.token)
            localStorage.setItem("userDetails", JSON.stringify(data?.user))
            localStorage.setItem("isAuth", 'true')
            setUserDetails(data?.user)
            setIsAuthenticated(true)
            router.push("/")
        
        },
        onError: (error: any) => {
            errorNotification()
            if (error.message === "Network Error") {
                return
            }
            console.log(error)
        }
    })

}

export default useRegister
