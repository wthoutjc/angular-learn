import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'shared-lazy-image',
  templateUrl: './lazy-image.component.html',
})
export class LazyImageComponent implements OnInit {
  @Input()
  public url!: string;

  @Input()
  public alt!: string;

  hasLoaded = false;

  ngOnInit(): void {
    if (!this.url) throw new Error('Attribute url is required');
    if (!this.alt) throw new Error('Attribute alt is required');
  }

  onLoad(): void {
    this.hasLoaded = true;
  }
}
