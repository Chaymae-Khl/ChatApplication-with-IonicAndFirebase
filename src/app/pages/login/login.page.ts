import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
form:any;
isTypePassword:boolean=true;
isLogin=false;
  constructor() { 
    this.initForm();
  }

  ngOnInit(): void{}
initForm(){
  this.form=new FormGroup({
    email:new FormControl('',
    {validators:[Validators.required, Validators.email]}
    ),
    password:new FormControl('', { validators:[Validators.required, Validators.minLength(8)]}),
    
  });
}
onSubmit(){
  if(!this.form.valid) return;
  console.log(this.form.value);
  // this.login(this.form);
}
onChange(){
  this.isTypePassword=!this.isTypePassword;
}
}
