import { 
    Box, 
    Img, 
    IconButton, 
    Avatar, 
    Button,
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Input, 
    Card, CardHeader, CardBody, CardFooter,
    Heading,
    Text,
    FormControl,
    FormLabel,
    InputGroup,
    InputRightElement
} from '@chakra-ui/react'
import logo from '../../images/logo.png'
import { FaSignOutAlt } from 'react-icons/fa';
import { useRef } from 'react';
import { EmailIcon, InfoOutlineIcon, LockIcon, PhoneIcon } from '@chakra-ui/icons';
const Nav = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const btnRef = useRef()
    const logout = () => {
        localStorage.clear();
        window.location.href = '/';
    };
    const user = JSON.parse(localStorage.getItem('labatin_admin_info'))
    const userName = user.name +" "+ user.secname
  return (
    <div>
        <Box bg='white' w='100%' p={4} display='flex' justifyContent='space-between'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Img src={logo} alt="App logo" width={50} height={50} /> &nbsp; &nbsp;
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#008582', marginTop: '1vh' }}>Lobatin admin</h1>
            </div>
            <div>
                <Button variant='ghost' ref={btnRef} onClick={onOpen}>
                    <Avatar name={userName} size='md' bg='#008582' color='white'/>
                </Button>&nbsp; &nbsp;
                <IconButton aria-label='Deconnexion' icon={<FaSignOutAlt />} mt={1} onClick={logout}/>
            </div>
        </Box>

        <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        size='sm'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Profile de {userName}</DrawerHeader>

          <DrawerBody>
            <Card>
                <CardHeader>
                    <Heading size='sm'>Mettre à jour mes infos</Heading>
                </CardHeader>
                <CardBody mt={-6}>
                    <Text> <b>Nom: </b> Toto</Text>
                    <hr />
                    <Text mt={3}> <b>Prénom: </b> Tyty</Text>
                    <hr />
                    <Text mt={3}> <b>Téléphone: </b> 652101010</Text>
                    <hr />
                    <Text mt={3}> <b>Adresse mail: </b> tuto@gmail.com</Text>
                </CardBody>
            </Card>
            <Card mt={4}>
                <CardHeader>
                    <Heading size='sm'>Informations personnelles</Heading>
                </CardHeader>
                <CardBody mt={-6}>
                    <FormControl marginBottom={2} >
                        <FormLabel>Nom</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <InfoOutlineIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='text' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl marginBottom={2} >
                        <FormLabel>Prénom</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <InfoOutlineIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='text' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl marginBottom={2}>
                        <FormLabel>Téléphone</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <PhoneIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='tel' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl mb={2}>
                        <FormLabel>Adresse mail</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <EmailIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='email' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <Button mt={2} variant='solid' colorScheme="teal" size='sm'>Valider</Button>
                </CardBody>
            </Card>
            <Card mt={4}>
                <CardHeader>
                    <Heading size='sm'>Mettre à jour mon mot de passe</Heading>
                </CardHeader>
                <CardBody mt={-6}>
                    <FormControl marginBottom={2} >
                        <FormLabel>Mot de passe actuel</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <LockIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='password' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <FormControl marginBottom={2} >
                        <FormLabel>Nouveau mot de passe</FormLabel>
                        <InputGroup size='sm'>
                            <InputRightElement>
                                <LockIcon color='gray.300' />
                            </InputRightElement>
                            <Input type='password' sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                        </InputGroup>
                    </FormControl>
                    <Button mt={2} variant='solid' colorScheme="teal" size='sm'>Mettre à jour</Button>
                </CardBody>
            </Card>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </div>
  )
}

export default Nav