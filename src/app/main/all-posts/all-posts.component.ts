import { Component, OnInit } from '@angular/core';
import { MainService } from '../main-service/main.service';
import { Contest } from '../../models/contest';

@Component({
  selector: 'app-all-posts',
  templateUrl: './all-posts.component.html',
  styleUrls: ['./all-posts.component.css']
})
export class AllPostsComponent implements OnInit {

  contests: Contest[];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getContests()
    .subscribe((data: Contest[]) => {
      this.contests = data;
      console.log(this.contests);
    });
  }
}


