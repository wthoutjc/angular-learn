import { Component, OnInit } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-by-capital-page',
  templateUrl: './by-capital-page.component.html',
  styles: ``,
})
export class ByCapitalPageComponent implements OnInit {
  countries: Country[] = [];
  isLoading: boolean = false;
  initialValue: string = '';

  constructor(private readonly countriesService: CountriesService) {}

  ngOnInit(): void {
    this.countries = this.countriesService.cacheStore.byCapital.countries;
    this.initialValue = this.countriesService.cacheStore.byCapital.capital;
  }

  searchByCapital(capital: string) {
    this.isLoading = true;

    this.countriesService.searchByCapital(capital).subscribe((countries) => {
      this.isLoading = false;
      this.countries = countries;
    });
  }
}
