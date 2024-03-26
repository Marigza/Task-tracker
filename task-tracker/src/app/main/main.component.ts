import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { TableComponent } from '../table/table.component';
import { AddTaskComponent } from '../add-task/add-task.component';

@Component({
  selector: 'tta-main',
  standalone: true,
  imports: [CommonModule, MatButtonModule, TableComponent, AddTaskComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {
  public isActiveAddSection = false;
  public isVisibleFilter = false;
}
