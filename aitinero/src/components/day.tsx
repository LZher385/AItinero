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

interface Props{
    dayarray: {
        date: string,
        events: {
            title: string,
            start_time:string,
            end_time:string,
            description:string
        }[]
    }[]
}

export const Day: React.FC<Props> = ({dayarray}) => {
    let daylist = [];
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

    return daylist;
}