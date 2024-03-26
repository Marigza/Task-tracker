import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { Task } from '../models/task.model';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { TaskHttpService } from '../task-http.service';
import { MatButtonModule } from '@angular/material/button';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'tta-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatSelectModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {

  selectedId: number | undefined = undefined;
  public dataBase$: Observable<Task[]> = this.http.postInitialTasks$();
  public tasks: any;
  public displayedColumns: string[] = ['title', 'employee', 'deadline', 'priority', 'status', 'description'];

  @ViewChild(MatSort) sort: MatSort = new MatSort

  public isVisibleFilter = false

  public filter = this.formBuilder.group({
    employee: [''],
    status: [''],
    deadline: [''],
  });

  public subs = new Subscription();

  constructor(
    private _liveAnnouncer: LiveAnnouncer,
    private router: Router,
    private http: TaskHttpService,
    private formBuilder: NonNullableFormBuilder
  ) { }

  ngOnInit() {
    this.subs.add(this.dataBase$.pipe()
      .subscribe(data => {
        this.tasks = new MatTableDataSource(data);
      }))
    this.subs.add(
      this.filter
        .get('employee')
        ?.valueChanges.pipe(
          debounceTime(1500),
          filter(Boolean),
          filter(value => value.length > 2),
          map(value=>value.toLowerCase())
        )
        .subscribe(value => {
          this.filterBy('employee', value)
        })
    );
    this.subs.add(
      this.filter
        .get('deadline')
        ?.valueChanges.pipe(
          debounceTime(1500),
          filter(Boolean),
          filter(value => value.length > 2),
          map(value=> new Date(value).setHours(0, 0, 0, 0))
        )
        .subscribe(value => {
          this.filterBy('deadline', value.toString())
        })
    );
    this.subs.add(
      this.filter
        .get('status')
        ?.valueChanges.pipe(
          debounceTime(1500),
          filter(Boolean),
          filter(value => value.length > 2),
        )
        .subscribe(value => {
          this.filterBy('status', value.toString())
        })
    );
  }

  ngAfterViewInit() {
    this.tasks.sort = this.sort;
  }

  redactTask(row: Task) {
    this.router.navigate([`/task-edit/${row.id}`]).catch(({ message }: Error) => message || null)
  }

  showInfo(event: Event, task: Task) {
    event.stopPropagation();
    this.router.navigate([`/task-page/${task.id}`]).catch(({ message }: Error) => message || null)
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  filterBy(target: 'employee' | 'status' | 'deadline', value: string) {
    this.subs.add(this.dataBase$.pipe(
      map(tasks => {
        return tasks.filter(task => {
          return task[target].toLowerCase().includes(value);
        })
      }),
    ).subscribe(tasks => {
      this.tasks = new MatTableDataSource(tasks);
      return this.tasks;
    }))
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
