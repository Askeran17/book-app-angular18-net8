import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookFormComponent } from './book-form.component';

const routes: Routes = [
  { path: '', component: BookFormComponent },
  { path: ':id', component: BookFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class BookFormModule { }
