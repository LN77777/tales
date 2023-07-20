import React from 'react';
import { Box, Flex, Heading, Button, Menu, MenuButton, MenuList, MenuItem } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function HomePage() {
    const [isOpen, setIsOpen] = React.useState(false);

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <Box>
            <Flex as="header" align="center" justify="space-between" p={4}>
                <Heading as="h1" size="md">
                    <Button colorScheme="blue" onClick={handleClick}>
                        Quests
                    </Button>
                    <Menu isOpen={isOpen} onClose={handleClose}>
                        <MenuButton as={Button} colorScheme="blue">
                            Open Menu
                        </MenuButton>
                        <MenuList>
                            <MenuItem as={Link} to="/quests/goblin-plains-encampment" onClick={handleClose}>
                                Goblin Plains - Encampment
                            </MenuItem>
                        </MenuList>
                    </Menu>
                </Heading>
            </Flex>
            <Box textAlign="center" fontSize="3xl" mt={20}>
                Tales of Elleria Analytics
            </Box>
        </Box>
    );
}

export default HomePage;
