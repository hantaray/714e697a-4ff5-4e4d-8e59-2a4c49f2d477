import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SingleEvent } from './single-event';
import { HomeComponent } from './home/home.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HomeComponent, RouterModule, MatMenuModule, MatIconModule, MatListModule],
  template: `
  <main>
    <a [routerLink]="['/']">
      <header class="brand-name">
        <img class="brand-logo" src="/assets/eventmood_logo.png" alt="EventMood logo" aria-hidden="true" />
        <div class="menu-button">
        <button class="shopping-cart-button" mat-icon-button [matMenuTriggerFor]="menu">
          <mat-icon>shopping_cart</mat-icon>
          <!-- Display the count of items in the cart -->
          <span class='badge badge-warning' id='lblCartCount' *ngIf="cartContentCount > 0">{{cartContentCount}}</span>
        </button>
        <!-- Shopping cart menu -->
        <mat-menu #menu="matMenu">
          <h2 class="cart">Your events:</h2>
          <p class="cart" *ngIf="cartContentCount == 0">There are no events in your cart</p>
          <!-- Display events in the cart -->
          <mat-list class="cart" role="list" *ngFor="let singleEvent of eventsInCartList">
            <p>{{singleEvent.title}}</p><button mat-icon-button (click)="removeFromCart(singleEvent)">X</button>
          </mat-list>
        </mat-menu>
      </div>
      </header>
    </a>
    <section class="content">
      <router-outlet></router-outlet>
    </section>
  </main>
`,
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'events';
  cartContentCount: number = 0;
  filteredEventsList: SingleEvent[] = [];
  eventsInCartList: SingleEvent[] = [];

  removeFromCart(event: SingleEvent) {
    this.eventsInCartList = this.eventsInCartList.filter((e) => e._id !== event._id);
    this.filteredEventsList.push(event);
    // Sort the events by date
    this.filteredEventsList = this.filteredEventsList.sort((a, b) => (a.date < b.date ? -1 : 1));

    // Update the count of items in the cart
    this.cartContentCount = this.eventsInCartList.length;
  }
}
