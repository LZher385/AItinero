'use client';

import CardsWrapper from '@/components/CardsWrapper';
import { useRouter } from 'next/navigation';
import { Trip, TripDoc } from '@/app/types/trip';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Cross2Icon } from '@radix-ui/react-icons';

//BE Imports
import { api } from '../../../convex/_generated/api';
import { useQuery, useMutation, ReactMutation } from 'convex/react';
import { FunctionReference } from 'convex/server';
import { Id } from '../../../convex/_generated/dataModel';
import { TABLE_NAME } from '../../../convex/schema';
import { DateTime } from 'luxon';

interface MakeTripCardProps {
  trip: TripDoc;
  removeTrip: ReactMutation<
    FunctionReference<
      'mutation',
      'public',
      {
        id: Id<'trips'>;
      }
    >
  >;
}

const MakeTripCard = ({ trip, removeTrip }: MakeTripCardProps) => {
  const router = useRouter();

  const routeToCard = (id: any) => {
    router.replace(`/itinerary/${id}`);
  };

  return (
    <Card className="h-full w-96">
      <CardHeader>
        <CardTitle>{trip.location}</CardTitle>
      </CardHeader>
      <CardContent>
        {trip.start_date} - {trip.end_date}
      </CardContent>
      <div className="flex flex-row place-content-center justify-between">
        <div className="m-5">
          <Button type="button" onClick={() => routeToCard(trip._id)}>
            Take Me There!
          </Button>
        </div>
        <div className="m-5 place-self-end ">
          <Button
            className="bg-red-600 hover:bg-red-800"
            type="button"
            onClick={() => {
              removeTrip({ id: trip._id });
            }}
          >
            {' '}
            <Cross2Icon />{' '}
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default function Home() {
  let data = useQuery(api.trips.list);
  const removeTrip = useMutation(api.trips.remove);
  const router = useRouter();

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col space-y-10 place-items-center">
        <div className="flex flex-col place-items-center">
          <div className="text-6xl font-extrabold my-20">
            <h1>Aitinero</h1>
          </div>
          <div className="place-self-center my-20">
            <Button type="button" onClick={() => router.push('/home/location')}>
              Plan A New Trip
            </Button>
          </div>
        </div>

        <div>
          <CardsWrapper>
            {data?.map((trip) => {
              return MakeTripCard({ trip, removeTrip });
            })}
          </CardsWrapper>
        </div>
      </div>
    </div>
  );
}
