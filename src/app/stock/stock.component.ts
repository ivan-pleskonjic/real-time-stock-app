import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { Stock } from './stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.scss']
})
export class StockComponent implements OnInit, OnChanges {
  @Input() activeStocks: any[] = [];
  @Input() stock: Stock | undefined;

  @Output() toggleClicked = new EventEmitter<any>();

  active: boolean = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.active = this.stock ? this.activeStocks.includes(this.stock?.name) : false;
  }

  ngOnInit(): void {}

  toggle(event: any) {
    this.toggleClicked.emit(event);
  }
}
