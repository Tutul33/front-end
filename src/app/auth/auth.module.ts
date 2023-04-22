import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { RouterModule, Routes } from "@angular/router";
import { LoginComponent } from './login/login.component';
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';
const routes:Routes=[
    {
        path:'',
        children:[
            {
                path:'',redirectTo:'login',pathMatch:'full'
            },
            {
                path:'login',component:LoginComponent
            },
            {
                path:'signup',component:SignupComponent
            }
        ]
    }
];
@NgModule({
    declarations:[
    LoginComponent,
    SignupComponent
  ],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        //StoreModule.forFeature(AUTH_STATE_NAME,AuthReducer),
        EffectsModule.forFeature(),
    ]
})
export class AuthModule{

}