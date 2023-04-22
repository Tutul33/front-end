import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { catchError, exhaustMap, map,of } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/Shared/shared.action';
@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authServie: AuthService, private store: Store<AppState>) {

    }
    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authServie.login(action.email, action.password).pipe(
                    map((data) => {                        
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        this.store.dispatch(setErrorMessage({ message: '' }))
                        const user = this.authServie.formatUser(data);
                        return loginSuccess({ user });
                    }),
                    catchError((errorRes)=>{          
                        this.store.dispatch(setLoadingSpinner({ status: false }))              
                        const errorMessage=this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({message:errorMessage}));
                    })
                    )
            }))
    })

}