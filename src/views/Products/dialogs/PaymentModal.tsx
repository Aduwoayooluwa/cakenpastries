"use client"
import React, { useState } from 'react'
import { FormControl, FormLabel, Input, Button, Modal, ModalOverlay, ModalContent, HStack, VStack, Box, Text, ModalCloseButton, ModalHeader, ModalBody, Divider, Flex } from "@chakra-ui/react"

type Props = {}

const PaymentModal = ({ setAddress, setIsPaymentDialogVisible, isDialogVisible, address, phoneNumber, setPhoneNumber }: any) => {

    //disable save dialog button
    const [buttonDisabled, setButtonDisabled] = useState(false)

    const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress(e.target.value);
    };

    const handlePhoneNumberInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    }

    const handleSaveDetails = () => {
        if (address === "" || phoneNumber === "") {
            setButtonDisabled(true)
            return 
        }

        localStorage.setItem('address', address)
        localStorage.setItem('phoneNumber', phoneNumber)
        setIsPaymentDialogVisible(false)
        
    }

    return (
        <Modal isOpen={isDialogVisible} onClose={() => {
            setIsPaymentDialogVisible(false)

        }}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader>Add Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box w="full">
                <Divider orientation="horizontal" width="full" my="20px" />
            </Box>

            <VStack>
                <FormControl>
                    <FormLabel>Address</FormLabel>
                    <Input
                    type="text"
                    value={address}
                    onChange={handleAddressChange}
                    textColor={"black"}
                    required
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <Input
                    type="tel"
                    value={phoneNumber}
                    onChange={handlePhoneNumberInput}
                    textColor={"black"}
                    required
                    />
                </FormControl>

                <Button
                    bg="#EAEAFF"
                    color="#000093"
                    _hover={{ bg: "#000093", color: "#EAEAFF" }}
                    onClick={handleSaveDetails}
                    disabled={buttonDisabled}
                >
                    Continue
                </Button>

            </VStack>


            <Divider orientation="horizontal" width="full" my="20px" />
        
            </ModalBody>
        </ModalContent>
        </Modal>
    )
}

export default PaymentModal