import { Component } from '@angular/core';
import { Validators, NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Task } from '../models/task.model';
import { TaskHttpService } from '../task-http.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

@Component({
  selector: 'tta-edit-task',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.scss'
})
export class EditTaskComponent {
  public editTask = this.formBuilder.group({
    employee: ['', [Validators.required]],
    status: ['', [Validators.required]],
   });
  public task: Task | undefined = undefined;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: NonNullableFormBuilder,
    private http: TaskHttpService
  ) { }

  ngOnInit() {
    const routeParams = this.route.snapshot.paramMap;
    const taskIdFromRoute = routeParams.get('taskId');

    if (taskIdFromRoute) {
      this.task = this.http.getTask(taskIdFromRoute);
    }
  }

  onSubmit() {
    if (this.editTask.valid) {
      const editedTask: Task = {
        id: this.task!.id,
        title: this.task!.title,
        description: this.task!.description,
        deadline: this.task!.deadline,
        priority: this.task!.priority,
        employee: this.editTask.get('employee')?.value ?? '',
        status: this.editTask.get('status')?.value ?? '',
      };
      console.log(editedTask)
      this.http.updateTask(editedTask);
      this.router.navigate(['']).catch(({ message }: Error) => message || null)
    }
  }
}
