import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

import { EventsService } from '../events.service';
import { SingleEvent } from '../single-event';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, CommonModule],
  template: `
  <article class="article">
  <div class="content">
    <section class="listing-description">
      <h1 class="listing-heading">{{singleEvent?.title}}</h1>
      <p class="listing-location">{{singleEvent?.city}}, {{singleEvent?.country}}</p>
      <ul>
        <li class="listing-text"><a href="{{ singleEvent?.venue?.direction }}" target="_blank"><mat-icon> location_on</mat-icon> {{ singleEvent?.venue?.name }}</a></li>
        <li class="listing-text">Starts: {{ singleEvent?.startTime | date: 'dd.MM.yyyy hh:mm:ss' }}</li>
        <li class="listing-text">Ends: {{ singleEvent?.endTime | date: 'dd.MM.yyyy hh:mm:ss' }}</li>
        <li class="listing-text">Attending people: {{ singleEvent?.attending }}</li>
        <li class="listing-text">Private event?: {{ singleEvent?.private }}</li>
        <li class="listing-text">Artists:</li>
        <ul>
          <li class="listing-text" *ngFor="let artist of singleEvent?.artists">{{ artist.name }}</li>
        </ul>
      </ul>
    </section>
  </div>
  <div class="image-container">
    <img class="listing-flyer" [src]="singleEvent?.flyerFront" alt="Flyer image of {{singleEvent?.flyerFront}}" />
  </div>
</article>

`,
  styleUrl: './details.component.sass'
})

export class DetailsComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  eventsService = inject(EventsService);
  singleEvent: SingleEvent | undefined;

  constructor() {
    const eventId = parseInt(this.route.snapshot.params['id'], 10);
    this.eventsService.getEventById(eventId.toString()).then(singleEvent => {
      this.singleEvent = singleEvent;
    });
  }
}
