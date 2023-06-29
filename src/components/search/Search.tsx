import { Input, Button, SimpleGrid, Text, Box, InputGroup, InputRightElement, IconButton, Stack, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import SearchDisplayPage from './SearchDisplayPage';
import { useRouter } from 'next/router';


const SearchBar = ({ handleSearch, handleOnChange }: any) => {
    const router = useRouter()
    
    return (
        <>
            <InputGroup>
                <Input
                type="text"
                placeholder="Search..."
                borderRadius="full"
                bg="white"
                onChange={handleOnChange}
                />
                <InputRightElement>
                <IconButton
                    aria-label="Search"
                    icon={<FaSearch />}
                    bg="transparent"
                    _hover={{ bg: 'transparent' }}
                    onClick={handleSearch}
                />
                </InputRightElement>
            </InputGroup>
            <Stack>
                <SearchDisplayPage />
            </Stack>
        </>
    );
};

export default SearchBar;
