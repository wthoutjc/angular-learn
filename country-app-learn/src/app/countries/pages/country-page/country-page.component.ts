import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CountriesService } from '../../services/countries.service';
import { switchMap } from 'rxjs';
import { Country } from '../../interfaces/country';

@Component({
  selector: 'countries-country-page',
  templateUrl: './country-page.component.html',
  styles: ``,
})
export class CountryPageComponent implements OnInit {
  public country?: Country;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly countriesService: CountriesService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params
      .pipe(
        switchMap(({ id }) => this.countriesService.searchByCountryCode(id))
      )
      .subscribe((country) => {
        if (!country) return this.router.navigate(['/countries']);
        return (this.country = country);
      });
  }
}
