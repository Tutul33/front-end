import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostsState } from "./postState";
import { getCurrentRoute } from "src/app/router/router/selector";
import { RouterStateUrl } from "src/app/router/custom-seralizer";
export const POST_STATE_NAME = 'posts';
const getPostState = createFeatureSelector<PostsState>(POST_STATE_NAME);

export const getPosts = createSelector(getPostState, (state) => {
  return state.posts;
});
//deprecated
// export const getPostById=createSelector(
//     getPostState,
//     (state:any,props:any)=>
//     {
//     return state.posts.find((post:any)=>post.id==props.id);
//     }
// );

//new method to props
// export const getPostById = (props: any) => 
//   createSelector(
//     getPostState,
//     (state: any) => {
//         return state.posts.find((post:any)=>post.id==props.id);
//    }
// );

export const getPostById =
  createSelector(
    getPosts,
    getCurrentRoute,
    (posts, route: RouterStateUrl) => {
      return posts ? posts.find((post) => post.id == route.params['id']) : null;
    }
  );
