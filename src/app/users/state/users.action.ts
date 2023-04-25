import { Update } from "@ngrx/entity";
import { createAction, props } from "@ngrx/store";
import { IUserModel } from "src/app/models/user.model";

export const ADD_USER_ACTION = '[users page] add user';
export const ADD_USER_SUCCESS = '[users page] add user success';
export const UPDATE_USER_ACTION = '[users page] update user';
export const UPDATE_USER_SUCCESS = '[users page] update user success';
export const DELETE_USER_ACTION = '[users page] delete user';
export const DELETE_USER_SUCCESS = '[users page] delete user success';
export const LOAD_USERS = '[users page] LOAD users';
export const LOAD_USERS_SUCCESS = '[users page] load user success';

export const addUser=createAction(ADD_USER_ACTION,props<{user:IUserModel}>());
export const addUserSuccess=createAction(ADD_USER_SUCCESS,props<{user:IUserModel}>());

export const updateUser=createAction(UPDATE_USER_ACTION,props<{user:IUserModel}>())
export const updateUserSuccess=createAction(UPDATE_USER_SUCCESS,props<{user:Update<IUserModel>}>())

export const deleteUser=createAction(DELETE_USER_ACTION,props<{id:number}>())
export const deleteUserSuccess=createAction(DELETE_USER_SUCCESS,props<{id:number}>())

export const loadUsers=createAction(LOAD_USERS);
export const loadUsersSuccess=createAction(LOAD_USERS_SUCCESS,props<{users:IUserModel[]}>());