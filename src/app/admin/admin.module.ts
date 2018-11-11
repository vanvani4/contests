import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from '../guard/auth.guard';
import { AuthService } from '../guard/auth.service';


@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AdminComponent],
  providers: [AuthGuard, AuthService]
})
export class AdminModule { }
