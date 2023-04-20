import { counterReducer } from "../counter/state/counter.reducer";
import { CounterState } from "../counter/state/counterState";
import { postReducer } from "../posts/state/post.reducer";
import { PostsState } from "../posts/state/postState";

export interface AppState{
    counter:CounterState,
    posts:PostsState
}
export const appReducer={
    counter:counterReducer,
    post:postReducer
}