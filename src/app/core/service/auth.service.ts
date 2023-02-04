import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import {  Headers } from "@angular/http";
import { BehaviorSubject, Observable, of } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../models/user";
import { environment } from "src/environments/environment";
import { AppConfig } from "src/app/config/app.config";

@Injectable({
  providedIn: "root",
})
export class AuthService {

  baseUrl: string = '';
  private loggedIn = new BehaviorSubject<boolean>(false);
  // private currentUserSubject: BehaviorSubject<User>;
  // public currentUser: Observable<User>;


  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }
  constructor(private http: HttpClient) {
    // this.currentUserSubject = new BehaviorSubject<User>(
    //   JSON.parse(localStorage.getItem("currentUser"))
    // );
    // this.currentUser = this.currentUserSubject.asObservable();
    this.baseUrl = AppConfig.serviceBase_Url.base_Url;
  }

  // public get currentUserValue(): User {
  //   return this.currentUserSubject.value;
  // }


  
  Login(req) {
    debugger
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    var loginUserData = "userid=" + req.UserID + "&password=" + req.Password;
    return this.http.post(this.baseUrl + '/User/LoginUser', loginUserData, { headers }).pipe(
      map((res: any) => res.json()),
      map((response: any) => {

        localStorage.setItem('currentUser', JSON.stringify(response.LoginDetails));
        // this.loggedIn = true;
        this.loggedIn.next(true);
        return response;
      }));
  }
  // login(username: string, password: string) {
  //   return this.http
  //     .post<any>(`${environment.apiUrl}/authenticate`, {
  //       username,
  //       password,
  //     })
  //     .pipe(
  //       map((user) => {
  //         // store user details and jwt token in local storage to keep user logged in between page refreshes

  //         localStorage.setItem("currentUser", JSON.stringify(user));
  //         this.currentUserSubject.next(user);
  //         return user;
  //       })
  //     );
  // }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem("currentUser");
    // this.currentUserSubject.next(null);
    this.loggedIn.next(false);
    return of({ success: false });
  }
}
