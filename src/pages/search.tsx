import SearchBar from "@/components/search/Search"
import { SimpleGrid, Text, Box, InputGroup, InputRightElement, IconButton, Stack, VStack  } from "@chakra-ui/react"
import { useRouter } from "next/router"
import axios from "axios"
import { useEffect, useState } from "react"
import { useQuery } from '@tanstack/react-query';
import ProductCard from "@/components/productCard/productcard.component"

type Food = {
    id: number;
    name: string;
    description: string;
    data?: any
};


const fetchFood = async (): Promise<any> => {
    const response = await axios.get<any>(`https://backend.cakesandpastries.ng/api/menu/all`);
    return response.data?.data;
};



const Search = () => {
    const router = useRouter()
    const _searchQuery = useRouter().query.name ?? ''

    const [searchQuery, setSearchQuery] = useState<any>('');
    console.log(typeof _searchQuery)

    useEffect(() => {
        if (router.asPath !== router.route) {
            setSearchQuery(_searchQuery!)
        }
        refetch()
    }, [router])

    const [proteinBarUp, setProteinBarUp] = useState(false)
    
    const { data: foods, isLoading, isError, refetch } = useQuery<Food[], Error>(
        ['foods'],
        fetchFood    );



    const filteredFoods = Array.isArray(foods) && searchQuery !== ""
    ? foods.filter((food) =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
    : [];

    return (
        <Box pt="28" h="100vh">

            <Stack>
            <VStack>
                        {isLoading && <Text>Loading...</Text>}
                        {isError && <Text>Error occurred while fetching food data.</Text>}
                        {filteredFoods && filteredFoods.length === 0 && <Text>No results found.</Text>}

                <Box maxW="full" width="full" p="4">
                <SimpleGrid columns={[2, 2, 2, 3, 3, 4]} spacing={{base:"0", md:"4"}} width="full">
                        {filteredFoods &&
                            filteredFoods.map((food:any, index:number) => (
                                <ProductCard item={food}
                                key={index} 
                                setProteinBarUp={setProteinBarUp}
                                proteinBarUp={proteinBarUp}
                                />
                            ))}
                </SimpleGrid>
                </Box>
                    </VStack>
            </Stack>
        </Box>
    )
}

export default Search