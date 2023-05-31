import { Button, FormControl, FormErrorMessage, FormLabel, Input, VStack } from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import useRegister from '@/hooks/useRegister';

type RegisterFormInputs = {
    username: string;
    email: string;
    password: string;
};

const RegisterPage = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormInputs>();
    const [isButtonHovered, setIsButtonHovered] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const role = "customer"
    //  bringing in the register hook
    const { mutate: RegisterFunc, isLoading } = useRegister()

    const handleRegister = (data: RegisterFormInputs) => {
        setIsSubmitting(true);
        const payload = {
            role: "customer",
            password: data.password,
            email: data.email,
            name: data.username
        }

        RegisterFunc(payload)
        

        // Simulating registration delay for demonstration purposes
        setTimeout(() => {
        console.log('Registered successfully!', data);
        setIsSubmitting(false);
        }, 2000);
    };

    const handleButtonHover = () => {
        setIsButtonHovered(true);
    };

    const handleButtonLeave = () => {
        setIsButtonHovered(false);
    };

    return (
        <VStack shadow="md" spacing={4} width={{base:"100%", md:"400px"}} align="center" p={4}>
        <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input {...register('username', { required: 'Username is required' })} type="text" />
            <FormErrorMessage>{errors.username?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.email}>
            <FormLabel>Email</FormLabel>
            <Input {...register('email', { required: 'Email is required' })} type="email" />
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
        </FormControl>
        <FormControl isInvalid={!!errors.password}>
            <FormLabel>Password</FormLabel>
            <Input {...register('password', { required: 'Password is required' })} type="password" />
            <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
        </FormControl>
        <Button
            type="submit"
            onClick={handleSubmit(handleRegister)}
            isLoading={isSubmitting}
            loadingText="Registering..."
            transition="transform 0.2s"
            _hover={{ transform: 'scale(1.05)' }}
            _disabled={{ opacity: 0.6, cursor: 'not-allowed' }}
            alignSelf="flex-start"
            mt={4}
            position={isButtonHovered ? 'relative' : 'static'}
            top={isButtonHovered ? -8 : 'auto'}
            onAnimationEnd={() => setIsButtonHovered(false)}
            onMouseEnter={handleButtonHover}
            onMouseLeave={handleButtonLeave}
            onAnimationStart={() => setIsSubmitting(true)}
            animation={isSubmitting ? 'pulse 1.5s infinite' : ''}
        >
            {isSubmitting ? 'Submitting...' : 'Register'}
        </Button>
        </VStack>
    );
};

export default RegisterPage;
