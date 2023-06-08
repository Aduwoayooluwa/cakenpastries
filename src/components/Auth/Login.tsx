import useLogin from '@/hooks/useLogin';
import { Box, Button, FormControl, FormLabel, Input, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useState } from 'react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const { mutate: loginFunc, isLoading } = useLogin(email, password)

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Perform login logic here
        loginFunc()
    };

    const isFormValid = email && password;

    return (
        <Box minWidth={{base: "full", md:"400px"}} shadow={"md"} px="20px" py="10px">
        <form onSubmit={handleSubmit}>
            <Text  fontSize={"xl"} my="10px" fontWeight={"bold"}>Login to Continue</Text>
            <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" value={email} onChange={handleEmailChange} />
            </FormControl>
            <FormControl>
            <FormLabel>Password</FormLabel>
            <Input type="password" value={password} onChange={handlePasswordChange} />
            </FormControl>
            <motion.div
                initial={{ scale: 1, x: 0, y: 0 }}
                animate={{ scale: isFormValid ? 1.1 : 1, x: isFormValid ? 10 : 0, y: isFormValid ? -10 : 0 }}
                transition={{ duration: 0.3 }}
                whileHover={{ x: isFormValid ? 10 : -10, y: isFormValid ? -10 : 10 }}
                >
            <Button my="20px" type="submit" disabled={!isFormValid || isLoading }>
                {isLoading ? 'loading...' : 'Login'}
            </Button>
            </motion.div>
            <Text>Don&apos;t have an account? Click <Link style={{color: "purple"}} href="/register">here</Link> to Register</Text>
        </form>
        </Box>
    );
};

export default Login;
