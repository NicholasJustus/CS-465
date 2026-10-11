import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { TripPayload } from '../models/trip';
import { TripService } from '../services/trip.service';

@Component({
  selector: 'app-trip-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './trip-form.html',
  styleUrl: './trip-form.css'
})
export class TripForm implements OnInit {
  trip: any = {
    code: '',
    name: '',
    length: '',
    start: '',
    resort: '',
    perPerson: '',
    image: 'images/reef1.jpg',
    description: ''
  };

  loading = false;
  saving = false;
  errorMessage = '';
  isEditMode = false;
  tripCode = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private tripService: TripService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.tripCode = this.route.snapshot.paramMap.get('tripCode') || '';
    this.isEditMode = this.router.url.includes('/edit');

    if (this.isEditMode) {
      if (!this.tripCode) {
        this.errorMessage = 'No trip code was provided in the URL.';
        this.changeDetector.detectChanges();
        return;
      }

      this.loadTrip();
    }
  }

  loadTrip(): void {
    this.loading = true;
    this.errorMessage = '';
    this.changeDetector.detectChanges();

    this.tripService.getTrip(this.tripCode).subscribe({
      next: (result: any) => {
        const data = Array.isArray(result) ? result[0] : result;

        if (!data) {
          this.errorMessage = 'Trip not found.';
          this.loading = false;
          this.changeDetector.detectChanges();
          return;
        }

        this.trip = {
          ...data,
          start: data.start
            ? new Date(data.start).toISOString().substring(0, 10)
            : '',
          perPerson: String(data.perPerson ?? '').replace(/[$,]/g, '')
        };

        this.loading = false;
        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Could not load trip:', error);
        this.errorMessage =
          error.error?.message ||
          'Could not load this trip. Please try again.';
        this.loading = false;
        this.changeDetector.detectChanges();
      }
    });
  }

  saveTrip(form: NgForm): void {
    if (form.invalid || this.saving) {
      form.control.markAllAsTouched();
      return;
    }

    this.saving = true;
    this.errorMessage = '';
    this.changeDetector.detectChanges();

    let startDate: string;

    try {
      startDate = new Date(this.trip.start).toISOString();
    } catch {
      this.errorMessage = 'Please enter a valid start date.';
      this.saving = false;
      this.changeDetector.detectChanges();
      return;
    }

    const payload = {
      ...this.trip,
      start: startDate,
      perPerson: String(this.trip.perPerson)
    } as TripPayload;

    const request = this.isEditMode
      ? this.tripService.updateTrip(this.tripCode, payload)
      : this.tripService.addTrip(payload);

    request.subscribe({
      next: () => {
        this.router.navigate(['/trips']);
      },
      error: (error) => {
        console.error('Could not save trip:', error);
        this.errorMessage =
          error.error?.message ||
          'Could not save this trip. Please try again.';
        this.saving = false;
        this.changeDetector.detectChanges();
      }
    });
  }
}