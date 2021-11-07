import { Component, OnDestroy, OnInit } from '@angular/core';
import { persistState } from '@datorama/akita';
import { Observable, Subject } from 'rxjs';

import { Stock } from './stock/stock.model';
import { StockQuery } from './stock/state/stock.query';
import { StockService } from './stock/state/stock.service';
import { AppService } from './state/app.service';
import { AppQuery } from './state/app.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  destoryed$                    = new Subject();
  activeStocks: string[]        = [];
  stocks$: Observable<Stock[]>  = new Observable<Stock[]>();

  constructor(
    public appQuery: AppQuery,
    private appService: AppService,
    private stockService: StockService,
    private stockQuery: StockQuery
  ) {}

  ngOnInit(): void {
    this.persistState();
    this.syncState();
  }

  onToggleClicked(e: any): void {
    this.stockService.toggleActive(e);
  }

  toggleSource(e: any): void {
    this.appService.toggleSource();
    if (e.target.checked) {
      this.stockService.stopGettingData();
    } else {
      this.stockService.startGettingData();
    }
  }

  getYFData(): void {
    this.stockService.getYFData();
  }

  private persistState(): void {
    const storesToPersist: string[] = ['app', 'stock'];

    persistState({
      include: storesToPersist
    });
  }

  private syncState(): void {
    /** Stocks state */
    if (this.appQuery.getValue().useMockedData) {
      this.stockService.startGettingData();
    }
    this.stocks$ = this.stockQuery.selectAll();
    this.stockQuery.selectActiveId()
      .subscribe((activeStocks: any) => (this.activeStocks = activeStocks));
  }

  ngOnDestroy(): void {
    this.stockService.stopGettingData();
    this.destoryed$.next();
    this.destoryed$.complete();
  }
}
