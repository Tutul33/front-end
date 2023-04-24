import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.css']
})
export class ForgotpasswordComponent implements OnInit{
  email?:string;
  constructor(){

  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  sendEmail(){

  }
}
