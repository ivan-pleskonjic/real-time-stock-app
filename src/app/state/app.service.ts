import { Injectable } from '@angular/core';

import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(
    private appStore: AppStore
  ) {}

  toggleSource() {
    const useMockedData = !this.appStore.getValue().useMockedData;
    console.log('use mocked:' + useMockedData);
    this.appStore.update({ useMockedData });
  }

  setUpdateTime(lastUpdated: string) {
    this.appStore.update({ lastUpdated })
  }
}
