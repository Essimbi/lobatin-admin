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
    Tabs, TabList, TabPanels, Tab, TabPanel,
    InputGroup,
    InputRightElement,
    Skeleton,
    useToast
} from "@chakra-ui/react";
import CardElement from '../../components/CardElement';
import TotalUser from "../../components/TotalUser";
import TotalD from "../../components/TotalD";
import DataTable from 'react-data-table-component';
import React, { useState, useMemo, useEffect } from 'react';
import SearchBar from "../../components/SearchBar";
import { AddIcon, CopyIcon, DeleteIcon, EditIcon, EmailIcon, InfoOutlineIcon, PhoneIcon } from "@chakra-ui/icons";

const Home = () => {
    const { isOpen: isLicenceModalOpen, onOpen: onOpenLicenceModal, onClose: onCloseLicenceModal } = useDisclosure();
    const { isOpen: isUserModalOpen, onOpen: onOpenUserModal, onClose: onCloseUserModal } = useDisclosure();
    const toast = useToast();

    const [data, setData] = useState([]);
    const [totalKey, setTotalKey] = useState();
    const [totalUser, setTotalUser] = useState();
    const [userData, setUserData] = useState([])
    const [dateCreation, setDateCreation] = useState(new Date())
    const [dateFin, setDateFin] = useState(new Date())
    const [keyUser, setKeyUser] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [userName, setUserName] = useState('')
    const [userSecName, setUserSecName] = useState('')
    const [userPhone, setUserPhone] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const [isUpdate, setIsUpdate] = useState(false)
    const [userId, setUserId] = useState('')
    const token = JSON.parse(localStorage.getItem('labatin_admin_access_token'));
    const [isLoading, setIsloading] = useState(true)

    useEffect(() => {
        setIsloading(true)
        const fetchData = async () => {
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
                setIsloading(false)
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchData();
    }, []);

    useEffect(() => {
        const fetchDataUser = async () => {
            try {
                const response = await fetch('https://lobatin-api.vercel.app/user/', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                    }
                });
                
                if (response.success === false) {
                    throw new Error('Erreur lors de la requête');
                }
    
                const result = await response.json();
                setUserData(result.data); // Mettre à jour les données avec la réponse
                setTotalUser(result.data.length)
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        };
    
        fetchDataUser();
    }, []);

    const handleDelete = async (rowId) => {
        try {
            const response = await fetch(`https://lobatin-api.vercel.app/key/${rowId}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });
            const dataResponse = response.json()
            if (dataResponse.success === false) {
                toast({
                    title: 'Info',
                    description: "Erreur de suppression de la clé",
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error("Erreur de suppression de la clé");
            }
            
            const response2 = await fetch('https://lobatin-api.vercel.app/key/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                }
            });
            
            const result = await response2.json();
            if (response2.success === false) {
                throw new Error('Erreur lors de la requête');
            }

            setData(result.data); // Mettre à jour les données avec la réponse
            setTotalKey(result.data.length)
            toast({
                title: 'Succès',
                description: "Clé supprimée avec succès",
                status: 'success',
                duration: 3000,
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleDeleteUser = async (rowId) => {
        try {
            const response = await fetch(`https://lobatin-api.vercel.app/user/delete/${rowId}`, {
              method: 'DELETE',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
            });
            const dataR = response.json()
            if (dataR.success === false) {
                toast({
                    title: 'Info',
                    description: dataR.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error("Erreur de suppression de l'utilisateur");
            }
            
            const response2 = await fetch('https://lobatin-api.vercel.app/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                }
            });
            
            const result = await response2.json();
            if (result.success === false) {
                toast({
                    title: 'Info',
                    description: result.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error('Erreur lors de la requête');
            }
            setUserData(result.data);
            setTotalUser(result.data.length)
            toast({
                title: 'Succès',
                description: "Utilisateur supprimé avec succès",
                status: 'success',
                duration: 3000,
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    const handleCopyKey = (rowId) => {
        const licenceKey = data.find(item => item._id === rowId)?.licence;
        if (licenceKey) {
            navigator.clipboard.writeText(licenceKey)
                .then(() => {
                    toast({
                        title: 'Succès',
                        description: "Clé copiée dans le presse-papier",
                        status: 'success',
                        duration: 3000,
                        variant: 'top-accent',
                        position: 'top-right',
                        isClosable: true,
                    })
                })
                .catch((error) => {
                    toast({
                        title: 'Erreure',
                        description: "Erreur lors de la copie dans le presse-papier \n "+ error,
                        status: 'error',
                        duration: 3000,
                        variant: 'top-accent',
                        position: 'top-right',
                        isClosable: true,
                    })
                });
        } else {
            console.log('Clé de licence non trouvée');
        }
    }

    const handleCopyUser = (rowId) => {
        const user = userData.find(item => item._id === rowId)
        if (user) {
            setIsUpdate(true)
            setUserName(user.name)
            setUserSecName(user.secname)
            setUserPhone(user.phoneNumber)
            setUserEmail(user.email)
            setUserId(rowId)
            onOpenUserModal();
        }
    }

    const columns = [
        {
          name: 'Clé de licence',
          selector: row => row.licence,
          sortable: true,
        },
        {
            name: 'Utilisateur',
            selector: row => row.user,
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
            selector: row => row.statut,
            sortable: false,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <IconButton
                    aria-label='Copier la clé'
                    size='sm'
                    onClick={() => handleCopyKey(row._id)}
                    icon={<CopyIcon />}
                    title="Copier la clé"
                    /> &nbsp;&nbsp;
                    <IconButton
                    colorScheme="red"
                    aria-label='Supprimer'
                    size='sm'
                    onClick={() => handleDelete(row._id)}
                    icon={<DeleteIcon />}
                    />
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const columnsUsers = [
        {
          name: 'Nom',
          selector: row => row.name,
          sortable: true,
        },
        {
            name: 'Prénom',
            selector: row => row.secname,
            sortable: true,
        },
        {
          name: 'Numéro de téléphone',
          selector: row => row.phoneNumber,
          sortable: true,
        },
        {
            name: "Email",
            selector: row => row.email,
            sortable: true,
        },
        {
            name: 'Action',
            cell: row => (
                <>
                    <IconButton
                    aria-label='Copier la clé'
                    size='sm'
                    onClick={() => handleCopyUser(row._id)}
                    icon={<EditIcon />}
                    title="Copier la clé"
                    /> &nbsp;&nbsp;
                    <IconButton
                    colorScheme="red"
                    aria-label='Supprimer'
                    size='sm'
                    onClick={() => handleDeleteUser(row._id)}
                    icon={<DeleteIcon />}
                    />
                </>
            ),
            ignoreRowClick: true,
            allowOverflow: true,
            button: true,
        },
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [searchUser, setSearchUser] = useState('');

    const filteredItems = useMemo(() => 
        data.filter(
          item => {
            const searchTermLower = searchTerm.toLowerCase();
            return (
              item.dateCreation.toLowerCase().includes(searchTermLower) ||
              item.dateExp.includes(searchTermLower) ||
              item.user.toLowerCase().includes(searchTermLower) ||
              item.statut.toLowerCase().includes(searchTermLower)
            );
          }
        ),
        [searchTerm, data]
    );

    const filteredUser = useMemo(() => 
        userData.filter(
          item => {
            const searchUserLower = searchUser.toLowerCase();
            return (
              item.name.toLowerCase().includes(searchUserLower) ||
              item.secname.includes(searchUserLower) ||
              item.phoneNumber.toLowerCase().includes(searchUserLower) ||
              item.email.toLowerCase().includes(searchUserLower)
            );
          }
        ),
        [searchUser, userData]
    );

    const paginationOptions = {
        rowsPerPageText: 'Lignes par page',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Tous',
    };

    const handleUserSelect = (e) => {
        const selectedId = e.target.value;
        const selectedUser = userData.find(user => user.name === selectedId);
        if (selectedUser) {
            setKeyUser(selectedUser._id)
        }
    };

    const onSubmitKeyCreation = async (e) => {
        e.preventDefault();
        const bodyRequest = {
            user: keyUser,
            model: "Lobatin-Model",
            imei: "Lobatin-Imei",
            dateCreation: dateCreation,
            dateExp: dateFin
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('https://lobatin-api.vercel.app/key/new', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(bodyRequest),
            });
            const dataR = response.json()
            if (dataR.success === false) {
                toast({
                    title: 'Info',
                    description: dataR.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error("Erreur de génération de clé");
            }
            
            const response2 = await fetch('https://lobatin-api.vercel.app/key/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                }
            });
            
            const result = await response2.json();
            if (result.success === false) {
                toast({
                    title: 'Info',
                    description: result.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error('Erreur lors de la requête');
            }

            setData(result.data);
            setTotalKey(result.data.length)
            toast({
                title: 'Succès',
                description: "Nouvelle clé créée",
                status: 'success',
                duration: 3000,
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsSubmitting(false);
            setKeyUser('');
            setDateCreation(new Date());
            setDateFin(new Date());
            onCloseLicenceModal();
        }
    }

    const onSubmitSaveUser = async (e) => {
        e.preventDefault();
        const bodyRequest = {
            name: userName,
            secname: userSecName,
            phoneNumber: userPhone,
            email: userEmail
        }
        setIsSubmitting(true);
        try {
            const response = await fetch('https://lobatin-api.vercel.app/user/create', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(bodyRequest),
            });
            const dataR = response.json();
            if (dataR.success === false) {
                toast({
                    title: 'Info',
                    description: dataR.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error("Erreur d'enrégistrement d'un nouvel utilisateur");
            }
            
            const response2 = await fetch('https://lobatin-api.vercel.app/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                }
            });
            const result = await response2.json();
            if (result.success === false) {
                toast({
                    title: 'Info',
                    description: result.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error('Erreur lors de la requête');
            }

            setUserData(result.data);
            setTotalUser(result.data.length)
            toast({
                title: 'Succès',
                description: "Nouvel utilisateur enrégistré",
                status: 'success',
                duration: 3000,
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsSubmitting(false);
            setUserName('')
            setUserSecName('')
            setUserPhone('')
            setUserEmail('')
            onCloseUserModal();
        }
    }

    const onSubmitUpdateUser = async (e) => {
        e.preventDefault();
        const bodyRequest = {
            name: userName,
            secname: userSecName,
            phoneNumber: userPhone,
            email: userEmail
        }
        setIsSubmitting(true);
        try {
            const response = await fetch(`https://lobatin-api.vercel.app/user/update/${userId}`, {
              method: 'PATCH',
              headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
              body: JSON.stringify(bodyRequest),
            });
            const dataR = response.json()
            if (dataR.success === false) {
                toast({
                    title: 'Info',
                    description: dataR.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error("Erreur de génération de clé");
            }
            
            const response2 = await fetch('https://lobatin-api.vercel.app/user/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}` // Ajouter le token dans les headers
                }
            });
            
            const result = await response2.json();
            if (result.success === false) {
                toast({
                    title: 'Info',
                    description: result.message,
                    status: 'warning',
                    duration: 3000,
                    variant: 'top-accent',
                    position: 'top-right',
                    isClosable: true,
                })
                throw new Error('Erreur lors de la requête');
            }
            setUserData(result.data);
            toast({
                title: 'Succès',
                description: "Utilisateur mis à jour avec succès",
                status: 'success',
                duration: 3000,
                variant: 'top-accent',
                position: 'top-right',
                isClosable: true,
            })
        } catch (error) {
            console.error('Error:', error.message);
        } finally {
            setIsSubmitting(false);
            setUserName('')
            setUserSecName('')
            setUserPhone('')
            setUserEmail('')
            setUserId('')
            setIsUpdate(false)
            onCloseUserModal();
        }
    }
    
    
    return (
        <>
            <Box bg='#008582' h='100vh'>
                <Nav/>
                <Container maxW='container.xl' mt={4} p={4} mb={4}>
                    <Box bg="white" w='100%' rounded={10} p={4}>
                        <Wrap spacing='30px' justify='center'>
                            <WrapItem>
                                <TotalUser totalUser={totalUser} />
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
                           <Skeleton isLoaded={!isLoading}>
                            <TabList color='white'>
                                    <Tab>Licences</Tab>
                                    <Tab>Utilisateurs</Tab>
                                </TabList>
                           </Skeleton>

                            <TabPanels>
                                <TabPanel>
                                    <Skeleton isLoaded={!isLoading}>
                                        <Box>
                                            <SearchBar onSearch={setSearchTerm} />
                                            <Button leftIcon={<AddIcon />} colorScheme='cyan' variant='solid' ml={4} style={{ color: 'white' }} onClick={onOpenLicenceModal}>
                                                Nouvelle licence
                                            </Button>
                                            <DataTable
                                                title="Clés d'activation"
                                                columns={columns}
                                                data={filteredItems}
                                                pagination
                                                highlightOnHover
                                                responsive
                                                paginationComponentOptions={paginationOptions}
                                                noDataComponent="Aucune donnée disponible"
                                            />
                                        </Box>
                                    </Skeleton>

                                </TabPanel>
                                <TabPanel>
                                    <Box>
                                        <SearchBar onSearch={setSearchUser} />
                                        <Button leftIcon={<AddIcon />} colorScheme='cyan' variant='solid' ml={4} style={{ color: 'white' }} onClick={onOpenUserModal}>
                                            Nouvel utilisateur
                                        </Button>
                                        <DataTable
                                            title="Utilisateurs de l'application"
                                            columns={columnsUsers}
                                            data={filteredUser}
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

            <Modal blockScrollOnMount={false} isOpen={isLicenceModalOpen} onClose={onCloseLicenceModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Générer une nouvelle clé </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={onSubmitKeyCreation}>
                        <ModalBody>
                            {/* <Autocomplete options={options} /> */}
                            <FormControl isRequired mb={4} mt={4}>
                                <FormLabel>Utilisateur </FormLabel>
                                <Input type="text" list='options'  onChange={(e) => handleUserSelect(e)} required/>
                            </FormControl>
                            <datalist id="options">
                                {userData.map((user, index) => (
                                    <option>
                                        {user.name}
                                    </option>
                                ))}
                            </datalist>

                            <FormControl isRequired mb={4} mt={4}>
                                <FormLabel>Valide à partir du </FormLabel>
                                <Input type="date" onChange={(e) => { setDateCreation(e.target.value) }} required/>
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel>Date d'expiration </FormLabel>
                                <Input type="date" onChange={(e) => { setDateFin(e.target.value) }} required/>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onCloseLicenceModal} type="reset">
                                Annuler
                            </Button>
                            <Button 
                                variant='solid' 
                                colorScheme="teal" 
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText='Générer'
                            >
                                Générer
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>

            <Modal blockScrollOnMount={false} isOpen={isUserModalOpen} onClose={onCloseUserModal} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Enrégistrer un utilisateur </ModalHeader>
                    <ModalCloseButton />
                    <form onSubmit={isUpdate ? onSubmitUpdateUser : onSubmitSaveUser}>
                        <ModalBody>
                            {/* <Autocomplete options={options} /> */}
                            <FormControl marginBottom={2} >
                                <FormLabel>Nom</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <InfoOutlineIcon color='gray.300' />
                                    </InputRightElement>
                                    <Input type='text' value={userName} required sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}} onChange={(e) => { setUserName(e.target.value) }}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl marginBottom={2} >
                                <FormLabel>Prénom</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <InfoOutlineIcon color='gray.300' />
                                    </InputRightElement>
                                    <Input type='text' value={userSecName} required sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}} onChange={(e) => { setUserSecName(e.target.value) }}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl marginBottom={2}>
                                <FormLabel>Téléphone</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <PhoneIcon color='gray.300' />
                                    </InputRightElement>
                                    <Input type='tel' value={userPhone} required sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}} onChange={(e) => { setUserPhone(e.target.value) }}/>
                                </InputGroup>
                            </FormControl>
                            <FormControl mb={2}>
                                <FormLabel>Adresse mail</FormLabel>
                                <InputGroup>
                                    <InputRightElement>
                                        <EmailIcon color='gray.300' />
                                    </InputRightElement>
                                    <Input type='email' value={userEmail} required sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}} onChange={(e) => { setUserEmail(e.target.value) }}/>
                                </InputGroup>
                            </FormControl>
                        </ModalBody>

                        <ModalFooter>
                            <Button mr={3} onClick={onCloseUserModal} type="reset">
                                Annuler
                            </Button>
                            <Button 
                                variant='solid' 
                                colorScheme="teal" 
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText={isUpdate ? 'Mettre à jour' : 'Enregistrer'}
                            >
                                {isUpdate ? 'Mettre à jour' : 'Enregistrer'}
                            </Button>
                        </ModalFooter>
                    </form>
                </ModalContent>
            </Modal>
        </>
    );
};

export default Home;
