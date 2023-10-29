'use client';

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SetStateAction, useEffect, useState } from "react"
import { EVENT_STATUS } from "../../convex/schema";
import { Id } from '../../convex/_generated/dataModel';

interface Props {
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

export const MoveEvent: React.FC<Props> = ({dayarray}) => {
  const [currentEventDate, setCurrentEventDate] = useState<string>('')
  const changeCurrentEventDate = (currentdate: SetStateAction<string>) => setCurrentEventDate(currentdate)

  const [currentEventTime, setCurrentEventTime] = useState<string>('')
  const changeCurrentEventTime = (currenttime: SetStateAction<string>) => setCurrentEventTime(currenttime)

  const [newEventDate, setNewEventDate] = useState<string>('')
  const changeNewEventDate = (newdate: SetStateAction<string>) => setNewEventDate(newdate)

  const [newEventTime, setNewEventTime] = useState<string>('')
  const changeNewEventTime = (currenttime: SetStateAction<string>) => setNewEventTime(currenttime)

  function moveeventFunction() {
    console.log((currentEventDate + "T" + currentEventTime + ":00.000Z"), (newEventDate + "T" + newEventTime + ":00.000Z"))
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Move Event</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Move Event</DialogTitle>
          <DialogDescription>
            Manually move an event or an activity to another timing.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currenteventdate" className="text-right">
              Current Date
            </Label>
            <Input
              type="date"
              id="currenteventdate"
              className="col-span-3"
              onChange={e => changeCurrentEventDate(e.target.value)}
              value={currentEventDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="currentstarttime" className="text-right">
              Current Start Time
            </Label>
            <Input
              type="time"
              id="currentstarttime"
              className="col-span-3"
              onChange={e => changeCurrentEventTime(e.target.value)}
              value={currentEventTime}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="neweventdate" className="text-right">
              New Date
            </Label>
            <Input
              type="date"
              id="neweventdate"
              className="col-span-3"
              onChange={e => changeNewEventDate(e.target.value)}
              value={newEventDate}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="newstarttime" className="text-right">
              New Start Time
            </Label>
            <Input
              type="time"
              id="newstarttime"
              className="col-span-3"
              onChange={e => changeNewEventTime(e.target.value)}
              value={newEventTime}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={moveeventFunction}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}