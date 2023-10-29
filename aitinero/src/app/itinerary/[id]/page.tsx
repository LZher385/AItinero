import { Home } from '@/components/itinerarylayout';

type Trip = {
    trip: {
        name: string,
        days: {
            date: string,
            events: {
                title: string,
                start_time:string,
                end_time:string,
                description:string
            }[]
        }[]
    }[]; 
}

async function getTripData(slug: string) {
    const res = await fetch(`https:/`)
    const tripData = await res.json()
    return tripData
}

export default async function Page({ params }: { params: { slug: string } }) {
    const tripData = await getTripData(params.slug)
    
    return (
        <Home dayarray = {tripData.trip[0].days}/>
    );

}