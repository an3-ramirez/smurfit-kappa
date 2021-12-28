import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

/** Componetns */
import { AppComponent } from './app.component';
import { CubeComponent } from './cube/cube.component';
import { Cube2dComponent } from './cube2d/cube2d.component';
import { IndexComponent } from './index/index.component';
import { FormFigureComponent } from './form-figure/form-figure.component';
import { Box1Component } from './box1/box1.component';

/** Pages */
import { PageOneComponent } from './page-one/page-one.component';


@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    Cube2dComponent,
    IndexComponent,
    FormFigureComponent,
    Box1Component,
    PageOneComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
