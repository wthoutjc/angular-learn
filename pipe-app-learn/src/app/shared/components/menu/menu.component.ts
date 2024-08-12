import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

const INIT_ITEMS: MenuItem[] = [
  {
    label: 'Pipes de Angular',
    icon: 'pi pi-desktop',
    items: [
      {
        label: 'Textos y Fechas',
        icon: 'pi pi-align-left',
        routerLink: '/',
      },
      {
        label: 'Números',
        icon: 'pi pi-dollar',
        routerLink: '/numbers',
      },
      {
        label: 'No comunes',
        icon: 'pi pi-globe',
        routerLink: '/uncommons',
      },
    ],
  },
  {
    label: 'Pipes personalizados',
    icon: 'pi pi-cog',
    items: [
      {
        label: 'Custom pipes',
        icon: 'pi pi-sort-alpha-up',
        routerLink: '/customs',
      },
    ],
  },
];

@Component({
  selector: 'shared-menu',
  templateUrl: './menu.component.html',
  styles: ``,
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = INIT_ITEMS;
  }
}
