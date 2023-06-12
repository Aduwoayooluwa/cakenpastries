import { Box, Text, Icon, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { motion } from "framer-motion";

interface SuccessModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
    return (
        <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
            <ModalHeader textAlign="center">Order Successful</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
            <Box display="flex" justifyContent="center" alignItems="center">
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5 }}>
                <Icon as={CheckCircleIcon} boxSize={10} color="green.500" />
                </motion.div>
            </Box>
            <Text mt={4} textAlign="center">
                Thank you for your order!
            </Text>
            <Text mt={5} textAlign="center" fontSize={"sm"}>This will automatically redirect</Text>
            </ModalBody>
        </ModalContent>
        </Modal>
    );
};

export default SuccessModal;
