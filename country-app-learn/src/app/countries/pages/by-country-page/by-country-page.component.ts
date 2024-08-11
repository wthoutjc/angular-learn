import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-country-page',
  templateUrl: './by-country-page.component.html',
  styles: ``,
})
export class ByCountryPageComponent implements OnInit {
  isLoading = false;
  countries: Country[] = [];
  initialValue: string = '';

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCountry.countries;
    this.initialValue = this.countriesService.cacheStore.byCountry.country;
  }

  searchByCountry(code: string) {
    this.isLoading = true;

    this.countriesService.searchByCountry(code).subscribe((countries) => {
      this.countries = countries;
      this.isLoading = false;
    });
  }
}
