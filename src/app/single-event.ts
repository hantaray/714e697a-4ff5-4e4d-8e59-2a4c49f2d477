import { Venue } from "./venue";
import { Artist } from "./artist";

export interface SingleEvent {
  _id: number;
  title: string;
  flyerFront: string;
  attending: number;
  date: Date;
  startTime: Date;
  endTime: Date;
  // contentUrl: Date;
  venue: Venue;
  // pick: Pick;
  artists: Artist[];
  city: string;
  country: string;
  private: boolean;
}