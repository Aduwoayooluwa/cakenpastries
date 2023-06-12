import React, { createContext, useState } from 'react'

interface ModalInterface {
    isSuccessModalOpen: boolean
    setIsSuccessModalOpen: React.Dispatch<React.SetStateAction<boolean>>
}
export const ModalContext = createContext<any>({})

type ModalProvProps = {
    children: JSX.Element
}


const ModalProvider = ({ children }: ModalProvProps) => {
     // success modal 
    const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false)

    return (
        <ModalContext.Provider value={{
            isSuccessModalOpen,
            setIsSuccessModalOpen
        }}>
            {children}
        </ModalContext.Provider>
    )
}

export default ModalProvider;