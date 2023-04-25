import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { UserManagementComponent } from "./user-management/user-management.component";
import { EffectsModule } from "@ngrx/effects";
import { UsersEffects } from "./state/users.effects";
import { StoreModule } from "@ngrx/store";
import { USER_STATE_NAME } from "./state/users.selector";
import { userReducer } from "./state/users.reducer";

import { MatSlideToggleModule } from '@angular/material/slide-toggle';
const routes:Routes=[
    {
    path:'',
    component:UserManagementComponent,    
    }
];
@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        EffectsModule.forFeature([UsersEffects]),
        StoreModule.forFeature(USER_STATE_NAME,userReducer),

        //
        MatSlideToggleModule
    ],
    declarations:[
        UserManagementComponent
    ]
})
export class UserModule{
}