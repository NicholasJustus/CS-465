import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-card',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, RouterLink],
  templateUrl: './trip-card.html',
  styleUrl: './trip-card.css'
})
export class TripCard {
  @Input({ required: true }) trip!: Trip;
  @Output() deleteRequested = new EventEmitter<Trip>();
}
