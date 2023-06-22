import { Injectable } from "@angular/core";
import { Order } from "../shared/models/Order";
import { HttpClient } from "@angular/common/http";
import { ORDER_CREATE_URL } from "../shared/urls";

@Injectable({
    providedIn: 'root'
})
export class OrderService {

    constructor(private httpClient:HttpClient) {}
    
    create(order:Order){
        return this.httpClient.post<Order>(ORDER_CREATE_URL,order);
    }
}