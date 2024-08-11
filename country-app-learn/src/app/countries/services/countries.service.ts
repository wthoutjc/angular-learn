import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { Region } from '../pages/by-region-page/by-region-page.component';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  private readonly url = 'https://restcountries.com/v3.1';

  public cacheStore = {
    byCapital: { capital: '', countries: [] as Country[] },
    byRegion: { region: '' as Region, countries: [] as Country[] },
    byCountry: { country: '', countries: [] as Country[] },
  };

  constructor(private readonly http: HttpClient) {
    this.loadFromLocalStorage();
  }

  private saveToLocalStorage() {
    localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
  }

  private loadFromLocalStorage() {
    const cacheStore = localStorage.getItem('cacheStore');
    if (cacheStore) this.cacheStore = JSON.parse(cacheStore);
  }

  private getCountriesRequest(url: string): Observable<Country[]> {
    return this.http.get<Country[]>(url).pipe(
      catchError((error) => {
        console.error('[ERROR] CountriesService.getCountriesRequest:', error);
        return of([]);
      })
    );
  }

  searchByCapital(capital: string): Observable<Country[]> {
    const url = `${this.url}/capital/${capital}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byCapital = { capital, countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchByRegion(region: Region): Observable<Country[]> {
    const url = `${this.url}/region/${region}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byRegion = { region, countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchByCountry(country: string): Observable<Country[]> {
    const url = `${this.url}/name/${country}`;
    return this.getCountriesRequest(url).pipe(
      tap((countries) => {
        this.cacheStore.byCountry = { country, countries };
      }),
      tap(() => this.saveToLocalStorage())
    );
  }

  searchByCountryCode(countryCode: string): Observable<Country | null> {
    const url = `${this.url}/alpha/${countryCode}`;
    return this.http.get<Country[]>(url).pipe(
      map((countries) => countries[0] || null),
      catchError((error) => {
        console.error('[ERROR] CountriesService.searchByCountryCode:', error);
        return of(null);
      })
    );
  }
}
