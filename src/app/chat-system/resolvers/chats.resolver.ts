import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {filter, finalize, first, tap} from 'rxjs/operators';
import { areMessagesLoaded } from '../selectors/chat.selectors';
import { loadMessages } from '../actions/chat.ations';
import { ChatState } from '../reducers';

@Injectable()
export class ChatResolver implements Resolve<any> {

    loading = false;

    constructor(private store: Store<ChatState>) {

    }
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {

        return this.store
            .pipe(
                select(areMessagesLoaded),
                tap(messagesLoaded => {
                    if (!this.loading && !messagesLoaded) {
                        this.loading = true;
                        this.store.dispatch(loadMessages());
                    }
                }),
                filter(messagesLoaded => messagesLoaded),
                first(),
                finalize(() => this.loading = false)
            );

    }

}
