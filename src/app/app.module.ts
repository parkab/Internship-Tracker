import { NgModule } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    MatSlideToggleModule
  ],
  exports: [
    MatSlideToggleModule
  ]
})
export class AppModule { }
