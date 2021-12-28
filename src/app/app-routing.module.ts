import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/** Components */
import { CubeComponent } from './cube/cube.component';
import { Cube2dComponent } from './cube2d/cube2d.component';
import { IndexComponent } from './index/index.component';
import { Box1Component } from './box1/box1.component';
import { PageOneComponent } from './page-one/page-one.component';


const routes: Routes = [
  {path: '', component: IndexComponent},
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
