import Nav from "../../components/Nav"
import { Box, Container } from "@chakra-ui/react"
const Home = () => {
    return (
        <>
            <Box bg='#008582' h='100vh'>
                <Nav/>
                <Container maxW='container.xl'>
                    <h1>Home page</h1>
                </Container>
            </Box>
        </>
    )
}

export default Home