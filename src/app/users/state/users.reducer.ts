import { createReducer, on } from "@ngrx/store";
//import { initialState, userAdapter } from "./users.state";
import { initialState } from "./users.state";
import { addUser, addUserSuccess, deleteUserSuccess, loadUsersSuccess, updateUserSuccess } from "./users.action";

const _usersReducer = createReducer(initialState,
    on(addUserSuccess,(state,action)=>{
        let post = { ...action.user };
        return {
            ...state,
            posts: [...state.users, post]
        }
        //return userAdapter.addOne(action.user,state);
    }),
    on(updateUserSuccess, (state, action) => {  
        const updatedPosts = state.users.map((user) => {
            return action.user.customerId === user.customerId ? action.user : user;
        });
        return {
            ...state,
            posts: updatedPosts
        }
        // return userAdapter.updateOne(
        //     action.user,
        //     state
        //     );
    }),
    on(deleteUserSuccess, (state, { id }) => {
        const updatedPosts = state.users.filter(user => {
            return user.customerId != id;
        });
        return {
            ...state,
            posts: updatedPosts
        }
        //return userAdapter.removeOne(id,state);
    }),
    on(loadUsersSuccess, (state, action) => {        
        return {
            ...state,
            users: action.users
        }
        //return userAdapter.setAll(action.users,state);
    })
    );
export function userReducer(state: any, action: any) {
    return _usersReducer(state, action);
}