import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';

import { AppState, AppStore } from './app.store';


@Injectable({ providedIn: 'root' })
export class AppQuery extends Query<AppState> {
    useMockedData$   = this.select( state => state.useMockedData );
    lastUpdated$     = this.select( state => state.lastUpdated );

    constructor(protected store: AppStore) {
        super(store);
    }
}