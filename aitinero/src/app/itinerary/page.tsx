'use client';

import '@/app/globals.css'
import { Day } from '@/components/day'
import object from '@/components/sample.json'
import { AddEvent } from '@/components/addevent'
import { MoveEvent } from '@/components/moveevent'
import * as React from "react";
import Chatbot from "@/components/Chatbot/Chatbot";
import { Button } from "@/components/ui/button"
import { useQuery, useMutation } from 'convex/react'
import {api} from '../../../convex/_generated/api'

export default function Home() {
    const create = useMutation(api.events.create);
    const handleClick = () => {
    };
    function generateFunction() {}

    return (
        <main className="bg-white flex flex-row">
            <div className="w-[75vw] flex flex-col">
                <div className="h-20 flex flex-row items-end pl-[2vw]">
                    <Button variant="outline" onClick={generateFunction}>Generate!</Button>
                    <AddEvent />
                    <MoveEvent />
                </div>
                <div className="bg-white flex flex-row grow items-start py-10 overflow-x-auto">
                    <Day dayarray = {object.trips[0].days}/>
                </div>
            </div>
            <div className="w-[25vw]">
                <Chatbot />
            </div>
        </main>
    )
}
