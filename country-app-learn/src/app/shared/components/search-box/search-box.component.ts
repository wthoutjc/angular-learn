import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

const WAIT_INTERVAL = 500;

@Component({
  selector: 'shared-search-box',
  templateUrl: './search-box.component.html',
  styles: ``,
})
export class SearchBoxComponent implements OnInit, OnDestroy {
  private debouncer = new Subject<string>();

  @Input() placeholder: string = 'Search...';
  @Input() initialValue: string = '';

  @Output()
  onValue = new EventEmitter<string>();

  @ViewChild('txtInput')
  txtInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {
    this.debouncer.pipe(debounceTime(WAIT_INTERVAL)).subscribe((value) => {
      this.onValue.emit(value);
    });
  }

  ngOnDestroy(): void {
    this.debouncer?.unsubscribe();
  }

  emitValue(value: string) {
    this.onValue.emit(value);
  }

  onKeyPress(value: string) {
    this.debouncer.next(value);
  }
}
