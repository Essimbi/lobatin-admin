import {
  Center,
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Spinner,
  Input,
  Container,
  Button,
  Img,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react'
import { EmailIcon, LockIcon } from '@chakra-ui/icons'
import './style.css'
import { useState } from 'react';
import logo from '../../images/logo.png'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validate email and password
    if (!isValidEmail(email)) {
      setEmailError('Veuillez saisir une adresse email valide.');
    } else {
      setEmailError('');
    }

    if (password.trim() === '') {
      setPasswordError('Veuillez saisir un mot de passe.');
    } else {
      setPasswordError('');
    }

    // Check if there are any errors before submitting
    if (emailError !== '' || passwordError !== '') {
      return;
    }

    // Submit form if both email and password are valid
    setIsSubmitting(true);
    // Handle form submission here
    console.log('Email:', email);
    console.log('Password:', password);
    // Simulate a delay to demonstrate the loading state
    setTimeout(() => {
      setIsSubmitting(false);
    }, 2000);
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  return (
    <div>
      <Center bg='#008582' h='100vh' color='black' className='center-container'>
        <Container bg='white' w={1000} height='auto' rounded={10}>
          <Box padding={8}>
            <Center className='img' paddingBottom={4}>
              <Img src={logo} alt="App logo" width={100} height={100} />
            </Center>
            <h1><b>Connexion</b></h1>
            <br />
            <form onSubmit={handleSubmit}>
              <FormControl marginBottom={4} isInvalid={emailError}>
                <FormLabel>Adresse mail</FormLabel>
                <InputGroup>
                  <InputRightElement>
                    <EmailIcon color='gray.300' />
                  </InputRightElement>
                  <Input type='email' value={email} onChange={(e) => setEmail(e.target.value)} sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                </InputGroup>
                <FormErrorMessage>{emailError}</FormErrorMessage>
              </FormControl>
              <FormControl marginBottom={8} isInvalid={passwordError}>
                <FormLabel>Mot de passe</FormLabel>
                <InputGroup>
                  <InputRightElement pointerEvents='none'>
                    <LockIcon color='gray.300' />
                  </InputRightElement>
                  <Input type='password' value={password} onChange={(e) => setPassword(e.target.value)} sx={{ '&:focus': { borderColor: '#008582', boxShadow: '0 0 0 1px teal.500',},}}/>
                </InputGroup>
                <FormErrorMessage>{passwordError}</FormErrorMessage>
              </FormControl>
              <Button
                type='submit'
                colorScheme="teal"
                variant="outline"
                sx={{
                  // Default styles
                  borderColor: 'teal.500',
                  _hover: {
                    // Hover styles
                    backgroundColor: 'teal.500',
                    borderColor: 'teal.700',
                    color: 'white',
                  },
                }}
                isLoading={isSubmitting}
                loadingText='Connexion'
              >
                Connexion
              </Button>
            </form>
          </Box>
        </Container>
      </Center>
    </div>
  );
};

export default Login;