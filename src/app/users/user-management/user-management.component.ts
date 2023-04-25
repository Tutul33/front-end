import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { setLoadingSpinner } from 'src/app/store/Shared/shared.action';
import { AppState } from 'src/app/store/app.state';
import { addUser, loadUsers } from '../state/users.action';
import { IUserModel, UserModel } from 'src/app/models/user.model';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserDialogComponent } from './add-edit-user/userDialogComponent';
import { Observable } from 'rxjs';
import { getUserAll, getUserEntities, getUsers } from '../state/users.selector';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit{
  userList$!: Observable<IUserModel[]>;
  constructor(private store:Store<AppState>,private dialog:MatDialog){

  }
  ngOnInit(): void {
    debugger
    this.store.dispatch(loadUsers());
   this.loadUser();
  }
  loadUser(){
    //this.userList$=this.store.select(getUserEntities)
  }
  openDialog(exitAnimationDuration:string,enterAnimationDuration:string): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {},
      panelClass: 'user-dialog',
      exitAnimationDuration,
      enterAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
      this.store.dispatch(loadUsers());
      this.loadUser();
    });
  }
 
}
