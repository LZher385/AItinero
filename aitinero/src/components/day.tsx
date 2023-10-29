import * as React from 'react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';

import { Eventbox } from './event';
import { EVENT_STATUS, TABLE_NAME } from '../../convex/schema';
import { Id } from '../../convex/_generated/dataModel';

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

export const Day: React.FC<Props> = ({ tripId, dayarray }) => {
  let daylist = [];
  if (dayarray != undefined) {
    for (let i = 0; i < dayarray.length; i++) {
      var keyvalue = i.toString();
      daylist.push(
        <Card
          key={keyvalue}
          className="w-[25vw] mx-[2vw] h-[60vh] overflow-y-auto"
        >
          <CardHeader>
            <CardTitle>{dayarray[i].date}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col">
            <Eventbox tripId={tripId} eventarray={dayarray[i].events} />
          </CardContent>
        </Card>
      );
    }
  }

  return daylist;
};
