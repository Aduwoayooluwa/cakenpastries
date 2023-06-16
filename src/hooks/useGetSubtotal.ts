import React from 'react'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
type Props = {}

const useGetSubtotal = (id: number) => {
    const getSubtotal = () => {
        return axios.get(`/api/getPrice?id=${id}`, {

        })
    }

    const { data, isLoading, isError} = useQuery(["getSubtotal"], getSubtotal, {
        onSuccess: ({ data }) => {
            //console.log(data);
        },
        onError: ({ error }) => {
            //console.log(error)
        },
        cacheTime: 0
    })

    return { data, isLoading, isError }

}
export default useGetSubtotal