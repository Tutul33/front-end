import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counterState";
import { postReducer } from "../posts/state/post.reducer";
import { PostsState } from "../posts/state/postState";

//Global App State
export interface AppState{
    counter:CounterState,
    posts:PostsState
}
//Global Reducer
export const appReducer={
    counter:counterReducer,
    posts:postReducer
}