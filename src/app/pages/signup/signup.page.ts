import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  form: FormGroup|any;
  signupForm:FormGroup|any;
  isLoading: boolean=false;
  constructor(
    private router : Router,
    private authService:AuthService,
    private alertController:AlertController
  ) {
    this.initForm();
   }

  ngOnInit() {
  }
  initForm() {
    this.form = new FormGroup({
      name: new FormControl(null, {validators: [Validators.required]}),
      email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
      password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
    });
  }

  onSubmit() {
    if(!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }
    console.log(this.form.value);
  }
  register(form:any){
    // this.global.showLoader();
    this.isLoading=true;
    console.log(form.value);
    this.authService.register(form.value).then((data)=>{
      console.log(data);
      this.router.navigateByUrl('/login');
      this.isLoading=false;
      //this.global.hideLoader();
      form.reset();
    })
    .catch((e:any)=>{
      console.log(e);
      this.isLoading=false;
      // this.global.hideLoader();
      let msg:string='could not sign you up,please try again.';
      if(e.code=='auth/email-already-in-use'){
        msg=e.message;
      }
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
