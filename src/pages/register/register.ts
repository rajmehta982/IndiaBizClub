import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FirebaseProvider } from 'angular-firebase';
import { User } from '../../shared/user';

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {

  successMessage: string;
  errorMessage : string;
  user = {} as User;
  constructor(private fb: FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  Register(){

    this.successMessage = "";
    this.errorMessage = "";
    this.fb.signupMail(this.user.email,this.user.password).then((value) => {
      console.log(value);
      if(typeof value === "string" )
      {
        this.errorMessage = value;
      }

      else{
        this.successMessage = " You have successfully registered " ;
      }
       //return any validation message like 'the email or password not correct'
    });
  }

    
    
  }


