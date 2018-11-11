import { Component, OnInit } from '@angular/core';
import { MainService } from '../main-service/main.service';
import { Contest } from '../../models/contest';

@Component({
  selector: 'app-last-posts',
  templateUrl: './last-posts.component.html',
  styleUrls: ['./last-posts.component.css']
})
export class LastPostsComponent implements OnInit {

  contests: Contest[];

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.mainService.getContests()
    .subscribe((data: Contest[]) => this.contests = data);
  }
}
