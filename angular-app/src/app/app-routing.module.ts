import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';

export const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'book-list', loadChildren: () => import('./book-list/book-list.module').then(m => m.BookListModule) },
  { path: 'book-form', loadChildren: () => import('./book-form/book-form.module').then(m => m.BookFormModule) },
  { path: 'quote-list', loadChildren: () => import('./quote-list/quote-list.module').then(m => m.QuoteListModule) },
  { path: 'quote-form', loadChildren: () => import('./quote-form/quote-form.module').then(m => m.QuoteFormModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
