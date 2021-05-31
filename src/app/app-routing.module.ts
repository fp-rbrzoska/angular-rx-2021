import { SubjectsComponent } from './subjects/subjects.component';
import { ObservablesComponent } from './observables/observables.component';
import { TestComponent } from './test/test.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'test', component: TestComponent},
  {path: 'observables', component: ObservablesComponent},
  {path: 'subjects', component: SubjectsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
