import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import { IUserLogin } from '../shared/interface/IUserLogin';
import { HttpClient } from '@angular/common/http';
import { LOGIN_USER } from '../shared/urls';
import { ToastrService } from 'ngx-toastr';

const USER_KEY='User';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient, private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(LOGIN_USER, userLogin).pipe(
      tap({
        next: (user) =>{
          this.setUserToLocalsStrorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        error: (errorResponse) => {
          console.log(errorResponse);
          this.toastrService.error(errorResponse.error, 'Login Failed');
        }
      })
    );
  }

  private setUserToLocalsStrorage(user:User) {
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalStorage():User {
    const user = localStorage.getItem(USER_KEY);
    return user ? JSON.parse(user) : new User();
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }


}
