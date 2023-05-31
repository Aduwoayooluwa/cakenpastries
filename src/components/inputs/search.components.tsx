import { Input, InputGroup, InputRightElement, IconButton } from "@chakra-ui/react";
import { FaSearch } from "react-icons/fa";

const SearchBar = ({ onSearch }: any) => {
    const handleSearch = (event: any) => {
        const searchTerm = event.target.value;
        onSearch(searchTerm);
    };

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
            />
        </InputRightElement>
        </InputGroup>
    );
};

export default SearchBar;
