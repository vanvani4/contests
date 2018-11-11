import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../guard/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [AuthService]
})
export class LoginComponent implements OnInit {

  user: User = new User( 0, '', '');
  loginForm: FormGroup;

  formErrors = {
    login: '',
    password: ''
  };

  validationMessages = {
    login: {
      required: 'Field login can not be empty'
    },
    password: {
      required: 'Field password can not be empty',
      minlength: 'Password must be at least 6 characters long'
    }
  };


  constructor(private authService: AuthService,
    private router: Router,
    private fb: FormBuilder) { }

  message: string;

  ngOnInit() {
    this.loginForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.loginForm.valueChanges.subscribe(data => this.valueChanged(data));
  }

  valueChanged(data) {
    for (const field of Object.keys(this.formErrors)) {
      this.formErrors[field] = '';
      const control = this.loginForm.get(field);
      if (control.dirty) {
        for (const key in control.errors) {
          if (this.formErrors.hasOwnProperty(field)) {
            this.formErrors[field] = this.validationMessages[field][key];
          }
        }
      }
    }
  }

  log() {
    this.authService.login(this.loginForm.value.login, this.loginForm.value.password);
  }
}


