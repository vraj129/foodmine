const BASE_URL = "http://localhost:5000";

export const GET_ALL_FOODS = BASE_URL + "/api/foods";

export const GET_SEARCHED_FOODS = BASE_URL + "/api/foods/search/";

export const GET_ALL_TAGS = BASE_URL + "/api/foods/tags";

export const GET_SEARCHED_TAG = BASE_URL + "/api/foods/tags/";

export const GET_FOOD_BY_ID = BASE_URL + "/api/foods/";

export const LOGIN_USER = BASE_URL + "/api/user/login";

export const REGISTER_USER = BASE_URL + "/api/user/register";

export const ORDERS_URL = BASE_URL + '/api/orders';

export const ORDER_CREATE_URL = ORDERS_URL + '/create';

export const ORDER_NEW_FOR_CURRENT_USER_URL = ORDERS_URL + '/newOrderForCurrentUser';
