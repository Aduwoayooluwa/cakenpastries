import { useContext, useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import axios, { AxiosError } from 'axios'
import { BASE_URL } from '@/services/api';
import { useAuthenticationStore } from '@/lib/store';

type payloadTypes = {
    email: string;
    password: string;
}

const { REACT_APP_BASE_URI } = process.env

const LOGIN_URL = `${BASE_URL}/auth/login`


const useLogin = (email: string, password:string) => {

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
            sessionStorage.setItem("token", data.token)
            sessionStorage.setItem('user', JSON.stringify(data?.user))
            setUserDetails(data?.user)
            setIsAuthenticated(true)
            console.log(data)
        },
        
        onError: (error: any) => {
                   // console.log(setAuth)
                    setErrorMsg(error?.response?.data?.error)

                    if (error.message === "Network Error") {
                        return
                    }

            },
            
            retry: false
        

    });

}

export default useLogin
