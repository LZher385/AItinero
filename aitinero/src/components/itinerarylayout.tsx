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
  function generateFunction() {}

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

        <div className="flex flex-row h-[60-vh] overflow-y-auto items-start py-10 overflow-x-auto">
          <Day tripId={tripId} dayarray={dayarray} />
        </div>
      </div>
    </main>
  );
};
