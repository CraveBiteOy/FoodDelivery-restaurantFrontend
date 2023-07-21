import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'



export const dishByIdAction = (dishId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "dish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/dishes/dish/" + dishId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("dish_by_id");
            console.log(res.data);
            dispatch({
                type: "dish_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading dish failed") 
        dispatch({
            type: "dish_error",
            payload: "loading dish failed"
        });
    }
}

export const dishesByRestaurantAction = (restaurantId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "dish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/dishes/restaurant/" + restaurantId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("dishes_by_restaurant");
            console.log(res.data);
            dispatch({
                type: "dishes_by_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading dishes failed") 
        dispatch({
            type: "dish_error",
            payload: "loading dishes failed"
        });
    }
}

export const resetDishAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "dish_reset"
    })
}
