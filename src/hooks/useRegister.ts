import { useAuthenticationStore } from '@/lib/store'
import { BASE_URL } from '@/services/api'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'

type payloadTypes = {
    role: string,
    password: string,
    email: string
    name: string
}

const { REACT_APP_BASE_URI } = process.env

const REGISTER_URL = `${BASE_URL}/auth/register/`


const useRegister = () => {
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
            sessionStorage.setItem('token', data.token)
            sessionStorage.setItem('user', JSON.stringify(data?.user))
            setUserDetails(data?.user)
            setIsAuthenticated(true)
        
        },
        onError: (error: any) => {
            if (error.message === "Network Error") {
                return
            }
        }
    })

}

export default useRegister
