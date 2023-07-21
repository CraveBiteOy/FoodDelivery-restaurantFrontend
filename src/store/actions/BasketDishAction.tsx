import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'

export const basketDishByIdAction = (basketDishId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/BasketDishes/id/" + basketDishId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basketDish_by_id");
            console.log(res.data);
            dispatch({
                type: "basketDish_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const basketDishByDishAndBasketAction = (dishId: number, basketId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + `/api/BasketDishes/dish/${dishId}/basket/${basketId}`, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basketDish_by_dish_and_basket");
            console.log(res.data);
            dispatch({
                type: "basketDish_by_dish_and_basket",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const basketDishesByBasketAction = (basketId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/BasketDishes/basket/" + basketId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basketDishes_by_basketId");
            console.log(res.data);
            dispatch({
                type: "basketDishes_by_basketId",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const addBasketDishAction = (dishId: number, basketId: number, quantity: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.post(HOST_URL + `/api/BasketDishes/basket/${basketId}/dish/${dishId}/quantity/${quantity}`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("baksetDish_add_dish_to_basket");
            console.log(res.data);
            dispatch({
                type: "baksetDish_add_dish_to_basket",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const updateBasketDishAction = (basketDishId: number, quantity: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.put(HOST_URL + `/api/BasketDishes/update/basketDish/${basketDishId}/quantity/${quantity}`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("basketDish_update");
            console.log(res.data);
            dispatch({
                type: "basketDish_update",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const removeBasketDishAction = (basketDishId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "basketDish_error",
                payload: "token is null"
            });
        } else {
            await axios.put(HOST_URL + `/api/BasketDishes/remove/basketDish/${basketDishId}/`, {}, {
                headers: {
                    "Authorization": token
                }
            });
            console.log("basketDish_remove_basketDish_from_basket");
    
            dispatch({
                type: "basketDish_remove_basketDish_from_basket",
                payload: basketDishId
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading basketDish failed") 
        dispatch({
            type: "basketDish_error",
            payload: "loading basketDish failed"
        });
    }
}
export const resetBasketDishItemAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "basketDish_reset_one_item"
    })
}

export const resetAllBasketDishesAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "basketDish_reset_all"
    })
}