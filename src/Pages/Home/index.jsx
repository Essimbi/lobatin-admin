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
import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from "../../components/SearchBar";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import Autocomplete from "../../components/Autocomplete";

const Home = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    // État pour les données
    const [data, setData] = useState([]);
    const [totalKey, setTotalKey] = useState(0);

    // Fonction pour récupérer les données depuis l'API
    useEffect(() => {
        const fetchData = async () => {
            const token = JSON.parse(localStorage.getItem('labatin_admin_access_token')); // Récupérer le token depuis le localStorage
            console.log(token)
            try {
                const response = await fetch('https://lobatin-api.vercel.app/key/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                    }
                });
                
                if (!response.ok) {
                    throw new Error('Erreur lors de la requête');
                }
    
                const result = await response.json();
                setData(result.data); // Mettre à jour les données avec la réponse
                setTotalKey(result.data.length)
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchData();
    }, []); // [] assure que l'appel est fait une seule fois lorsque le composant est monté

    const handleDelete = (rowId) => {
        setData(prevData => prevData.filter(item => item._id !== rowId));
    };

    const columns = [
        {
          name: 'Clé de licence',
          selector: row => row.licence,
          sortable: true,
        },
        {
          name: 'Valide depuis le',
          selector: row => row.dateCreation,
          sortable: true,
        },
        {
            name: "Date d'expiration",
            selector: row => row.dateExp,
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
                onClick={() => handleDelete(row._id)}
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
              item.dateCreation.toLowerCase().includes(searchTermLower) ||
              item.dateExp.includes(searchTermLower)
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
                                <CardElement totalKey={totalKey} />
                            </WrapItem>
                        </Wrap>
                    </Box>
                    <Box mt={4} p={4}>
                        <Tabs variant='enclosed' colorScheme='white'>
                            <TabList color='white'>
                                <Tab>Licences</Tab>
                                <Tab>Utilisateurs</Tab>
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
