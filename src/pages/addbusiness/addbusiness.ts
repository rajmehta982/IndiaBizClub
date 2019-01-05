import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ElasticsearchProvider } from '../../providers/elasticsearch/elasticsearch';
import { identifierModuleUrl } from '@angular/compiler';

/**
 * Generated class for the AddbusinessPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addbusiness',
  templateUrl: 'addbusiness.html',
})
export class AddbusinessPage implements OnInit{

  isConnected = false;
 
  form: FormGroup;
  status: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, private es: ElasticsearchProvider, private cd: ChangeDetectorRef) {
    this.isConnected = false;
 
    this.form = new FormGroup({
      index: new FormControl('business', Validators.required),
      name: new FormControl('', Validators.required),
      overview: new FormControl('', Validators.required),
      industry: new FormControl('', Validators.required),
      estYear: new FormControl('', Validators.required),
      firmType: new FormControl('', Validators.required),
      expLevel: new FormControl('', Validators.required),
      noOfEmployees: new FormControl('', Validators.required),
      nature: new FormControl('', Validators.required),
      products: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required)
    });

  }

  
  

  ngOnInit() {
    this.es.isAvailable().then(() => {
      this.status = 'OK';
      this.isConnected = true;
    }, error => {
      this.status = 'ERROR';
      this.isConnected = false;
      console.error('Server is down', error);
    }).then(() => {
      this.cd.detectChanges();
    });
  }

  
  onSubmit(value) {
    this.es.addToIndex({
      index: 'business',
      type: '_doc',
      id: value.id,
      
      body: {
        profile : {

          name: value.name,
          overview : value.overview ,
          industry : value.industry ,
          estYear : value.estYear,
          firmType : value.firmType,
          expLevel : value.expLevel,
          noOfEmployees : value.noOfEmployees,
          nature : value.nature
      },
  
      products : value.products
    
  
      }
    }).then((result) => {
      console.log(result);
      alert('Document added, see log for more info');
    }, error => {
      alert('Something went wrong, see log for more info');
      console.error(error);
    });
  }

}
