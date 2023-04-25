import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { UserService } from "src/app/services/user.service";
import { AppState } from "src/app/store/app.state";
import { 
    addUser,addUserSuccess,
    updateUser,updateUserSuccess,
    deleteUser,deleteUserSuccess,
    loadUsers,loadUsersSuccess
 } from "./users.action";
import { filter, map, mergeMap, of, switchMap, tap } from "rxjs";
import { Router } from "@angular/router";
import { ROUTER_NAVIGATION, RouterNavigatedAction } from "@ngrx/router-store";
import { Update } from "@ngrx/entity";
import { IUserModel, UserModel } from "src/app/models/user.model";
@Injectable()
export class UsersEffects {
    constructor(
        private action$: Actions,
        private userService: UserService,
        private store: Store<AppState>,
        private route: Router) {

    }
    loadPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadUsers),
            mergeMap((action) => {
                return this.userService.getUsers().pipe(map((users) => {
                    return loadUsersSuccess({ users })
                }));
            })
        );
    });
    addPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addUser),
            mergeMap((action) => {
                return this.userService.addUser(action.user).pipe(map((data) => {
                    const user = { ...action.user, id: data.name }
                    return addUserSuccess({ user });
                }))
            })
        );
    });
    updatePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updateUser),
            switchMap((action) => {
                return this.userService.updateUser(action.user).pipe(map((data) => {
                    const updatedUser:Update<IUserModel>={
                        id:action.user.customerId,
                        changes:{
                            ...action.user
                        }
                    }
                    return updateUserSuccess({ user: updatedUser });
                }))
            })
        );
    });
    deletePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deleteUser),
            switchMap((action) => {
                return this.userService.deleteUser(action.id).pipe(map((data) => {
                    return deleteUserSuccess({ id: action.id });
                }))
            })
        );
    });
    updateSuccessRedirect$ = createEffect(
        () => {
            return this.action$.pipe(ofType(updateUserSuccess),
                tap((action) => {
                    this.route.navigate(['users']);
                })
            )
        }, {
        dispatch: false
    }
    );
    getSinglePost = createEffect(() => {
        return this.action$.pipe(
            ofType(ROUTER_NAVIGATION),
            filter((r: RouterNavigatedAction) => {
                return r.payload.routerState.url.startsWith('/posts/details');
            }),
            map((r: RouterNavigatedAction) => {
                let routeNav:any;
                routeNav=r;
                debugger;
                return routeNav.payload.routerState.params.id;
            }),
            switchMap((id)=>{
                debugger
                return this.userService.getUserById(id).pipe(map((user)=>{
                    const userData=[{...user,id}];
                    return loadUsersSuccess({users:userData});
                }));
            })
        );
    });
}