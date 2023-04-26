import { Component,Inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Store } from "@ngrx/store";
import { IUserModel } from "src/app/models/user.model";
import { setLoadingSpinner } from "src/app/store/Shared/shared.action";
import { AppState } from "src/app/store/app.state";
import { addUser } from "../../state/users.action";

@Component({
    selector: 'user-dialog',
    templateUrl: 'userDialog.html',
    styleUrls: ['../user-management.component.css']
  })
  export class UserDialogComponent implements OnInit {
    userFrom?:FormGroup|any;
    title:string="";
    constructor(
      public dialogRef: MatDialogRef<UserDialogComponent>,
      @Inject(MAT_DIALOG_DATA) public data: IUserModel,
      private store:Store<AppState>
    ) {}
    ngOnInit(): void {
        this.createForm();
      if (this.data.customerId) {
        this.title='Edit';
      }else{
        this.title='Add';
      }
    }
  
    onNoClick(): void {
      this.dialogRef.close();
    }
    createForm(){
        this.userFrom=new FormGroup({
          firstName:new FormControl(null,Validators.required),
          lastName:new FormControl(null,Validators.required),
          phone:new FormControl(''),
          email:new FormControl('',[Validators.required,Validators.email]),
          password:new FormControl('',[Validators.required])
        });
      }
      onSignUpSubmit(){
        if (!this.userFrom?.valid) {
          return;
        }
        const user:IUserModel={
          password: this.userFrom.value.password,
          firstName: this.userFrom.value.firstName,
          lastName: this.userFrom.value.lastName,
          email: this.userFrom.value.email,
          phone: this.userFrom.value.phone
        }
        this.store.dispatch(setLoadingSpinner({status:true}));
        this.store.dispatch(addUser({user:user }));
        //this.dialogRef.close();
      }
      showEmailValidtionError(){
        const emailForm=this.userFrom.get('email');
        if (emailForm.touched && !emailForm.valid) {
          if (emailForm.errors.required)
           {
            return 'Email is required.';
          }
          if (emailForm.errors.email)
           {
            return 'Invalid Email.';
          }
          
        }
        return '';
      }
      showPasswordValidtionError(){
        const passordForm=this.userFrom.get('password');
        if (passordForm.touched && !passordForm.valid) {
          if (passordForm.errors.required)
           {
            return 'Password is required.';
          }
         
        }
        return '';
      }
      showFirstNameValidtionError(){
        const firstNameForm=this.userFrom.get('firstName');
        if (firstNameForm.touched && !firstNameForm.valid) {
          if (firstNameForm.errors.required)
           {
            return 'First Name is required.';
          }     
        }
        return '';
      }
      showLastNameValidtionError(){
        const lastNameForm=this.userFrom.get('lastName');
        if (lastNameForm.touched && !lastNameForm.valid) {
          if (lastNameForm.errors.required)
           {
            return 'Last Name is required.';
          }     
        }
        return '';
      }
  }