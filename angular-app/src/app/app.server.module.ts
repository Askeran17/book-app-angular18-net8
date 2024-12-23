import { NgModule } from '@angular/core';
import { ServerModule } from '@angular/platform-server';
import { AppModule } from './app.module';

@NgModule({
  imports: [
    ServerModule,
    AppModule
  ]
})
export class AppServerModule { }
