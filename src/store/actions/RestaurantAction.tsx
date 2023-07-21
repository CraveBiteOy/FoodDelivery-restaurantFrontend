import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION } from "../../model/index.d";
import { Alert } from 'react-native'

export const recommendedRestaurantsAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/recommendation", {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("recommended_restaurants");
            console.log(res.data);
            dispatch({
                type: "recommended_restaurants",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurants failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurants failed"
        });
    }
}

export const firstRestaurantForAuthOwnerAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/authenticatedOwner/firstRestaurant", {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("first_restaurant_for_authOwner");
            console.log(res.data);
            dispatch({
                type: "first_restaurant_for_authOwner",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurants failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurants failed"
        });
    }
}

export const checkRestaurantForAuthOwnerAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/authenticatedOwner/checkRestaurants", {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("check_restaurant_of_owner");
            console.log(res.data);
            dispatch({
                type: "check_restaurant_of_owner",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurants failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurants failed"
        });
    }
}

export const restaurantByIdAction = (restaurantId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/restaurant/id/" + restaurantId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("restaurant_by_id");
            console.log(res.data);
            dispatch({
                type: "restaurant_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurant failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurant failed"
        });
    }
}
export const restaurantByIdAndAuthCustomerAction = (restaurantId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/restaurant/authenticatedCustomer/id/" + restaurantId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("restaurant_by_id");
            console.log(res.data);
            dispatch({
                type: "restaurant_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurant failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurant failed"
        });
    }
}
export const restaurantByNameAction = (restaurantName: string) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "restaurant_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/restaurants/restaurant/name/" + restaurantName, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("restaurant_by_name");
            console.log(res.data);
            dispatch({
                type: "restaurant_by_name",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading restaurant failed") 
        dispatch({
            type: "restaurant_error",
            payload: "loading restaurant failed"
        });
    }
}

export const resetRestaurantAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "restaurant_reset"
    })
}
