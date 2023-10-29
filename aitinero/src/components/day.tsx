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

import { Eventbox } from "./event"
import { EVENT_STATUS } from '../../convex/schema';
import { Id } from '../../convex/_generated/dataModel';

interface Props{
    dayarray: {
        date: string;
        events: ({
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
        } | null)[];
    }[] | undefined
}

export const Day: React.FC<Props> = ({dayarray}) => {
    let daylist = [];
    if (dayarray != undefined) {
        for (let i = 0; i < dayarray.length; i++) {
            daylist.push(
                <Card className="w-[25vw] mx-[2vw] bg-yellow-50 h-full">
                    <CardHeader>
                        <CardTitle>{dayarray[i].date}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col">
                        <Eventbox eventarray = {dayarray[i].events}/>
                    </CardContent>
                    <CardFooter className="flex flex-wrap justify-between">
                        <Button variant="outline">Clear Events</Button>
                        <Button>Delete Day</Button>
                    </CardFooter>
                </Card>
            )
        }
    }
    
    return daylist;
}