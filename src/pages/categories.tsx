import React from 'react'
import { Box } from "@chakra-ui/react";
import CategoryPage from '@/views/categories/CategoryPage';


type Props = {
    category: any
}

const Categories = () => {
    return (
        <Box>
            <CategoryPage />
        </Box>
    )
};

export default Categories