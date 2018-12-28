import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { FirebaseModule, FirebaseProvider } from 'angular-firebase';
import { HttpClientModule } from '@angular/common/http';
import { baseURL } from '../shared/baseurl';


import { MyApp } from './app.component';

import { RootPage } from '../pages/root/root';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BusinessProvider } from '../providers/business/business';
import { ProcessHttpmsgProvider } from '../providers/process-httpmsg/process-httpmsg';


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    RootPage,
    
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    FirebaseModule,
    HttpClientModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    RootPage,
    
   
  ],
  providers: [
    StatusBar,
    FirebaseProvider,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BusinessProvider,
    ProcessHttpmsgProvider,
    { provide: 'BaseURL' , useValue: baseURL}
  ]
})
export class AppModule {}
