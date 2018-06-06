import RESOURCES from './../mocks/mock.data';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import uuid from 'uuid/v1';

@Injectable()
export default class StorageService {
  // this service manages data in the storage before a REST API is used

  constructor(private storage: Storage) {}

  get(resource: string, id?: string): Promise<any> {

    let promise$;

    if (id) {
      promise$ = new Promise((resolve, reject) => {
        this.storage.get(resource).then(data => {

          if (data) {
            // finds object in resource table
            let obj = data.find(it => it.id == id);

            if (obj) {
              resolve(obj);
            } else {
              reject("Not found");
            }
          }
        })
      })
    } else {
      promise$ = this.storage.get(resource);
    }

    return promise$;
  }

  post(resource: string, data: any): Promise<any> {
    // stores the resource and adds metadata

    return new Promise((resolve, reject) => {
      this.storage.get(resource).then(previousData => {

        let newData = previousData.concat([{
          // generate uuid for the resource
          id: uuid(),
          ...data
        }])

        this.storage.set(resource, newData).then(() => resolve());
      })
    })
  }

  resetStorageResources(): Promise<any> {
    // resets resource tables

    let promises = [];

    // store each promise for each storage set
    for (let key in RESOURCES) {
      promises.push(this.storage.set(key, RESOURCES[key]));
    }

    promises.push(this.storage.set('isDBInitialized', true));

    return Promise.all(promises);
  }
} 