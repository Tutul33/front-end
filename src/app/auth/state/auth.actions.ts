import { createAction, props } from "@ngrx/store";
import { Login } from "../../models/login.model";
export const LOGIN_START='[Login page] login start';
export const LOGIN_SUCCESS='[Login page] login success';
export const LOGIN_FAIL='[Login page] login fail';
export const loginStart=createAction(LOGIN_START,props<{email:string,password:string}>());
export const loginSuccess=createAction(LOGIN_SUCCESS);