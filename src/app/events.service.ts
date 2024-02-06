import { Injectable } from '@angular/core';
import { SingleEvent } from './single-event';

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  url = 'https://teclead-ventures.github.io/data/london-events.json';

  async getAllEvents(): Promise<SingleEvent[]> {
    const data = await fetch(this.url);
    console.log('url', this.url)
    return await data.json() ?? [];
  }

  async getEventById(id: string): Promise<SingleEvent | undefined> {
    // Fetch all events
    const allEvents = await this.getAllEvents();

    // Find the event with the given ID
    const event = allEvents.find(event => event._id.toString() === id);

    return event;
  }
}
