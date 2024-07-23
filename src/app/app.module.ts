import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    BrowserModule,
    MatSlideToggleModule,
    ReactiveFormsModule
  ],
  exports: [
    MatSlideToggleModule
  ]
})
export class AppModule { }
