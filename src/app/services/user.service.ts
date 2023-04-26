import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { IUserModel } from "../models/user.model";
import { environment } from "src/environments/environment";
import { SearchModel } from "../models/search.model";

@Injectable({
    providedIn:'root'
})
export class UserService{
 constructor(private store:Store<AppState>,private http:HttpClient){
 }   
 getUsers(search:SearchModel): Observable<IUserModel[]> {
    let filter='';
    let url=`${environment.API_URL}/api/customer/GetCustomerList`;
    if(search.pageNumber!=undefined || search.pageNumber!=null){
        filter+='PageNumber='+search.pageNumber;
    }
    if(search.pageSize){
        filter+='&PageSize='+search.pageSize;
    }
    if (search.searching) {
        filter+='&search='+search.searching;
    }
    if (filter!='') {
        url=url+'?'+filter;
    }
    return this.http
        .get(url)
        .pipe(
            map((data: any) => {
                const users: IUserModel[] = [];
                for (let key in data) {
                    users.push({ ...data[key], id: key });
                }
                const usersList=users.sort().reverse();
                return usersList;
            }
            )
        );
}
addUser(user: IUserModel): Observable<IUserModel> {
    let url=`${environment.API_URL}/api/customer/CreateCustomer`;
    return this.http.post<IUserModel>(url, user);
}
updateUser(user: IUserModel) {
    let url=`${environment.API_URL}/api/customer/UpdateCustomer`;
    return this.http
        .put<IUserModel>(url, user);
}
deleteUser(id: number) {
    let url=`${environment.API_URL}/api/customer/DeleteCustomer/${id}`;      
    return this.http.delete(url);
}
getUserById(id: number):Observable<IUserModel> {
    let url=`${environment.API_URL}/api/customer/GetCustomerByCustomerID/${id}`;      
    return this.http.get<IUserModel>(url);
}
}