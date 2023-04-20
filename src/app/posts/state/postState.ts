import { Post } from "src/app/models/post.model";

export interface PostsState{
  posts:Post[];
}

export const initialState:PostsState={
posts:[
    {id:'1',title:'Sample title 1',description:'Sample description 1'},
    {id:'2',title:'Sample title 2',description:'Sample description 2'},
    {id:'3',title:'Sample title 3',description:'Sample description 3'},
    {id:'4',title:'Sample title 4',description:'Sample description 4'},
]
};