import { Injectable } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../store/app.state";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { IUserModel } from "../models/user.model";
import { environment } from "src/environments/environment";

@Injectable({
    providedIn:'root'
})
export class UserService{
 constructor(private store:Store<AppState>,private http:HttpClient){
 }   
 getUsers(): Observable<IUserModel[]> {
    let url=`${environment.API_URL}/api/customer/GetCustomerList`+'?PageNumber=1&PageSize=20';
    return this.http
        .get(url)
        .pipe(
            map((data: any) => {
                const posts: IUserModel[] = [];
                for (let key in data) {
                    posts.push({ ...data[key], id: key });
                }
                return posts;
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
        .patch<{ name: string }>(url, user);
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