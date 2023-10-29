

import { Home } from '@/components/itinerarylayout';
import { useQuery, useMutation } from 'convex/react'
import {api} from '../../../../convex/_generated/api'
import { TABLE_NAME } from '../../../../convex/schema';
import { Id } from '../../../../convex/_generated/dataModel';

function getTripData(slug: string) {
    const id = slug as Id<TABLE_NAME.TRIPS>
    const tripData = useQuery(api.trips.detail, {id});

    console.log(tripData)

    return tripData
}

export default function Page({ params }: { params: { slug: string } }) {
    const tripData = getTripData(params.slug)!
    
    return (
        <Home dayarray={tripData.days}/>
    );

}