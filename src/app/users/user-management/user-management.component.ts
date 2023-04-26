import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUsers } from '../state/users.action';
import { IUserModel } from 'src/app/models/user.model';
import { MatDialog } from '@angular/material/dialog';
import { UserDialogComponent } from './add-edit-user/userDialogComponent';
import { Observable, Subscription, map } from 'rxjs';
import { getUserAll, getUsers } from '../state/users.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SearchModel } from 'src/app/models/search.model';
import { PagerService } from 'src/app/services/paginator.service';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css'],
  providers: [PagerService]
})
export class UserManagementComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone'];
  dataSource: any = [];
  userList?: IUserModel[];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  userSubscription: Subscription | any;
  //Pagination
  public pageNumber: number = 0;
  public pageSize: number = 5;
  public totalRows: number = 0;
  public pager: any = {};
  public pagedItems: any = [];
  public pageStart: number = 0;
  public pageEnd: number = 0;
  public totalRowsInList: number = 0;
  public isPaging: number = 0;
  public pageSizeList: any = [];

  constructor(private store: Store<AppState>, private dialog: MatDialog, private pageService: PagerService) {
    this.pageSizeList = pageService.pageSize();
  }
  ngOnDestroy(): void {

    this.userSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {

    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.loadUser(0, true);
  }
  loadUser(pageIndex: number, isPaging: boolean) {
    const searchModel: SearchModel = {
      searching: '',
      pageNumber: pageIndex,
      pageSize: this.pageSize
    }
    this.store.dispatch(loadUsers({ search: searchModel }));
    this.userSubscription = this.store.select(getUserAll).subscribe((data) => {
      if (data) {
        this.userList = data;
        debugger
        this.dataSource = new MatTableDataSource<IUserModel>(data);
        this.totalRows = this.userList.length > 0 ? this.userList[0].total as number : 0;
        //paging info start   
        this.totalRowsInList = this.userList.length;
        if (this.pageNumber == 0 || this.pageNumber == 1) {
          this.pageStart = 1;
          if (this.totalRowsInList < this.pageSize) {
            this.pageEnd = this.totalRowsInList;
          } else {
            this.pageEnd = this.pageSize;
          }
        } else {
          this.pageStart = (this.pageNumber - 1) * this.pageSize + 1;
          this.pageEnd = (this.pageStart - 1) + this.totalRowsInList;
        }
        //paging info end
        if (isPaging)
          this.setPaging(pageIndex, false);
        else
          this.pagedItems = this.userList;

      }
    });
  }
  //Set Page
  setPaging(page: number, isPaging: boolean) {
    this.pager = this.pageService.getPager(this.totalRows, page, this.pageSize);
    if (isPaging) {
      this.loadUser(page, false);
    }
    else {
      this.pagedItems = this.userList;
    }
  }
  openDialog(exitAnimationDuration: string, enterAnimationDuration: string): void {
    const dialogRef = this.dialog.open(UserDialogComponent, {
      width: '500px',
      data: {},
      panelClass: 'user-dialog',
      exitAnimationDuration,
      enterAnimationDuration
    });

    dialogRef.afterClosed().subscribe(result => {
      this.loadUser(0, true);
    });
  }

}

