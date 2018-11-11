import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReqObj } from '../models/request_object';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn = false;

    constructor(private httpClient: HttpClient, private router: Router) { }

    login(login: string, password: string) {
        return this.httpClient.post<ReqObj>('http://localhost:3000/login', { login, password })
            .subscribe(data => {
                if (data.user && data.token) {
                    console.log(data);
                    const user = data.user;
                    this.saveToken(data.token);
                    localStorage.setItem('currentUser', user);
                    this.isLoggedIn = true;
                    this.router.navigate(['/admin']);
                }
            });
    }

    saveToken(token: string) {
        window.localStorage['jwtToken'] = token;
    }

    deleteToken() {
        window.localStorage.removeItem('jwtToken');
        this.isLoggedIn = false;
        this.router.navigate(['/main']);
        console.log('deleteToken work!!!');
    }
}
