import { Card, CardBody } from '@chakra-ui/react'
const CardElement = () => {
  return (
    <>
      <Card
        w="20vw"
        h="10vh"
        bg='#58c7e4'
        color='white'
      >
        <CardBody>
          <h4><b>Nombre de licence générées</b></h4>
        </CardBody>
      </Card>
    </>
  )
}

export default CardElement