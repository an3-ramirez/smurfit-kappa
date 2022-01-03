import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components */
import { CubeComponent } from './components/cube/cube.component';
import { Cube2dComponent } from './components/cube2d/cube2d.component';
import { LoginComponent } from './pages/login/login.component';
import { Box1Component } from './components/box1/box1.component';
import { PageOneComponent } from './pages/page-one/page-one.component';


const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'pageOne', component: PageOneComponent},
  {path: 'cube', component: CubeComponent},
  {path: 'cube2d', component: Cube2dComponent},
  {path: 'cubeTwo', component: Box1Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
