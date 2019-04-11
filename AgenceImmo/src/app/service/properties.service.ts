import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Property } from '../models/Property.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {

  properties: Property[] = [];
  PropertiesSubject = new Subject<Property[]>();

  constructor() { }

  emitProperties() {
    this.PropertiesSubject.next(this.properties);
  }

  saveProperties() {
    firebase.database().ref('/properties').set(this.properties);
  }

  createProperty(newProperty: Property) {
    this.properties.push(newProperty);
    this.saveProperties();
    this.emitProperties();
  }

  removeProperty(property: Property) {

  }
}