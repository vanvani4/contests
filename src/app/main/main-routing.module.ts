import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { LastPostsComponent } from './last-posts/last-posts.component';
import { MainComponent } from './main/main.component';

const childRoutes: Routes = [
  {path: 'main', component: MainComponent}
];



@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
