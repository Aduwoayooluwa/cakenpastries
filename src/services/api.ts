import axios from "axios"

export const BASE_URL = `https://backend.cakesandpastries.ng/api`

const api = axios.create({
    baseURL: BASE_URL
})

export const login = async (email: any, password: any) => {
    const response = await api.post('auth/login', { email, password })
    return response.data
}