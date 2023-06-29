import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }: any) => {
    const handleSearch = (event: any) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };
    const router = useRouter()

    return (
        <InputGroup>
        <Input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            borderRadius="full"
            bg="white"
        />
        <InputRightElement>
            <IconButton
            aria-label="Search"
            icon={<FaSearch />}
            bg="transparent"
            _hover={{ bg: "transparent" }}
            onClick={() =>{
                router.push(`/search?name=${'beef'}`)
            }}
            />
        </InputRightElement>
        </InputGroup>
    );
};

export default SearchBar;
