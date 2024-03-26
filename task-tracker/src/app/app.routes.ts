import { Routes } from '@angular/router';
import {TaskPageComponent} from './task-page/task-page.component';
import {MainComponent} from './main/main.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { EditTaskComponent } from './edit-task/edit-task.component';

export const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'task-page/:taskId', component: TaskPageComponent },
  { path: 'task-edit/:taskId', component: EditTaskComponent },
  { path: '**', component: PageNotFoundComponent },
];

