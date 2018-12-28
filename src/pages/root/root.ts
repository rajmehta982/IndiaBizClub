import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from '../../shared/user';
import {FirebaseProvider} from 'angular-firebase'
/**
 * Generated class for the RootPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-root',
  templateUrl: 'root.html',
})
export class RootPage {

  user = {} as User;

  constructor(private fb: FirebaseProvider,public navCtrl: NavController, public navParams: NavParams) {
  }

  login(){
    this.fb.signinMail(this.user.email,this.user.password).then((value) => {
      console.log(value);
       //return any validation message like 'the email or password not correct'
    });

    
  }

  register(){
    this.navCtrl.push('RegisterPage');
  }

}
