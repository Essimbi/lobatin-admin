import React, { useState } from 'react';
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Button,
  FormLabel,
} from '@chakra-ui/react';
import { ChevronDownIcon } from '@chakra-ui/icons';

const Autocomplete = ({ options }) => {
  const [inputValue, setInputValue] = useState('');
  const [filteredOptions, setFilteredOptions] = useState(options);
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    setFilteredOptions(
      options.filter((option) =>
        option.toLowerCase().includes(value.toLowerCase())
      )
    );
    setIsOpen(true);
  };

  const handleOptionSelect = (option) => {
    setInputValue(option);
    setIsOpen(false);
  };

  return (
    <Box>
        <FormLabel>Utilisateur *</FormLabel>
        <InputGroup>
            <Input
            value={inputValue}
            onChange={handleInputChange}
            placeholder="Select an option"
            />
            <InputRightElement>
            <Menu isOpen={isOpen}>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon />} />
                <MenuList>
                {filteredOptions.map((option, index) => (
                    <MenuItem key={index} onClick={() => handleOptionSelect(option)}>
                    {option}
                    </MenuItem>
                ))}
                </MenuList>
            </Menu>
            </InputRightElement>
        </InputGroup>
    </Box>
  );
};

export default Autocomplete;
