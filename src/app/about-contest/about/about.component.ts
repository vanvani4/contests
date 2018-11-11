import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MainService } from '../../main/main-service/main.service';
import { Contest } from '../../models/contest';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  private id: string;
  private activeItem;
  private contests;

  constructor(private router: Router, private route: ActivatedRoute, private mainService: MainService) { }

  ngOnInit() {
    this.contests = this.mainService.getContests()
      .subscribe((data: Contest[]) => this.contests = data);

    this.route.params.subscribe(params => {
      this.id = params['id'];
      console.log(this.id);
      this.mainService.getContestById(this.id)
        .subscribe(data => {
          this.activeItem = data;
          console.log(data);
        });
    });
  }
}
