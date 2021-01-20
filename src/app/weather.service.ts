import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Location } from './types';
import { NewsService } from './news.service';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private location: Location;

  constructor(private httpClient: HttpClient) { }

  async getWeather(): Promise<Observable<any>> {
    try {
      this.location = await this.getLocation();
    } catch (error) {
      this.location = {
        latitude: 40.7128,
        longitude: 74.0060
      };
    }
    let apiUrl = environment.weatherApiUrl;
    apiUrl += '?lat=' + this.location.latitude;
    apiUrl += '&lon=' + this.location.longitude;
    apiUrl += '&units=imperial';
    apiUrl += '&appid=' + environment.weatherApiKey;
    console.log(apiUrl);
    return this.httpClient.get(apiUrl).pipe(catchError(NewsService.handleError));
  }

  private getLocation(): Promise<Location> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(position => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        })
      }, error => reject(error));
    })
  }

  getDate(time: number): string {
    const date = new Date(time * 1000);
    return date.toDateString().slice(0, -4);
  }
}
