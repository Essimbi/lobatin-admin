import Nav from "../../components/Nav"
import { Box, Container, Wrap, WrapItem, Center } from "@chakra-ui/react"
import CardElement from '../../components/CardElement'
import TotalUser from "../../components/TotalUser"
import TotalD from "../../components/TotalD"
const Home = () => {
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
                </Container>
            </Box>
        </>
    )
}

export default Home