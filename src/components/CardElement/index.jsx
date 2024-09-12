import { Card, CardBody, SkeletonText } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
const CardElement = ({totalKey}) => {
  const [isLoading, setIsloading] = useState(true)
  useEffect(() => {
    if (totalKey != undefined) setIsloading(false)
  })
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
          <SkeletonText isLoaded={!isLoading}>
            <p style={{ textAlign: 'center', marginTop: '1vh', fontSize: '34px' }}> <b> {totalKey} </b> </p>
          </SkeletonText>
        </CardBody>
      </Card>
    </>
  )
}

export default CardElement