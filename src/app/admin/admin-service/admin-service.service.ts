import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private httpClient: HttpClient) { }

  createNewContest(formData) {
    // const token = localStorage.getItem('jwtToken');
    this.httpClient.put('http://localhost:3000/admin', formData)
      .subscribe(data => {
        data = data;
      });
  }
}
