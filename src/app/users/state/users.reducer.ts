import { createReducer, on } from "@ngrx/store";
import { initialState, userAdapter } from "./users.state";
import { addUser, addUserSuccess, deleteUserSuccess, loadUsersSuccess, updateUserSuccess } from "./users.action";

const _usersReducer = createReducer(initialState,
    on(addUserSuccess,(state,action)=>{
        return userAdapter.addOne(action.user,state);
    }),
    on(updateUserSuccess, (state, action) => {
        return userAdapter.updateOne(action.user,state);
    }),
    on(deleteUserSuccess, (state, { id }) => {
        return userAdapter.removeOne(id,state);
    }),
    on(loadUsersSuccess, (state, action) => {
        return userAdapter.setAll(action.users,state);
    })
    );
export function userReducer(state: any, action: any) {
    return _usersReducer(state, action);
}