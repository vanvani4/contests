import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { LastPostsComponent } from './last-posts/last-posts.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    MainRoutingModule
  ],
  declarations: [LastPostsComponent, AllPostsComponent, MainComponent]
})
export class MainModule { }
