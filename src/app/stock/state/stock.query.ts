import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';

import { StockStore, StockState } from './stock.store';

@Injectable({ providedIn: 'root' })
export class StockQuery extends QueryEntity<StockState> {
    activeStockIds$ = this.select( state => state.active );

    constructor(protected store: StockStore) {
        super(store);
    }
}