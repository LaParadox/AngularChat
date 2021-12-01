import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { RoomState } from '../reducers/index2';
import { areRoomsLoaded } from '../selectors/room.selectors';
import { loadAllChats } from '../actions/chat.ations';

@Injectable()
export class RoomsResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<RoomState>) {

    }
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areRoomsLoaded),
                tap(roomsLoaded => {
                    if (!this.loading && !roomsLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadAllChats());
                    }
                }),
                filter(roomsLoaded => roomsLoaded),
                first(),
                finalize(() => this.loading = false)
            );

    }

}
