'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SetStateAction, useEffect, useState } from 'react';
import { useQuery, useMutation } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { EVENT_STATUS, TABLE_NAME } from '../../convex/schema';
import { Id } from '../../convex/_generated/dataModel';
import { useRouter } from 'next/navigation';

interface Props {
  tripId: Id<TABLE_NAME.TRIPS>;
}

export const AddEvent: React.FC<Props> = ({ tripId }) => {
  let router = useRouter();

  const [eventName, setEventName] = useState<string>('');
  const changeEventName = (name: SetStateAction<string>) => setEventName(name);

  const [eventDate, setEventDate] = useState<string>('');
  const changeEventDate = (date: SetStateAction<string>) => setEventDate(date);

  const [startTime, setStartTime] = useState<string>('');
  const changeStartTime = (starttime: SetStateAction<string>) =>
    setStartTime(starttime);

  const [endTime, setEndTime] = useState<string>('');
  const changeEndTime = (endtime: SetStateAction<string>) =>
    setEndTime(endtime);

  const [eventDescription, setEventDescription] = useState<string>('');
  const changeEventDescription = (eventdescription: SetStateAction<string>) =>
    setEventDescription(eventdescription);

  const create = useMutation(api.events.create);
  const tripDetails = useQuery(api.trips.read, { id: tripId });
  const update = useMutation(api.trips.update);

  const handleClick = async () => {
    let realStartTime = eventDate + 'T' + startTime + ':00.000Z';
    let realEndTime = eventDate + 'T' + endTime + ':00.000Z';
    const eventId = await create({
      event: {
        start_time: realStartTime,
        end_time: realEndTime,
        title: eventName,
        description: eventDescription
      }
    }).then((data) => data);

    if (
      tripDetails!.hasOwnProperty('events') &&
      tripDetails!.events != undefined
    ) {
      var tripEvents = tripDetails!.events;
      tripEvents.push(eventId);
    } else {
      tripEvents = [eventId];
    }
    update({ body: { id: tripId, events: tripEvents } });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Add Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add Event</DialogTitle>
          <DialogDescription>
            Manually add an event or an activity that you want to schedule.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventname" className="text-right">
              Event Name
            </Label>
            <Input
              id="eventname"
              defaultValue=""
              className="col-span-3"
              onChange={(e) => changeEventName(e.target.value)}
              value={eventName}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="eventdate" className="text-right">
              Date
            </Label>
            <Input
              type="date"
              id="eventdate"
              className="col-span-3"
              onChange={(e) => changeEventDate(e.target.value)}
              value={eventDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="starttime" className="text-right">
              Start Time
            </Label>
            <Input
              type="time"
              id="starttime"
              className="col-span-3"
              onChange={(e) => changeStartTime(e.target.value)}
              value={startTime}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="endtime" className="text-right">
              End Time
            </Label>
            <Input
              type="time"
              id="endtime"
              className="col-span-3"
              onChange={(e) => changeEndTime(e.target.value)}
              value={endTime}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              defaultValue=""
              className="col-span-3"
              onChange={(e) => changeEventDescription(e.target.value)}
              value={eventDescription}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              type="submit"
              onClick={() => {
                handleClick();
              }}
            >
              Submit
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
