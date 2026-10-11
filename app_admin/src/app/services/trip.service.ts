import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trip, TripPayload } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripService {
  private readonly apiUrl = 'http://localhost:3000/api/trips';

  constructor(private http: HttpClient) {}

  getTrips(): Observable<Trip[]> {
    return this.http.get<Trip[]>(this.apiUrl);
  }

  getTrip(code: string): Observable<Trip> {
    return this.http.get<Trip>(`${this.apiUrl}/${encodeURIComponent(code)}`);
  }

  addTrip(trip: TripPayload): Observable<Trip> {
    return this.http.post<Trip>(this.apiUrl, trip);
  }

  updateTrip(code: string, trip: TripPayload): Observable<Trip> {
    return this.http.put<Trip>(`${this.apiUrl}/${encodeURIComponent(code)}`, trip);
  }

  deleteTrip(code: string): Observable<{ message: string; trip: Trip }> {
    return this.http.delete<{ message: string; trip: Trip }>(
      `${this.apiUrl}/${encodeURIComponent(code)}`
    );
  }
}
