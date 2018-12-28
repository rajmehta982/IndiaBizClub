import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';



import { RootPage } from '../pages/root/root';
import { HomePage } from '../pages/home/home';


import * as firebase from 'firebase';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor( public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    const config = {
      apiKey: "AIzaSyCDPEawYugYdSsb_bHEyr2If-HULKoIufM",
    authDomain: "login-e34ac.firebaseapp.com",
    databaseURL: "https://login-e34ac.firebaseio.com",
    projectId: "login-e34ac",
    storageBucket: "login-e34ac.appspot.com",
    messagingSenderId: "858644650510"
    };

    firebase.initializeApp(config);

    // used for an example of ngFor and navigation
    this.pages = [
      
      { title: 'Login', component: RootPage },
      { title: 'Home', component: HomePage}
    ];

  }


  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
