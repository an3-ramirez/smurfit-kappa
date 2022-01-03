import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

/** Componetns */
import { AppComponent } from './app.component';
import { CubeComponent } from './components/cube/cube.component';
import { Cube2dComponent } from './components/cube2d/cube2d.component';
import { FormFigureComponent } from './components/form-figure/form-figure.component';
import { Box1Component } from './components/box1/box1.component';
import { NavbarComponent } from './layouts/components/navbar/navbar.component';

/** Pages */
import { LoginComponent } from './pages/login/login.component';
import { PageOneComponent } from './pages/page-one/page-one.component';


@NgModule({
  declarations: [
    AppComponent,
    CubeComponent,
    Cube2dComponent,
    LoginComponent,
    FormFigureComponent,
    Box1Component,
    PageOneComponent,
    NavbarComponent
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
