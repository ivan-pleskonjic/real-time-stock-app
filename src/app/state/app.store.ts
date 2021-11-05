import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';

export interface AppState {
  lastUpdated: string;
  useMockedData: boolean;
}

export function createInitialState(): AppState {
  return {
    lastUpdated: '',
    useMockedData: true
  };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'app' })
export class AppStore extends Store<AppState> {
  constructor() {
    super(createInitialState());
  }
}
