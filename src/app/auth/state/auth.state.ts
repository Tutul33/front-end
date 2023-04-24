import { User } from "src/app/models/user.model";

export interface AuthState {
    user: User | null;
    isToggle:boolean;
    isSent:boolean;
}
export const initialState: AuthState = {
    user: null,
    isToggle:false,
    isSent:false
}