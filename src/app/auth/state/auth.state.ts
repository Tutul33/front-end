import { changePass } from "src/app/models/changePass.model";
import { User, UserModel } from "src/app/models/user.model";

export interface AuthState {
    //user: User | null;
    user: UserModel | null;
    isToggle: boolean;
    isSent: boolean;
    userPass: changePass | null;
}
export const initialState: AuthState = {
    user: null,
    isToggle: false,
    isSent: false,
    userPass: null
}