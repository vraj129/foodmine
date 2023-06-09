import { Injectable } from '@angular/core';
import { Food } from '../shared/models/Food';
import { sample_foods, sample_tags } from 'src/data';
import { Tag } from '../shared/models/Tag';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { GET_ALL_FOODS, GET_ALL_TAGS, GET_FOOD_BY_ID, GET_SEARCHED_FOODS, GET_SEARCHED_TAG } from '../shared/urls';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) { }

  getAll():Observable<Food[]>{
    return this.http.get<Food[]>(GET_ALL_FOODS);
  }

  getAllFoodsBySearchTerm(searchTerm:string) {
    return this.http.get<Food[]>(GET_SEARCHED_FOODS+searchTerm);
  }

  getAllTags():Observable<Tag[]>{
    return this.http.get<Tag[]>(GET_ALL_TAGS);
  }

  getAllFoodsByTag(tag:string):Observable<Food[]>{
    return this.http.get<Food[]>(GET_SEARCHED_TAG+tag);
  }

  getFoodById(foodId:string):Observable<Food>{
    return this.http.get<Food>(GET_FOOD_BY_ID+foodId);
  }
}
