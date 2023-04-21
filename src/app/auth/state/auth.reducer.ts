import { createReducer,on } from "@ngrx/store";
import { initialState } from "./auth.state";
import { loginStart } from "./auth.actions";

const _authReducer=createReducer(initialState,on(loginStart,(state,action)=>{
    return{
        ...state,
        //login:state.
    }
}));

export function AuthReducer(state:any,action:any){
return _authReducer(state,action);
}