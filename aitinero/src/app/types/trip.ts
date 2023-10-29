import { Id } from "../../../convex/_generated/dataModel" 
export interface Trip {
    _id: Id<"trips">;
    _creationTime: number;
    events?: Id<"events">[] | undefined;
    start_date: string;
    end_date: string;
    name: string;
    location: string;
}