import { Routes } from '@angular/router';
import {TaskPageComponent} from './task-page/task-page.component';
import {MainComponent} from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'task-page', component: TaskPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

