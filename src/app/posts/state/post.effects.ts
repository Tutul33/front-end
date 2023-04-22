import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { PostService } from "src/app/services/post.service";
import { AppState } from "src/app/store/app.state";
import { addPost, addPostSuccess, deletePost, deletePostSucess, loadPosts, loadPostsSuccess, updatePost, updatePostSuccess } from "./post.actions";
import { map, mergeMap, of, switchMap } from "rxjs";
@Injectable()
export class PostsEffects {
    constructor(private action$: Actions, private postService: PostService, private store: Store<AppState>) {

    }
    loadPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(loadPosts),
            mergeMap((action) => {
                return this.postService.getPosts().pipe(map((posts) => {
                    return loadPostsSuccess({ posts })
                }));
            })
        );
    });
    addPost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(addPost),
            mergeMap((action) => {
                return this.postService.addPost(action.post).pipe(map((data) => {
                    const post={...action.post,id:data.name}
                    return addPostSuccess({post});
                }))
            })
        );
    });
    updatePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(updatePost),
            switchMap((action) => {
                return this.postService.updatePost(action.post).pipe(map((data) => {                    
                    return updatePostSuccess({post:action.post});
                }))
            })
        );
    });
    deletePost$ = createEffect(() => {
        return this.action$.pipe(
            ofType(deletePost),
            switchMap((action) => {
                return this.postService.deletePost(action.id).pipe(map((data) => {                    
                    return deletePostSucess({id:action.id});
                }))
            })
        );
    });
}