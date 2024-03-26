import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from './models/task.model';
import { db } from './database/database';



@Injectable({
  providedIn: 'root'
})
export class TaskHttpService {

  constructor(private http: HttpClient) { }

  public postInitialTasks() {
    let data: Task[];
    let dataString: string = localStorage.getItem('dataBase') ?? '';

    if (dataString) {
      data = JSON.parse(dataString)
    } else {
      data = db;
      localStorage.setItem('dataBase', JSON.stringify(data))
    }

    return data;
  }

  public getAllTasks(): Task[] | undefined {
    const dataFromStorage = localStorage.getItem('dataBase');
    if (dataFromStorage) {
      return JSON.parse(dataFromStorage);
    }
    return;
  }

  public getTask(id: string): Task | undefined {
    const tasks = this.getAllTasks();
    if (tasks) {
      return tasks.find(task => task.id === id);
    }
    return;
  }

  public createTask(task: Task):void {
    const dataFromStorage = localStorage.getItem('dataBase');
    if (dataFromStorage) {
      const tasks: Task[] = JSON.parse(dataFromStorage);
      tasks.push(task);
      const newData = JSON.stringify(tasks);
      localStorage.setItem('dataBase', newData)
    }
  }

  public updateTask(task: Task): void {
    const dataFromStorage = localStorage.getItem('dataBase');
    if (dataFromStorage) {
      const tasks: Task[] = JSON.parse(dataFromStorage);
      const updatedTaskIndex = tasks.findIndex(elem => elem.id === task.id);
      tasks.splice(updatedTaskIndex, 1, task);
      const newData = JSON.stringify(tasks);
      localStorage.setItem('dataBase', newData)
    }
  }
}
