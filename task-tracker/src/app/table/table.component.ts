import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { Task } from '../models/task.model';
import { dataBase } from '../database/db';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'tta-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatSortModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent implements OnInit, AfterViewInit {
  public tasks = new MatTableDataSource(dataBase);
  public displayedColumns: string[] = ['title', 'employee', 'deadline', 'priority', 'status', 'description'];
  tasks$: Observable<Task[]> | null = null;
  selectedId: number | undefined = undefined;
  dataBase = dataBase;

  @ViewChild(MatSort) sort: MatSort = new MatSort;

  constructor(private _liveAnnouncer: LiveAnnouncer, private route: ActivatedRoute, private router: Router) {}


  ngOnInit() {
  // this.tasks$ = this.route.paramMap.pipe(
  //   switchMap(params => {
  //     this.selectedId = Number(params.get('id'));
  //     //return this.getTasks();
  //     //return this.selectedId;
  //   })
  // );
  }

  ngAfterViewInit() {
    this.tasks.sort = this.sort;
  }

  getTasks() {
    return dataBase;
  }

  redactTask(row: Task) {
    console.log(row)
  }

  showInfo(event: Event) {
    event.stopPropagation();
    console.log('go to detail page')
    this.router.navigate([`/task-page/123`]).catch(({ message }: Error) => message || null)
    // TODO temporary decision with 123 route
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }
}
