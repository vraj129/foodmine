import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { HttpClient } from "@angular/common/http";
import { ORDER_CREATE_URL, ORDER_NEW_FOR_CURRENT_USER_URL, ORDER_PAY_URL } from "../shared/urls";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient:HttpClient) {}
    
    create(order:Order){
        return this.httpClient.post<Order>(ORDER_CREATE_URL,order);
    }

    getNewOrderForCurrentUser():Observable<Order>{
        return this.httpClient.get<Order>(ORDER_NEW_FOR_CURRENT_USER_URL);
    }

    pay(order:Order):Observable<string>{
        return this.httpClient.post<string>(ORDER_PAY_URL,order);
    }
}