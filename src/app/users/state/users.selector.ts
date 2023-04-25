import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UsersState, userAdapter } from "./users.state";

export const USER_STATE_NAME = 'users';
const getPostState = createFeatureSelector<UsersState>(USER_STATE_NAME);
export const userSelectors=userAdapter.getSelectors();

export const getUsers = createSelector(getPostState, userSelectors.selectAll);
export const getUserEntities = createSelector(getPostState, userSelectors.selectEntities);

export const getUserById =(id:number)=>(
  createSelector(
    getUserEntities,
    (users) => {
      return users ? users[id] : null;
    }
  ));
  export const getUserAll =(
    createSelector(
      getUserEntities,
      (users) => {
        return users;
      }
    ));