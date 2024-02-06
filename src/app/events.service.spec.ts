import { TestBed } from '@angular/core/testing';
import { EventsService } from './events.service';

describe('EventsService', () => {
  let service: EventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventsService]
    });
    service = TestBed.inject(EventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all events', (done: DoneFn) => {
    service.getAllEvents().then(events => {
      expect(events).toBeTruthy();
      expect(events.length).toBeGreaterThan(0);
      done();
    }).catch(error => {
      // Fail the test if there's an error in fetching events
      fail(error);
      done();
    });
  });

  it('should fetch event by ID', (done: DoneFn) => {
    const eventId = '1457670'; // Assuming this ID exists in sample data

    service.getEventById(eventId).then(event => {
      expect(event).toBeTruthy();
      expect(event?._id.toString()).toBe(eventId); // Convert _id to a string for comparison
      done();
    }).catch(error => {
      // Fail the test if there's an error in fetching event by ID
      fail(error);
      done();
    });
  });

  it('should return undefined for non-existent event ID', (done: DoneFn) => {
    const nonExistentEventId = '999999'; // Assuming this ID does not exist in sample data

    service.getEventById(nonExistentEventId).then(event => {
      expect(event).toBeUndefined();
      done();
    }).catch(error => {
      // Fail the test if there's an error
      fail(error);
      done();
    });
  });
});
