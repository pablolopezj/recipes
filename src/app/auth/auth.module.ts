import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AuthComponent } from './auth.component';
import { SharedModule } from './../shared/shared.module';

const authRoutes: Routes = [
  { path: '', component: AuthComponent}
];

@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule, 
    FormsModule, 
    RouterModule.forChild(authRoutes),
    SharedModule
  ]
})
export class AuthModule {}