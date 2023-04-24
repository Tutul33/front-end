import { Actions, createEffect, ofType } from '@ngrx/effects';
import { autoLogOut, autoLogin, loginStart, loginSuccess, signupStart, signupSuccess } from './auth.actions';
import { Observable, catchError, exhaustMap, filter, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { setErrorMessage, setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { Router } from '@angular/router';
@Injectable()
export class AuthEffects {
    constructor(
        private action$: Actions,
        private authServie: AuthService,
        private store: Store<AppState>,
        private route: Router) {

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
                        this.authServie.setUserInLocalStorage(user);
                        return loginSuccess({ user ,redirect:true});
                    }),
                    catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            }))
    })
    loginRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(...[loginSuccess, signupSuccess]),
                tap((action) => {
                    this.store.dispatch(setErrorMessage({ message: '' }));
                    if (action.redirect) {
                        this.route.navigate(['/']);
                    }
                    
                })
            )
        }, {
        dispatch: false
    }
    );
    // signUpRedirect$=createEffect(
    //     ()=>{
    //     return this.action$.pipe(ofType(signupSuccess),
    //     tap((action)=>{
    //         this.store.dispatch(setErrorMessage({ message: '' }));
    //         this.route.navigate(['/']);
    //     })
    //     )
    // },{
    //     dispatch:false
    // }
    // );
    signUp$ = createEffect(() => {
        return this.action$.pipe(
            ofType(signupStart),
            exhaustMap((action) => {
                return this.authServie.signup(action.email, action.password).pipe(
                    map((data) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const user = this.authServie.formatUser(data);
                        return signupSuccess({ user,redirect:true });
                    }), catchError((errorRes) => {
                        this.store.dispatch(setLoadingSpinner({ status: false }))
                        const errorMessage = this.authServie.getErrorMessage(errorRes.error.error.message);
                        return of(setErrorMessage({ message: errorMessage }));
                    })
                )
            })
        );
    });
    autoLogin$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogin),
            mergeMap((action) => {
                const user = this.authServie.getUserFromLocalStorage();
                return of(loginSuccess({ user ,redirect:false}));
            })
        );
    }
    );
    logout$ = createEffect(() => {
        return this.action$.pipe(
            ofType(autoLogOut),
            map((action) => {
                this.authServie.logout();
                this.route.navigate(['auth']);
            }
            ));
    }, { dispatch: false });
   
}