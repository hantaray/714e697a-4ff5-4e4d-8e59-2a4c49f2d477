import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { DetailsComponent } from './details.component'; // Import DetailsComponent directly
import { EventsService } from '../events.service';
import { of } from 'rxjs';
import { SingleEvent } from '../single-event';

describe('DetailsComponent', () => {
  let component: DetailsComponent;
  let fixture: ComponentFixture<DetailsComponent>;
  let eventsServiceSpy: jasmine.SpyObj<EventsService>;
  const mockSingleEvent: SingleEvent = {
    _id: 1,
    title: 'Test Event',
    city: 'Test City',
    country: 'Test Country',
    venue: { id: 1, name: 'Test Venue', direction: 'test_direction', contenturl: 'test_contenturl' },
    date: new Date(),
    startTime: new Date(),
    endTime: new Date(),
    attending: 50,
    private: false,
    artists: [{ id: 1, name: 'Artist 1' }, { id: 2, name: 'Artist 2' }],
    flyerFront: 'test_image_url'
  };

  beforeEach(async () => {
    eventsServiceSpy = jasmine.createSpyObj('EventsService', ['getEventById']);

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, MatIconModule, CommonModule],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } },
        { provide: EventsService, useValue: eventsServiceSpy }
      ]
    }).compileComponents();

    eventsServiceSpy.getEventById.and.returnValue(of(mockSingleEvent).toPromise());
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch single event details from the service', async () => {
    expect(component.singleEvent).toBeUndefined();

    await fixture.whenStable();

    expect(component.singleEvent).toEqual(mockSingleEvent);
  });
});
