import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { CommonModule } from '@angular/common';
import { TaskHttpService } from '../task-http.service';

@Component({
  selector: 'tta-task-page',
  standalone: true,
  imports: [CommonModule, RouterLink, MatButtonModule],
  templateUrl: './task-page.component.html',
  styleUrl: './task-page.component.scss'
})
export class TaskPageComponent implements OnInit {
  task$: Observable<Task> | null = null;
  task: Task | undefined = undefined;
  constructor(private route: ActivatedRoute, private fakeHttp: TaskHttpService, private router: Router) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = routeParams.get('taskId');

    if (taskIdFromRoute) {
      this.task = this.fakeHttp.getTask(taskIdFromRoute);
    }
  }

  editTask() {
    console.log(this.task)
    this.task && this.router.navigate([`/task-edit/${this.task.id}`]).catch(({ message }: Error) => message || null)
  }
}
