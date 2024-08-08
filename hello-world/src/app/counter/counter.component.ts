import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
})
export class CounterComponent {
  @Input()
  public counter = 0;

  @Output()
  public onChange: EventEmitter<number> = new EventEmitter<number>();

  set(value: number) {
    this.counter = value;
    this.emitValue();
  }

  emitValue() {
    this.onChange.emit(this.counter);
  }
}
