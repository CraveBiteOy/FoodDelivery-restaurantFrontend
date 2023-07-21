import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION} from "../../model/index.d";
import { Alert } from 'react-native'



export const orderDishByIdAction = (orderDishID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "orderDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orderdishes/orderdish/" + orderDishID, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("orderDish_by_id");
            console.log(res.data);
            dispatch({
                type: "orderDish_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading orderDish failed") 
        dispatch({
            type: "orderDish_error",
            payload: "loading orderDish failed"
        });
    }
}

export const orderDishesByOrderIdAction = (orderID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "orderDish_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orderdishes/order/" + orderID, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("orderDishes_by_order");
            console.log(res.data);
            dispatch({
                type: "orderDishes_by_order",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading orderDish failed") 
        dispatch({
            type: "orderDish_error",
            payload: "loading orderDish failed"
        });
    }
}

export const resetOrderDishesAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "orderDishes_reset"
    })
}

export const resetSingleOrderDishAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "orderDish_item_reset"
    })
}

