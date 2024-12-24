import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuotesComponent } from './quotes.component';

const routes: Routes = [
  { path: '', component: QuotesComponent },
  { path: ':id', component: QuotesComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    QuotesComponent
  ]
})
export class QuotesModule { }
