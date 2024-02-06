import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomeComponent } from './home.component';
import { EventsService } from '../events.service';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let eventsService: EventsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [],
      providers: [EventsService]
    }).compileComponents();

    eventsService = TestBed.inject(EventsService);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize variables correctly', () => {
    expect(component.eventDate).toBeDefined();
    expect(component.singleEventList).toEqual([]);
    expect(component.filteredEventsList).toEqual([]);
    expect(component.eventsInCartList).toEqual([]);
    expect(component.cartContentCount).toEqual(0);
    expect(component.displayedDate).toBeNull();
  });
});
