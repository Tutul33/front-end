import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from './store/app.state';
import {Store} from '@ngrx/store';
import { getErrorMessage, getLoading } from './store/Shared/shared.selector';
import { autoLogin } from './auth/state/auth.actions';
import { isAuthenticated } from './auth/state/auth.selector';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'front-end';
  showLoading?:Observable<boolean>;
  errorMessage?:Observable<String>;
  IsAuthenticated?: Observable<boolean>;
  isAuth:boolean=false;
  constructor(private store:Store<AppState>){

  }
  ngOnInit(): void {
    debugger
    this.IsAuthenticated=this.store.select(isAuthenticated);
    this.showLoading=this.store.select(getLoading);
    this.errorMessage=this.store.select(getErrorMessage);
    this.store.dispatch(autoLogin());
  }
    
}
