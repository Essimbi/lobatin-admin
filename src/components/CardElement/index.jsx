import { Card, CardBody } from '@chakra-ui/react'
const CardElement = ({totalKey}) => {
  return (
    <>
      <Card
        w="20vw"
        h="15vh"
        bg='#58c7e4'
        color='white'
      >
        <CardBody>
          <h4><b>Nombre de licence générées</b></h4>
          <p style={{ textAlign: 'center', marginTop: '1vh', fontSize: '34px' }}> <b> {totalKey} </b> </p>
        </CardBody>
      </Card>
    </>
  )
}

export default CardElement