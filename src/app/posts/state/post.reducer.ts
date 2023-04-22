import { createReducer, on } from "@ngrx/store";
import { initialState } from "./postState";
import { updatePost, deletePost, loadPostsSuccess, addPostSuccess, updatePostSuccess, deletePostSucess } from './post.actions';
//import { updatePosts } from "./post.selector";
const _postReducer = createReducer(initialState,
    on(addPostSuccess, (state, action) => {
        let post = { ...action.post };
        return {
            ...state,
            posts: [...state.posts, post]
        }
    }),
    on(updatePostSuccess, (state, action) => {
        const updatedPosts = state.posts.map((post) => {
            return action.post.id === post.id ? action.post : post;
        });
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(deletePostSucess, (state, { id }) => {
        const updatedPosts = state.posts.filter(post => {
            return post.id != id;
        });
        return {
            ...state,
            posts: updatedPosts
        }
    }),
    on(loadPostsSuccess, (state, action) => {
        return {
            ...state,
            posts: action.posts
        }
    })
);

export function postReducer(state: any, action: any) {
    return _postReducer(state, action);
}