import { Injectable } from '@angular/core';

import { AppStore } from './app.store';

@Injectable({ providedIn: 'root' })
export class AppService {

  constructor(
    private appStore: AppStore
  ) {}

  toggleSource(): void {
    const useMockedData = !this.appStore.getValue().useMockedData;
    this.appStore.update({ useMockedData });
  }

  setUpdateTime(lastUpdated: string): void {
    this.appStore.update({ lastUpdated })
  }

  setGotDataFromYF(gotDataFromYF: boolean): void {
    this.appStore.update({ gotDataFromYF });
  }
}
