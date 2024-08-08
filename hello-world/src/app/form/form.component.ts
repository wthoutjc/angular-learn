import { Component, EventEmitter, Input, Output } from '@angular/core';

const INITIAL_COUNTER = 0;

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css',
})
export class FormComponent {
  @Input()
  public counter = INITIAL_COUNTER;

  @Output()
  public onSubmit: EventEmitter<number> = new EventEmitter<number>();

  emitValue() {
    this.onSubmit.emit(this.counter);
    this.counter = INITIAL_COUNTER;
  }
}
