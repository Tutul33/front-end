import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loginStart, loginSuccess } from './auth.actions';
import { exhaustMap, map } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
@Injectable()
export class AuthEffects {
    constructor(private action$: Actions, private authServie: AuthService) {

    }
    login$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loginStart),
            exhaustMap((action) => {
                return this.authServie.login(action.email, action.password).pipe(
                    map((data) => {
                        const user=this.authServie.formatUser(data);
                    return loginSuccess({user});
                }))
            }))
    })
    
}