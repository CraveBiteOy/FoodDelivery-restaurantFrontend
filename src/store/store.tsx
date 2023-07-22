import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer';
import RestaurantReducer from './reducers/RestaurantReducer';
import DishReducer from './reducers/DishReducer';
import CustomerReducer from './reducers/CustomerReducer';
import OrderReducer from './reducers/OrderReducer';
import OrderDishReducer from './reducers/OrderDishReducer';
import OwnerReducer from './reducers/OwnerReducer';




export const HOST_URL= "http://192.168.0.102:8080";
const initialState= {};

const rootReducer = combineReducers({
    USERS: userReducer,
    RESTAURANTS: RestaurantReducer,
    DISHES: DishReducer,
    CUSTOMERS: CustomerReducer,
    ORDERS: OrderReducer,
    ORDERDISHES: OrderDishReducer,
    OWNERS: OwnerReducer
});

const middleware = [thunk];

const store = createStore(
    rootReducer,
    initialState,
   
    composeWithDevTools(applyMiddleware(...middleware))
)


export default store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch