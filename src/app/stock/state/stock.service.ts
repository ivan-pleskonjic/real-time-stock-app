import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { io } from 'socket.io-client';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { environment as env } from '../../../environments/environment';
import { settings } from '../../app.settings';
import { AppService } from '../../state/app.service';
import { currentTime } from '../../util/helpers';
import { Stock } from '../stock.model';
import { StockStore } from './stock.store';
import { StockQuery } from './stock.query';

@Injectable({ providedIn: 'root' })
export class StockService {
  ws: any;
  stopped$ = new Subject();
  private headers: HttpHeaders = new HttpHeaders();

  constructor(
    private http:       HttpClient,
    private stockStore: StockStore,
    private stockQuery: StockQuery,
    private appService: AppService
  ) {}

  startGettingData(): void {
    this.connect();
    this.getData();
    interval(3000)
      .pipe(takeUntil(this.stopped$))
      .subscribe(() => this.getData());
  }

  getData(): void {
    this.ws.emit('getData');
  }

  getYFData(): any {
    this.headers = this.headers.set('x-rapidapi-host',  settings.RAPID_API_HOST);
    this.headers = this.headers.set('x-rapidapi-key',   settings.RAPID_API_KEY);
    this.http.get(settings.RAPID_API_URL, { headers: this.headers })
      .subscribe( (data: any) => {
        this.handleReceivedData(data.quoteResponse?.result, true);
      });
  }

  toggleActive(stock: Stock): void {
    this.stockStore.toggleActive(stock.name);
  }

  stopGettingData(): void {
    this.stopped$.next();
    this.ws.disconnect();
  }

  private connect(): void {
    this.ws = io(env.WS_URL);
    this.ws.on('data', (data: any) => this.handleReceivedData(data));
  }

  private handleReceivedData(data: any, YFData = false) { 
    const newData = this.transform(data)
                        .map(stock => this.getStock(stock));

    this.appService.setGotDataFromYF(YFData);
    this.appService.setUpdateTime(currentTime())
    this.stockStore.set(newData);
  }
  
  private getStock(stock: Stock): any {
    if (!stock) return;
    const activeStocks  = this.stockQuery.getValue().active;
    const prev          = this.stockQuery.getEntity(stock?.name);

    if (!activeStocks.includes(stock.name) && prev) {
        return prev;
    }
    stock.decrease = prev && parseFloat(prev.price) > parseFloat(stock.price);

    return stock;
  }

  private transform(data: any[]): any[] {
    return data.map((obj) => {
      return {
        name:                   obj.symbol,
        price:                  obj.regularMarketPrice,
        dailyHighPrice:         obj.regularMarketDayHigh,
        dailyLowPrice:          obj.regularMarketDayLow,
        fiftyTwoWeekHighPrice:  obj.fiftyTwoWeekHigh,
        fiftyTwoWeekLowPrice:   obj.fiftyTwoWeekLow
      };
    });
  }
}
