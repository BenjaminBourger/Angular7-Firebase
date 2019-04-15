import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PropertiesService } from 'src/app/service/properties.service';
import { Property } from '../../models/Property.model';
import * as $ from 'jquery';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-admin-properties',
  templateUrl: './admin-properties.component.html',
  styleUrls: ['./admin-properties.component.css']
})
export class AdminPropertiesComponent implements OnInit, OnDestroy {

  propertyForm: FormGroup;
  properties: Property[];
  propertiesSubscription: Subscription;
  // tslint:disable-next-line:no-inferrable-types
  editProperty: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  photoUploading: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  photoUrl: string;
  // tslint:disable-next-line:no-inferrable-types
  photoUploaded: boolean = false;
  lastUpdate = new Promise(
    // tslint:disable-next-line:no-shadowed-variable
    (resolve, reject) => {
       const dateNow = new Date();
       setTimeout(
         () => {
           resolve(dateNow);
         }, 500
       );
    }
  );

  constructor(private formbuilder: FormBuilder, private propertiesService: PropertiesService) { }

  ngOnInit() {
    this.initForm();
    this.propertiesSubscription = this.propertiesService.PropertiesSubject.subscribe(
      (properties: Property[]) => {
        this.properties = properties;
      }
    );
    this.propertiesService.getProperties();
    this.propertiesService.emitProperties();
  }

  initForm() {
    this.propertyForm = this.formbuilder.group({
      id: [''],
      title: ['', Validators.required],
      category: ['', Validators.required],
      surface: ['', Validators.required],
      rooms: ['', Validators.required],
      description: ['']
    });
  }

  resetPropertyForm() {
    this.editProperty = false;
    this.propertyForm.reset();
  }

  onSaveProperty() {
    const id = this.propertyForm.get('id').value;
    const title = this.propertyForm.get('title').value;
    const category = this.propertyForm.get('category').value;
    const surface = this.propertyForm.get('surface').value;
    const rooms = this.propertyForm.get('rooms').value;
    const description = this.propertyForm.get('description').value;
    const newProperty = new Property(title, category, surface, rooms, description);
    if (this.photoUrl && this.photoUrl !== '') {
      newProperty.photo = this.photoUrl;
    }

    if (this.editProperty === true) {
      this.propertiesService.updateProperty(newProperty, id);
    } else {
      this.propertiesService.createProperty(newProperty);
    }

    $('#propertiesFormModal').modal('hide');
    this.propertyForm.reset();
    this.editProperty = false;
    this.resetPropertyForm();
    this.photoUploaded = false;
    this.photoUrl = '';
  }

  onDeleteProperty(property: Property) {
    this.propertiesService.removeProperty(property);
    if (property.photo) {
      this.propertiesService.removePropertyPhoto(property.photo);
    }
  }

  onEditProperty(property: Property, id: number) {
    $('#propertiesFormModal').modal('show');
    this.propertyForm.get('id').setValue(id);
    this.propertyForm.get('title').setValue(property.title);
    this.propertyForm.get('category').setValue(property.category);
    this.propertyForm.get('surface').setValue(property.surface);
    this.propertyForm.get('rooms').setValue(property.rooms);
    this.propertyForm.get('description').setValue(property.description);
    this.editProperty = true;
  }

  detectFile(event) {
    this.photoUploading = true;
    this.propertiesService.uploadFile(event.target.files[0]).then(
      (url: string) => {
        this.photoUrl = url;
        this.photoUploading = false;
        this.photoUploaded = true;
      }
    );
  }

  ngOnDestroy() {
    this.propertiesSubscription.unsubscribe();
  }

}
