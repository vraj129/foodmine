import { Food } from "./Food";

export class CartItems {

  quantity:number = 1;
  price:number = this.food.price;
  constructor(public food:Food){

  }
}
