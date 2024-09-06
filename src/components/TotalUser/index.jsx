import { Card, CardBody } from '@chakra-ui/react'
const TotalUser = ({totalUser}) => {
  return (
    <>
      <Card
        w="20vw"
        h="10vh"
        bg="#008582"
        color='white'
      >
        <CardBody>
            <h4><b>Total d'utilisateur de l'application</b></h4>
            <p style={{ textAlign: 'center', marginTop: '1vh', fontSize: '34px' }}> <b> {totalUser} </b> </p>
        </CardBody>
      </Card>
    </>
  )
}

export default TotalUser