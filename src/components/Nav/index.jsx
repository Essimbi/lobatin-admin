import { Box, Img, IconButton } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import logo from '../../images/logo.png'
const Nav = () => {
  return (
    <div>
        <Box bg='white' w='100%' p={4} display='flex' justifyContent='space-between'>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
                <Img src={logo} alt="App logo" width={50} height={50} /> &nbsp; &nbsp;
                <h1 style={{ fontSize: '18px', fontWeight: 'bold', color: '#008582', marginTop: '1vh' }}>Lobatin admin</h1>
            </div>
            <div>
                <IconButton aria-label='Search database' icon={<SearchIcon />} />
            </div>
        </Box>
    </div>
  )
}

export default Nav