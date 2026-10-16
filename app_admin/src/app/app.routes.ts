
import { Routes } from '@angular/router';
import { TripListing } from './trip-listing/trip-listing';
import { TripForm } from './trip-form/trip-form';
import { Login } from './login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'trips', pathMatch: 'full' },
  { path: 'login', component: Login },
  { path: 'trips', component: TripListing },
  { path: 'trips/new', component: TripForm },
  { path: 'trips/:tripCode/edit', component: TripForm },
  { path: '**', redirectTo: 'trips' }
];
