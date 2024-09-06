import { Card, CardBody } from '@chakra-ui/react'
const TotalD = () => {
  return (
    <>
      <Card
        w="20vw"
        h="10vh"
        sx={{
          background: 'linear-gradient(270deg, #008582, #58c7e4)',
          backgroundSize: '400% 400%',
          animation: 'gradientAnimation 8s ease infinite',
          '@keyframes gradientAnimation': {
            '0%': { backgroundPosition: '0% 50%' },
            '50%': { backgroundPosition: '100% 50%' },
            '100%': { backgroundPosition: '0% 50%' },
          },
        }}
        color='white'
      >
        <CardBody>
        <h4><b>Nouvelles demandes de licences</b></h4>
        </CardBody>
      </Card>
    </>
  )
}

export default TotalD