import { Box, Img, IconButton, Avatar } from '@chakra-ui/react'
import logo from '../../images/logo.png'
import { FaSignOutAlt } from 'react-icons/fa';
const Nav = () => {
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
                <Avatar name={userName} size='md' bg='#008582' color='white'/>&nbsp; &nbsp;
                <IconButton aria-label='Search database' icon={<FaSignOutAlt />} mt={1} onClick={logout}/>
            </div>
        </Box>
    </div>
  )
}

export default Nav