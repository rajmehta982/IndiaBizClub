import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from 'elasticsearch';
import * as elasticsearch from 'elasticsearch';
import { Observable, of } from 'rxjs';
import {  catchError} from 'rxjs/operators';
import { ProcessHttpmsgProvider} from '../process-httpmsg/process-httpmsg';

/*
  Generated class for the ElasticsearchProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ElasticsearchProvider {

  private client : Client;

  constructor(public http: HttpClient, private processHTTPMsgService: ProcessHttpmsgProvider) {
    if (!this.client) {
      this._connect();
    }
  }

  private connect() {
    this.client = new Client({
      host: 'http://localhost:9200',
      log: 'trace'
    });
  }
 
  private _connect() {
    this.client = new elasticsearch.Client({
      host: 'localhost:9200',
      log: 'trace'
    });
  }
 
  isAvailable(): any {
    return this.client.ping({
      requestTimeout: Infinity,
      body: 'hello grokonez!'
    });
  }

  addToIndex(value): any {
    return this.client.create(value);
  }

  private queryalldocs = {
    'query': {
      'match_all': {}
    }
  };
 
  getAllDocuments(_index, _type): any {
    return this.client.search({
      index: _index,
      type: _type,
      body: this.queryalldocs,
      filterPath: ['hits.hits._source']
    });
  }

  fullTextSearch(_index, _type, _field, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query': {
          'multi_match': {
            'query': _queryText,
            'fields': _field
          }
        }
      }
    
    });
  }




  typeFilter(_index, _type, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query' : {
            'bool':  {
                'should':{
                    'match' : {
                       'profile.firmType' : _queryText 
                              } 
                         }
                      }
                  }
            }
    
    });

  }

  industryFilter(_index, _type, _queryText): any {
    return this.client.search({
      index: _index,
      type: _type,
      filterPath: ['hits.hits._source', 'hits.total', '_scroll_id'],
      body: {
        'query' : {
            'bool':  {
                'should':{
                    'match' : {
                       'profile.industry' : _queryText 
                              } 
                         }
                      }
                  }
            }
    
    });

  }


}


