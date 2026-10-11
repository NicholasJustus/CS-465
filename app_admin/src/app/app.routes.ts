import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripForm } from './trip-form/trip-form';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'trips', component: TripListing },
  { path: 'trips/new', component: TripForm },
  { path: 'trips/:tripCode/edit', component: TripForm },
  { path: '**', redirectTo: 'trips' }
];
