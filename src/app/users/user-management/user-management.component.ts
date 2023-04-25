import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { loadUsers } from '../state/users.action';
import { IUserModel } from 'src/app/models/user.model';
import { MatDialog} from '@angular/material/dialog';
import { UserDialogComponent } from './add-edit-user/userDialogComponent';
import { Observable, Subscription, map } from 'rxjs';
import { getUsers } from '../state/users.selector';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit,AfterViewInit,OnDestroy {
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'phone'];
  dataSource:any=[];
  userList?: IUserModel[];
  userList$?: Observable<IUserModel[]>;
  @ViewChild(MatPaginator) paginator: MatPaginator|any;
  userSubscription: Subscription|any;
  constructor(private store: Store<AppState>, private dialog: MatDialog) {

  }
  ngOnDestroy(): void {
    
    this.userSubscription.unsubscribe();
  }
  ngAfterViewInit(): void {
    
    this.dataSource.paginator=this.paginator;
  }
  ngOnInit(): void {
    this.store.dispatch(loadUsers());
    this.loadUser();
  }
  list: any = [];
  loadUser() {    
    this.userList$ = this.store.select(getUsers);
    this.userSubscription=this.store.select(getUsers).subscribe((data)=>{
      if (data) {
        console.log(data)
        this.userList=data;        
        debugger
        this.dataSource=new MatTableDataSource<IUserModel>(this.userList);
      }
    });
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
      //this.loadUser();
    });
  }

}

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];
