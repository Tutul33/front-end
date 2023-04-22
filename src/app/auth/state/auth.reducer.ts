import { createReducer,on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { autoLogOut, loginSuccess, signupStart, signupSuccess } from "./auth.actions";

const _authReducer=createReducer(
    initialState,
    on(loginSuccess,(state,action)=>{
    return{
        ...state,
        user:action.user
    }
   }),
   on(signupSuccess,(state,action)=>{
    return{
        ...state,
        user:action.user
    }
   })
   ,
   on(autoLogOut,(state)=>{
    return{
        ...state,
        user:null
    }
   })
);

export function AuthReducer(state:any,action:any){
return _authReducer(state,action);
}