import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { NgCalendarModule  } from 'ionic2-calendar';
import { DoctorprofilePage } from './doctorprofile.page';

const routes: Routes = [
  {
    path: '',
    component: DoctorprofilePage
  }
];

@NgModule({
  imports: [
    NgCalendarModule, 
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [DoctorprofilePage]
})
export class DoctorprofilePageModule {}
