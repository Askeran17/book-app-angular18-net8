import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuoteFormComponent } from './quote-form.component';

const routes: Routes = [
  { path: '', component: QuoteFormComponent },
  { path: ':id', component: QuoteFormComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class QuoteFormModule { }
