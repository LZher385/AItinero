'use client';

import '@/app/globals.css';
import { Day } from '@/components/day';
import object from '@/components/sample.json';
import { AddEvent } from '@/components/addevent';
import { MoveEvent } from '@/components/moveevent';
import * as React from 'react';
import Chatbot from '@/components/Chatbot/Chatbot';
import { Button } from '@/components/ui/button';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { EVENT_STATUS, TABLE_NAME } from '../../convex/schema';
import { Id } from '../../convex/_generated/dataModel';
import { ModeToggle } from './ui/darkMode';

interface Props {
    tripId: Id<TABLE_NAME.TRIPS>;
    dayarray:
    | {
        date: string;
        events: ({
            _id: Id<'events'>;
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
    }[]
    | undefined;
}

export const Home: React.FC<Props> = ({ tripId, dayarray }) => {
    const trip = useQuery(api.trips.read, { id: tripId })
    const getSuggestions = useMutation(api.openai_interface.getsuggestions);
    const messageBody = `Location: ${trip?.location}, Start Date: ${trip?.start_date}, End Date: ${trip?.end_date}, Preferences: Bouldering, Swimming, Coffee`;
    const possibleSuggestions = useQuery(api.trips.possible_events, { id: tripId })

    const generateFunction = async () => {
        await getSuggestions({
            tripId,
            messageBody
        });
        console.log('woah!')
    };

    React.useEffect(() => {
        console.log(trip);
        console.log(possibleSuggestions);
    }, [trip, possibleSuggestions])

    return (
        <main className="flex flex-row">
            <div className="flex flex-col">
                <div className="p-10 h-20">
                    <div className=" flex flex-row items-end space-x-2 fixed">
                        <Button variant="outline" onClick={generateFunction}>
                            Generate!
                        </Button>
                        <AddEvent tripId={tripId} />
                        <MoveEvent dayarray={dayarray} />
                        <div className="place-self-end">
                            <ModeToggle />
                        </div>
                    </div>
                </div>
                {possibleSuggestions ? possibleSuggestions.map((event) => <div>
                    {event?.title}
                    {event?.description}
                </div>) : <div> FUCK!! </div>}

                <div className="flex flex-row h-[60-vh] overflow-y-auto items-start py-10 overflow-x-auto">
                    <Day tripId={tripId} dayarray={dayarray} />
                </div>
            </div>
        </main>
    );
};
