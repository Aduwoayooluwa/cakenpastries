import axios from 'axios'
import Cookies from 'js-cookie'
import React from 'react'

type Props = {}

const usePostSubtotal = (subtotal: number) => {

    const subtotalId = Date.now()
    
    const handlePostSubtotal = async () => {
        Cookies.set('subtotalId', JSON.stringify(subtotalId))
        
        try {
                await axios.post("api/savePrice", {
                    subtotal: subtotal,
                    id: subtotalId
                    },
                    {
                    
                    })
                    .then((response) => {
                        console.log(response)
                        
                    })
            }
            catch (error) {
                console.log(error)
            
                }
                finally {
                    
                }
            }
            return { handlePostSubtotal }
}

export default usePostSubtotal