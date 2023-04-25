import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { IUserModel } from "src/app/models/user.model";
export interface UsersState extends EntityState<IUserModel>{
}
export const userAdapter=createEntityAdapter<IUserModel>();
export const initialState: UsersState = userAdapter.getInitialState();