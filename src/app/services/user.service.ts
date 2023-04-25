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
addUser(user: IUserModel): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts.json`, user);
}
updateUser(user: IUserModel) {
    return this.http
        .patch<{ name: string }>(`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts.json`, user);
}
deleteUser(id: number) {
    const url=`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts/${id}.json`;
   
    return this.http.delete(url);
}
getUserById(id: number):Observable<IUserModel> {
    const url=`https://nexkraft-19e75-default-rtdb.firebaseio.com/posts/${id}.json`;
   
    return this.http.get<IUserModel>(url);
}
}