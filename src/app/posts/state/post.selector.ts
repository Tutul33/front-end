import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./postState";

const getPostState=createFeatureSelector<PostsState>('post');

export const getPosts=createSelector(getPostState,(state)=>{
    return state.posts;
});
// export const addPosts=createSelector(getPostState,(state)=>{
//     return state.posts;
// });
// export const updatePosts=createSelector(getPostState,(state)=>{
//     return state.posts;
// });
// export const deletePosts=createSelector(getPostState,(state)=>{
//     return state.posts;
// });
export const getPostById=createSelector(getPostState,(state:any,props:any)=>{
    return state.posts.find((post:any)=>post.id==props.id);
});
