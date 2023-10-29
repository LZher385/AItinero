import * as React from "react"
 
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { EVENT_STATUS, TABLE_NAME } from '../../convex/schema';
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Id } from '../../convex/_generated/dataModel';

interface Props{
    tripId: Id<TABLE_NAME.TRIPS>,
    eventarray: ({
        _id: Id<"events">;
        _creationTime: number;
        location?: string | undefined;
        description?: string | undefined;
        context?: string | undefined;
        title: string;
        duration: string;
        start_time: string;
        end_time: string;
        status: EVENT_STATUS;
    } | null)[]
}

export const Eventbox: React.FC<Props> = ({tripId, eventarray}) => {
    
    const deleteEvent = useMutation(api.events.deleteEvent)
    const tripDetails = useQuery(api.trips.read, {id: tripId})
    const update = useMutation(api.trips.update)

    const handleClick = (eventId: Id<TABLE_NAME.EVENTS>) => {
        deleteEvent({ id: eventId });
        
        var tripEvents = tripDetails!.events
        const idx = tripEvents!.indexOf(eventId)
        const x = tripEvents!.splice(idx, 1)
    
        update({body: { id: tripId, events: tripEvents }})
        console.log("completed")
    };

    let eventlist = [];
    for (let i = 0; i < eventarray.length; i++) {
        if (eventarray[i] != null) {
            var keyvalue = i.toString() 
            eventlist.push(
                <Card key={keyvalue} className="w-[18vw] mb-[1vw]">
                    <CardHeader>
                        <CardTitle>{eventarray[i]!.title}</CardTitle>
                        <Label>{eventarray[i]!.start_time} to {eventarray[i]!.end_time}</Label>
                    </CardHeader>
                    <CardContent>
                        <CardDescription>{eventarray[i]!.description}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button onClick={() => handleClick(eventarray[i]!._id)} className="h-6 rounded-md px-3 m-1" >Delete Event</Button>
                    </CardFooter>
                </Card>
            )
        }
    }

    return eventlist;
}
