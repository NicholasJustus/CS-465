
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TripCard } from '../trip-card/trip-card';
import { Trip } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-listing',
  standalone: true,
  imports: [TripCard, RouterLink],
  templateUrl: './trip-listing.html',
  styleUrl: './trip-listing.css'
})
export class TripListing implements OnInit {
  trips: Trip[] = [];
  loading = true;
  errorMessage = '';
  successMessage = '';

  constructor(
    private tripService: TripService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTrips();
  }

  loadTrips(): void {
    this.loading = true;
    this.errorMessage = '';
    this.changeDetector.detectChanges();

    this.tripService.getTrips().subscribe({
      next: (trips) => {
        this.trips = trips;
        this.loading = false;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Error loading trips:', error);
        this.errorMessage =
          error.error?.message ||
          'Could not load trips. Make sure the Express server is running.';
        this.loading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  deleteTrip(trip: Trip): void {
    if (!window.confirm(`Delete "${trip.name}" (${trip.code})?`)) {
      return;
    }

    this.tripService.deleteTrip(trip.code).subscribe({
      next: () => {
        this.successMessage = `${trip.name} was deleted.`;
        this.loadTrips();
      },
      error: (error) => {
        console.error('Error deleting trip:', error);
        this.errorMessage =
          error.error?.message || 'Could not delete this trip.';
        this.changeDetector.detectChanges();
      }
    });
  }
}
