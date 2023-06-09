import { Component } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserServiceService } from 'src/app/services/user.service';
import { User } from 'src/app/shared/models/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  cartQuantity = 0;
  user!:User;
  constructor(cartService:CartService,private userService:UserServiceService){
    cartService.getCartObservable().subscribe((newCartItem) => {
      this.cartQuantity = newCartItem.totalCount;
    });
    userService.userObservable.subscribe((user) => {
      if(user) {
        this.user = user;
      }
    })
  }

  logout() {
    this.userService.logout();
  }

  get isAuth() {
    return this.user.token;
  }
}
