import { Injectable } from '@angular/core';
import { Contest } from '../../models/contest';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class MainService {

  constructor(private httpClient: HttpClient) { }

  getContests() {
    return this.httpClient.get<Contest[]>('http://localhost:3000/main');
  }

  getContestById(id: string) {
    return this.httpClient.put('http://localhost:3000/contest/id', {id});
  }
}
