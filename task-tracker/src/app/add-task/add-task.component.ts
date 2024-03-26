import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { Task } from '../models/task.model';
import { TaskHttpService } from '../task-http.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'tta-add-task',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule, MatInputModule, MatFormFieldModule, MatButtonModule, MatSelectModule],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {
  public newTask = this.formBuilder.group({
    title: ['', [Validators.required]],
    employee: ['', [Validators.required]],
    description: ['', [Validators.required]],
    deadline: ['', [Validators.required]],
    priority: ['', [Validators.required]],
    status: ['', [Validators.required]],
  });
  public isVisible = true;

  constructor(
    private router: Router,
    private formBuilder: NonNullableFormBuilder,
    private httpService: TaskHttpService
  ) { }

  onSubmit() {
    let deadlineValue: string = '';
    const deadline = this.newTask.get('deadline')?.value;

    if (deadline) {
      deadlineValue = new Date(deadline).setHours(0, 0, 0, 0).toString()
    }

    console.log('submit')
    if (this.newTask.valid) {
      const newTask: Task = {
        id: uuidv4(),
        title: this.newTask.get('title')?.value ?? '',
        employee: this.newTask.get('employee')?.value ?? '',
        description: this.newTask.get('description')?.value ?? '',
        deadline: deadlineValue ?? '',
        priority: this.newTask.get('priority')?.value ?? '',
        status: this.newTask.get('status')?.value ?? '',
      };
      console.log(newTask)
      this.httpService.createTask(newTask);

      this.cleanForm();
    }
  }

  cleanForm() {
    this.newTask.get('title')?.setValue('')
    this.newTask.get('employee')?.setValue('')
    this.newTask.get('description')?.setValue('')
    this.newTask.get('deadline')?.setValue('')
    this.newTask.get('priority')?.setValue('')
    this.newTask.get('status')?.setValue('')
  }
}
