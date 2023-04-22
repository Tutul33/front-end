import { SharedReducer } from "./Shared/shared.reducer";
import { SHARED_STATE_NAME } from "./Shared/shared.selector";
import { SharedState } from "./Shared/shared.state";

//Global App State
export interface AppState{
    [SHARED_STATE_NAME]:SharedState
}
//Global Reducer
export const appReducer={
    [SHARED_STATE_NAME]:SharedReducer
}