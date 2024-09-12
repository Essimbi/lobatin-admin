import { Card, CardBody, SkeletonText } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
const TotalUser = ({totalUser}) => {
  const [isLoading, setIsloading] = useState(true)
  useEffect(() => {
    if (totalUser != undefined) setIsloading(false)
  })
  return (
    <>
      <Card
        w="20vw"
        h="15vh"
        bg="#008582"
        color='white'
      >
        <CardBody>
            <h4><b>Total d'utilisateur de l'application</b></h4>
            <SkeletonText isLoaded={!isLoading}>
              <p style={{ textAlign: 'center', marginTop: '1vh', fontSize: '34px' }}> <b> {totalUser} </b> </p>
            </SkeletonText>
        </CardBody>
      </Card>
    </>
  )
}

export default TotalUser