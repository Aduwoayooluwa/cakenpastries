import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import { BASE_URL } from '@/services/api';
import { useAuthenticationStore } from '@/lib/store';
import { useRouter } from 'next/router';
import { toast } from 'react-hot-toast';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';



type payloadTypes = {
    email: string;
    password: string;
}

const { REACT_APP_BASE_URI } = process.env

const LOGIN_URL = `${BASE_URL}/auth/login`

const successNotification = () => toast('Log in Successful')
const errorNotification = () => toast('Error while logging in')

const useLogin = (email: string, password:string) => {
    const queryClient = useQueryClient()

    const router = useRouter()

    const [errorMsg, setErrorMsg] = useState<string>("")
    const { setUserDetails, setIsAuthenticated } = useAuthenticationStore()

    return useMutation(() => {
        const payload: payloadTypes= {
            email: email,
            password: password
        };
        return axios.post(LOGIN_URL, payload);
    },  {
        onSuccess: ({ data }) => {
            const userDetailsKey: string[] = ['userDetails'];
            queryClient.setQueryData(userDetailsKey, data?.user)
            successNotification()

            Cookies.set("token", data.token)
            Cookies.set("userDetails", JSON.stringify(data?.user))
            Cookies.set("isAuth", 'true')

            localStorage.setItem("token", data.token)
            localStorage.setItem("userDetails", JSON.stringify(data?.user))
            const userDetails = JSON.parse(localStorage.getItem("userDetails")!)
            localStorage.setItem("isAuth", 'true')
            setUserDetails(userDetails)
            const isAuth = localStorage.getItem('true')!
            setIsAuthenticated(JSON.parse(isAuth))
            
            console.log(data)
            router.push("/")
        },
        
        onError: (error: any) => {
                   // console.log(setAuth)
                    errorNotification()
                    setErrorMsg(error?.response?.data?.error)

                    if (error.message === "Network Error") {
                        return
                    }

            },
            
            retry: false,
            onMutate: () => {
                const cachedData = localStorage.getItem("userDetails")

                if(cachedData) {
                    setUserDetails(JSON.parse(cachedData));
                    setIsAuthenticated(true);
                }
            }, 
            onSettled: () => {
                const cachedData = localStorage.getItem("userDetails")

                if(cachedData) {
                    setUserDetails(JSON.parse(cachedData));
                    setIsAuthenticated(true);
                }
            
            }
        

    });

}

export default useLogin
