import { Injectable } from '@angular/core';
import { EntityState, EntityStore, MultiActiveState, StoreConfig } from '@datorama/akita';

import { Stock } from '../stock.model';

export interface StockState extends EntityState<Stock, string>, MultiActiveState {
  active: string[];
}

export function createInitialState(): StockState {
  return {
    active: []
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'stock', idKey: 'name' })
export class StockStore extends EntityStore<StockState> {
  constructor() {
    super(createInitialState());
  }
}
