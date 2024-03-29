import { Button as ChakraButton, ButtonProps } from "@chakra-ui/react";

const Button: React.FC<ButtonProps> = ({ children, ...rest }) => {
    return (
        <ChakraButton
        bg="#EAEAFF"
        color="#000093"
        _hover={{ bg: "#CCCCFF", color: "#000093" }}
        {...rest}
        >
        {children}
        </ChakraButton>
    );
};

export default Button;
