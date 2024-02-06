import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventsComponent } from './events.component';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { RouterModule, ActivatedRoute } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

describe('EventsComponent', () => {
  let component: EventsComponent;
  let fixture: ComponentFixture<EventsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      imports: [CommonModule, RouterModule, MatIconModule],
      providers: [
        // Provide a stub for ActivatedRoute
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              params: { id: '1' } // Provide any needed params for testing
            },
            paramMap: new BehaviorSubject({ id: '1' }) // Provide a BehaviorSubject for paramMap
          }
        },
        MatDialog
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventsComponent);
    component = fixture.componentInstance;

    // Provide a mock singleEvent object
    component.singleEvent = {
      _id: 1,
      title: 'Test Event',
      flyerFront: 'path/to/flyer.jpg',
      attending: 100,
      date: new Date(),
      startTime: new Date(),
      endTime: new Date(),
      venue: {
        id: 1,
        name: 'Test Venue',
        contenturl: 'path/to/venue',
        direction: 'path/to/direction'
      },
      artists: [],
      city: 'Test City',
      country: 'Test Country',
      private: false
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
