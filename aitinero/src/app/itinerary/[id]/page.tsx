'use client';

import { useEffect } from "react"
import { Home } from '@/components/itinerarylayout';
import { useQuery, useMutation } from 'convex/react'
import {api} from '../../../../convex/_generated/api'
import { TABLE_NAME } from '../../../../convex/schema';
import { Id } from '../../../../convex/_generated/dataModel';

function getTripData(slug: string) {
    const id2 = slug as Id<TABLE_NAME.TRIPS>
    const tripData = useQuery(api.trips.detail, {id: id2});

    return tripData
}

export default function Page({ params }: { params: { id: string } }) {

    const tripData = getTripData(params.id)!
    
    return (
        <Home tripId={params.id as Id<TABLE_NAME.TRIPS>} dayarray={tripData?.days}/>
    );

}