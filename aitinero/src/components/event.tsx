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

interface Props{
    eventarray: {
        title: string,
        start_time:string,
        end_time:string,
        description:string
    }[]
}

export const Eventbox: React.FC<Props> = ({eventarray}) => {
    let eventlist = [];
    for (let i = 0; i < eventarray.length; i++) {
        eventlist.push(
            <Card className="w-[18vw] mb-[1vw]">
                <CardHeader>
                    <CardTitle>{eventarray[i].title}</CardTitle>
                    <Label>{eventarray[i].start_time} to {eventarray[i].end_time}</Label>
                </CardHeader>
                <CardContent>
                    <CardDescription>{eventarray[i].description}</CardDescription>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button className="h-6 rounded-md px-3 m-1">Delete Event</Button>
                </CardFooter>
            </Card>
        )
    }

    return eventlist;
}
