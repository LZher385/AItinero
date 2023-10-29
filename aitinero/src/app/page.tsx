import CardsWrapper from '@/components/CardsWrapper'
import Image from 'next/image'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { Trip } from '@/app/types/trip'
import { Card, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'


const MakeTripCard = (trip: Trip) => {
  const router = useRouter();
  const routeToCard = (id) => {
    router.replace(`/itenerary/${id}`)
  }
  
  return(
  <Card>
    <CardHeader>
      <CardTitle>{trip.name}</CardTitle>
    </CardHeader>
    <Button onClick={() => routeToCard(trip._id)}>Take Me There!</Button>
  </Card>)
}


export default function Home() {
  return (
    <main>
      <div>
        <div>
          <CardsWrapper>
            []
          </CardsWrapper>
        </div>
      </div>
    </main>
  )
}
