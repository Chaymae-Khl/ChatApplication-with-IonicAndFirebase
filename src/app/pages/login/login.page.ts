import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
form:any;
isTypePassword:boolean=true;
isLogin=false;
  constructor( private router : Router,
    private authService:AuthService,
    private alertController:AlertController
    ) { 
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
login(form:any){
//this.global.showLoader();
this.authService.login(form.value.email,form.value.password).then(data=>{
  console.log(data);
  this.router.navigateByUrl('/home');
  //this.global.hideLoader();
  form.reset();
})
.catch((e:any)=>{
  console.log(e);
  let msg:string='could not sign you in, please try again.';
  if(e.code=='auth/user-not-found') msg='E-mail address could not be found';
  else if(e.code='auth/wrong-password') msg='Please enter a correct password';
  this.showAlert(msg);
});
}
async showAlert(msg:any){
  const alert=await this.alertController.create(
    {
      header:'Alert',
      subHeader:'Important message',
      message:msg,
      buttons:['OK'],
    }
  );
  await alert.present();
}
}