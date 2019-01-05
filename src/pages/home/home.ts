import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Business } from '../../shared/business';
import { ElasticsearchProvider } from '../../providers/elasticsearch/elasticsearch';

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

  businesses : any;
  errMess : string;
  searchQuery : string;
  fields : string[] = ['profile.name','profile.overview'];
  searchResult : any;
  businessViewToggle : boolean = true;
  FilterToggle: boolean = true;
  filterSearchResult : any;
  

  constructor(private businessService : ElasticsearchProvider, public navCtrl: NavController, public navParams: NavParams, @Inject('BaseURL') private BaseURL) {
    this.initializeItems();
  }

  initializeItems() {
    this.businessService.getAllDocuments('business','_doc')
      .then(response => {
        this.businesses = response.hits.hits;
        console.log(response);
      }, error => {
        console.error(error);
      }).then(() => {
        console.log('Show Business Completed!');
      });

  }

  searchBusinesses(){
    this.businessViewToggle = true;
    this.FilterToggle = true;

    this.businessService.fullTextSearch('business','_doc',this.fields,this.searchQuery)
    .then(response => {
      this.searchResult = response.hits.hits;
      console.log(response);
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Search Completed!');
    });
  }

  viewAllBusinesses(){
    this.businessViewToggle = false;
    this.FilterToggle= true;
  }

  filterByType(filterquery){
    this.FilterToggle = false;
    this.businessViewToggle = true;
    this.businessService.typeFilter('business','_doc',filterquery)
    .then(response => {
      this.filterSearchResult = response.hits.hits;
      console.log(response);
    }, error => {
      console.error(error);
    }).then(() => {
      console.log('Filter Completed!');
    });
  }
  

  

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  


}
