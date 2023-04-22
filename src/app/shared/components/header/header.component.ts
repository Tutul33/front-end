import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/store/app.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from 'src/app/auth/state/auth.selector';
import { autoLogOut } from 'src/app/auth/state/auth.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  IsAuthenticated?: Observable<boolean>;
  constructor(private store: Store<AppState>) {

  }
  ngOnInit(): void {
       this.IsAuthenticated=this.store.select(isAuthenticated);
  }
  onLogOut(event:Event){
    event.preventDefault();
    this.store.dispatch(autoLogOut());
  }
}
