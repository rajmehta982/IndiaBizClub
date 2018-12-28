import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Business } from '../../shared/business';
import { BusinessProvider } from '../../providers/business/business';

/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  businesses : Business[];
  errMess : string;
  searchQuery: string = '';
  searchResult : boolean = true;
  businessCopy : Business[];

  constructor(private businessService : BusinessProvider, public navCtrl: NavController, public navParams: NavParams, @Inject('BaseURL') private BaseURL) {
    this.initializeItems();
  }

  initializeItems() {
    this.businessService.getBusinesses()
      .subscribe((businesses) => this.businesses = businesses,
      errmess => this.errMess = <any>errmess);
  }

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  getItems() {
    // Reset items back to all of the items
    // set val to the value of the searchbar
    this.businessCopy = null;
    // if the value is an empty string don't filter the items
    if (this.searchQuery && this.searchQuery.trim() != '') {
      this.businessCopy = this.businesses.filter((item) => {
        return (item.profile.name.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1);
      })
    }
   
    this.searchResult = false;
  }


}
