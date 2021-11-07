import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StockService } from './stock.service';
import { StockQuery } from './stock.query';
import { StockStore } from './stock.store';
import { Stock } from '../stock.model';

const TEST_SOURCE_OBJECT = {
  symbol: 'GOOG',
  regularMarketPrice: '100',
  regularMarketDayHigh: '120',
  regularMarketDayLow: '90',
  fiftyTwoWeekLow: '50',
  fiftyTwoWeekHigh: '150'
};

const TRANSFORMED_STOCK: Stock = {
  name: 'GOOG',
  price: '100',
  dailyHighPrice: '120',
  dailyLowPrice: '90',
  fiftyTwoWeekHighPrice: '150',
  fiftyTwoWeekLowPrice: '50',
  decrease: undefined
};

describe('StockService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [StockService, StockQuery]
    });
  });

  it('should be create StockService', inject([StockService], (service: StockService) => {
    expect(service).toBeTruthy();
  }));

  it('should transform received data properly with transform method', inject(
    [StockService],
    (service: StockService) => {
      const result = service.transform([TEST_SOURCE_OBJECT]);
      expect(result).toBeTruthy();
      expect(result).toContain(TRANSFORMED_STOCK);
    }
  ));

  it('should set the decrease property of the Stock with getStock', inject(
    [StockService, StockStore],
    (service: StockService, store: StockStore) => {
      store.set([TRANSFORMED_STOCK]);
      store.setActive([TRANSFORMED_STOCK.name]);
      const arg    = Object.assign({}, TRANSFORMED_STOCK); // make the object extensible
      const result = service.getStock(arg);

      expect(result.decrease).toBeDefined();
    }
  ));
});
