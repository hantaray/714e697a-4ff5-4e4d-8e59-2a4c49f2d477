import { Injectable } from '@angular/core';
import { SingleEvent } from './single-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url = 'http://localhost:3000/';

  async getAllEvents(city: string): Promise<SingleEvent[]> {
    const data = await fetch(this.url + city);
    console.log('url', this.url)
    return await data.json() ?? [];
  }

  async getEventById(id: string): Promise<SingleEvent | undefined> {
    // Fetch all events
    const allEvents = await this.getAllEvents("berlin");

    // Find the event with the given ID
    const event = allEvents.find(event => event._id.toString() === id);

    return event;
  }
}
