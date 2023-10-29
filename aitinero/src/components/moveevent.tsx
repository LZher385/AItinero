'use client';

import * as React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SetStateAction, useEffect, useState } from "react"
import { EVENT_STATUS, TABLE_NAME } from "../../convex/schema";
import { Id } from '../../convex/_generated/dataModel';
import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api";

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

  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const [newEventDate, setNewEventDate] = useState<string>('')
  const changeNewEventDate = (newdate: SetStateAction<string>) => setNewEventDate(newdate)

  const [newEventStartTime, setNewEventStartTime] = useState<string>('')
  const changeNewEventStartTime = (newstarttime: SetStateAction<string>) => setNewEventStartTime(newstarttime)

  const [newEventEndTime, setNewEventEndTime] = useState<string>('')
  const changeNewEventEndTime = (newendtime: SetStateAction<string>) => setNewEventEndTime(newendtime)

  var eventarray = []

  if (dayarray == undefined){
    dayarray = []
  } 

  for (let i = 0; i < dayarray.length; i++) {
    const eventlist = dayarray[i].events 
    if (eventlist != null) {
      for (let j = 0; j < eventlist.length; j++) {
        eventarray.push({
          value: eventlist[j]!._id,
          label: eventlist[j]!.title
        })
      }
    }
  }

  const update = useMutation(api.events.update);
  const handleClick = () => {
    let newStartTime = newEventDate + "T" + newEventStartTime + ":00.000Z"
    let newEndTime = newEventDate + "T" + newEventEndTime + ":00.000Z"
    update({ event: {id: value as Id<TABLE_NAME.EVENTS>, start_time: newStartTime, end_time: newEndTime}});
  };

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
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  aria-expanded={open}
                  className="w-[200px] justify-between"
                >
                  {value
                    ? eventarray.find((eventarray) => eventarray.value === value)?.label
                    : "Select framework..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[200px] p-0">
                <Command>
                  <CommandInput placeholder="Search framework..." />
                  <CommandEmpty>No framework found.</CommandEmpty>
                  <CommandGroup>
                    {eventarray.map((eventarray) => (
                      <CommandItem
                        key={eventarray.value}
                        value={eventarray.value}
                        onSelect={(currentValue) => {
                          setValue(currentValue === value ? "" : currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            value === eventarray.value ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {eventarray.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
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
              onChange={e => changeNewEventStartTime(e.target.value)}
              value={newEventStartTime}
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
              onChange={e => changeNewEventEndTime(e.target.value)}
              value={newEventEndTime}
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleClick}>Submit</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}