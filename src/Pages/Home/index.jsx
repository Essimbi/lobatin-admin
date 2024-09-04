import Nav from "../../components/Nav";
import { 
    Box,
    Container,
    Wrap,
    WrapItem,
    Button,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Text,
    useDisclosure,
    Select,
    FormControl,
    FormLabel,
    Input,
    Tabs, TabList, TabPanels, Tab, TabPanel
} from "@chakra-ui/react";
import CardElement from '../../components/CardElement';
import TotalUser from "../../components/TotalUser";
import TotalD from "../../components/TotalD";
import DataTable from 'react-data-table-component';
import React, { useState, useMemo } from 'react';
import SearchBar from "../../components/SearchBar";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Autocomplete from "../../components/Autocomplete";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [data, setData] = useState([
        {
            id: 1,
            title: 'Beetlejuice',
            year: '1988',
        },
        {
            id: 2,
            title: 'Ghostbusters',
            year: '1984',
        },
        {
            id: 3,
            title: 'Retour vers le futur',
            year: '1985',
        },
    ]);

    const handleDelete = (rowId) => {
        setData(prevData => prevData.filter(item => item.id !== rowId));
    };

    const columns = [
        {
          name: 'Clé de licence',
          selector: row => row.title,
          sortable: true,
        },
        {
          name: 'Valide depuis le',
          selector: row => row.year,
          sortable: true,
        },
        {
            name: "Date d'expiration",
            selector: row => row.year,
            sortable: true,
        },
        {
            name: 'Statut',
            selector: row => row.year,
            sortable: false,
        },
        {
            name: 'Action',
            cell: row => (
                <IconButton
                aria-label='Supprimer'
                size='sm'
                onClick={() => handleDelete(row.id)}
                icon={<DeleteIcon />}
                />
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');

    const filteredItems = useMemo(() => 
        data.filter(
          item => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
              item.title.toLowerCase().includes(searchTermLower) ||
              item.year.includes(searchTermLower)
            );
          }
        ),
        [searchTerm, data]
    );

    const paginationOptions = {
        rowsPerPageText: 'Lignes par page',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    };
    const options = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
    return (
        <>
            <Box bg='#008582' h='100vh'>
                <Nav/>
                <Container maxW='container.xl' mt={4} p={4}>
                    <Box bg="white" w='100%' rounded={10} p={4}>
                        <Wrap spacing='30px' justify='center'>
                            <WrapItem>
                                <TotalUser />
                            </WrapItem>
                            <WrapItem>
                                <TotalD />
                            </WrapItem>
                            <WrapItem>
                                <CardElement />
                            </WrapItem>
                        </Wrap>
                    </Box>
                    <Box mt={4} p={4}>
                        <Tabs variant='enclosed' colorScheme='white'>
                            <TabList color='white'>
                                <Tab>Licences</Tab>
                                <Tab>Utilisateurs</Tab>
                                {/* <Tab>Demandes</Tab> */}
                            </TabList>

                            <TabPanels>
                                <TabPanel>
                                    <Box>
                                        <SearchBar onSearch={setSearchTerm} />
                                        <Button leftIcon={<AddIcon />} colorScheme='cyan' variant='solid' ml={4} style={{ color: 'white' }} onClick={onOpen}>
                                            Nouvelle licence
                                        </Button>
                                        <DataTable
                                            title="Liste de Films"
                                            columns={columns}
                                            data={filteredItems}
                                            pagination
                                            highlightOnHover
                                            responsive
                                            paginationComponentOptions={paginationOptions}
                                            noDataComponent="Aucune donnée disponible"
                                        />
                                    </Box>
                                </TabPanel>
                                <TabPanel>
                                    <Box>
                                        <SearchBar onSearch={setSearchTerm} />
                                        <Button leftIcon={<AddIcon />} colorScheme='cyan' variant='solid' ml={4} style={{ color: 'white' }} onClick={onOpen}>
                                            Nouvel utilisateur
                                        </Button>
                                        <DataTable
                                            title="Utilisateurs de l'application"
                                            columns={columns}
                                            data={filteredItems}
                                            pagination
                                            highlightOnHover
                                            responsive
                                            paginationComponentOptions={paginationOptions}
                                            noDataComponent="Aucune donnée disponible"
                                        />
                                    </Box>
                                </TabPanel>
                            </TabPanels>
                        </Tabs>
                    </Box>
                </Container>
            </Box>

            <Modal blockScrollOnMount={false} isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Générer une nouvelle clé </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Autocomplete options={options} />
                        <FormControl isRequired mb={4} mt={4}>
                            <FormLabel>Valide à partir du </FormLabel>
                            <Input type="date" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Date d'expiration </FormLabel>
                            <Input type="date" />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button mr={3} onClick={onClose}>
                            Annuler
                        </Button>
                        <Button variant='solid' colorScheme="teal" >Générer</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Home;
