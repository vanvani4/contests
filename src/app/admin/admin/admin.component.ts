import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../admin-service/admin-service.service';
import { AuthService } from '../../guard/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  createForm: FormGroup;
  image: File;

  @ViewChild('image') imageContest;

  formErrors = {
    name: '',
    description: ''

  };

  validationMessages = {
    name: {
      required: 'Field name can not be empty',
      minlength: 'Minimum 2 letters'
    },
    description: {
      required: 'Field description can not be empty'
    }
  };

  constructor(private adminService: AdminService, private fb: FormBuilder, private authService: AuthService) { }

  ngOnInit() {
    this.createForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      description: ['', Validators.required],
      image: ['']
    });

    this.createForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.createForm.get(field);
      if (control.dirty) {
        for (const key in control.errors) {
          if (this.formErrors.hasOwnProperty(field)) {
            this.formErrors[field] = this.validationMessages[field][key];
          }
        }
      }
    }
  }

  createContest(createForm: FormGroup) {
    const image = this.imageContest.nativeElement;
    if (image.files && image.files[0]) {
      this.image = image.files[0];
    }

    const formData: FormData = new FormData();
    formData.append('name', createForm.value.name);
    formData.append('description', createForm.value.description);
    formData.append('image', this.image, this.image.name);
    this.adminService.createNewContest(formData);
  }

  exit() {
    this.authService.deleteToken();
  }

}
