import Button from '@/components/buttons/button.component'
import { handleSelectAdditionalProteinChange, handleSelectChange } from '@/controller/protein.controller'
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, FormControl, Select, Center } from '@chakra-ui/react'
import Cookies from 'js-cookie'
import React from 'react'

type Props = {
    data: any[]
    selectedProteinChange: string,
    itemPrice: string
    setPlates: any
    setSelectedOption: any
    setScoopPrice: any
    items: any
    proteinCart: any
    cart: any
    scoopQuan: number,
    setslectedProteinPrice: any
    setInitialProteinPrice: any
    setSelectedProteinQuantity: any
    selectedProteinQuantity: any
    setAddMoreProteinDialog?: any
    addMoreProteinDialog: boolean
    prevProteinPrice: number,
    setSelectedAdditionalProtein: any
    selectedAdditionalProtein: any
}

const AddProteinModal = ({ data, selectedProteinChange,
    itemPrice, setPlates, setSelectedOption, setScoopPrice,
    items, proteinCart, cart, scoopQuan, setslectedProteinPrice,
    setInitialProteinPrice, setSelectedProteinQuantity, selectedProteinQuantity,
    setAddMoreProteinDialog, addMoreProteinDialog, prevProteinPrice,setSelectedAdditionalProtein,
    selectedAdditionalProtein
}: Props) => {
    return (
        <Modal isOpen={true} onClose={() => {
            setAddMoreProteinDialog(false)
        }}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Add Another Protein</ModalHeader>

                <ModalCloseButton />
                <center>Hello</center>
                <ModalBody>
                    <FormControl>
                        <Select value={selectedProteinChange}
                        onChange={(event) => {
                            handleSelectAdditionalProteinChange(event, data, proteinCart, 
                                setSelectedOption, scoopQuan, 
                                itemPrice, setScoopPrice, prevProteinPrice, items, setSelectedAdditionalProtein)
                        }}
                        placeholder='Select an Option'
                        >
                        {data?.map((item: any) => (
                            <option key={item?.id}>{item?.name}</option>
                        ))}
                        </Select>
                        <Center mt={4}>
                            <Button onClick={() => {
                                proteinCart.push({name: selectedProteinChange, quantity: 1, price: selectedAdditionalProtein?.price, id: selectedAdditionalProtein?.id})
                                Cookies.set('proteinCart', JSON.stringify(proteinCart))
                                setAddMoreProteinDialog(false)
                            }}>Add Protein</Button>
                        </Center>
                        
                    </FormControl>
                </ModalBody>
            </ModalContent>
        </Modal>
    )
}

export default AddProteinModal