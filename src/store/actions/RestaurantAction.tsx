import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, RESTAURANT_CREATE } from "../../model/index.d";
import { Alert } from 'react-native'
import { RestaurantFormNavigationStack } from "../../screens/RestaurantForm";



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

export const createRestaurantAction = (restaurant: RESTAURANT_CREATE, navigation: RestaurantFormNavigationStack) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.post(HOST_URL + "/api/restaurants/restaurant", restaurant,{
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("restaurant_create");
            console.log(res.data);
            dispatch({
                type: "restaurant_create",
                payload: data
            })
            navigation.navigate("Drawer")
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

export const updateRestaurantAction = (RestaurantId: number, name: string | null, imageurl: string | null, cookingTime: number | null) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.put(HOST_URL + `/api/restaurants/restaurant/id/${RestaurantId}?name=${name}&imageurl=${imageurl}&cookingTime=${cookingTime}`, {},{
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("restaurant_update");
            console.log(res.data);
            dispatch({
                type: "restaurant_update",
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
