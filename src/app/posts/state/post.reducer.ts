import { createReducer, on } from "@ngrx/store";
import { initialState } from "./postState";
import {addPost,updatePost,deletePost} from './post.actions';
//import { updatePosts } from "./post.selector";
const _postReducer=createReducer(initialState,
    on(addPost,(state,action)=>{
        let post={...action.post};
        post.id=((state.posts.length)+1).toString();
        return{
            ...state,
            posts:[...state.posts,post]
        }
    }),
    on(updatePost,(state,action)=>{
        const updatedPosts=state.posts.map((post)=>{
            return action.post.id===post.id?action.post:post;
        });
        return{
            ...state,
            posts:updatedPosts
        }
    }),
    on(deletePost,(state,action)=>{
        return{
            ...state,
            posts:state.posts
        }
    })
    );

export function postReducer(state:any,action:any){
return _postReducer(state,action);
}