import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, DISH_CREATE, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'
import { DishListNavigationProp } from "../../screens/DishListScreen";
import { DishFormNavigationProp } from "../../screens/DishForm";



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

export const createDishAction = (dishRequest: DISH_CREATE, navigation: DishFormNavigationProp) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.post(HOST_URL + "/api/dishes/dish",  dishRequest, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("dish_adding");
            console.log(res.data);
            dispatch({
                type: "dish_adding",
                payload: data
            })
            navigation.navigate("DishListScreen")
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

export const updateDishAction = (dishId: number,  navigation: DishFormNavigationProp, name?: string, description?: string, price?: number, imageurl?: string | null, availability?: boolean) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.put(HOST_URL + `/api/dishes/dish/${dishId}?name=${name && name?.length > 0 && name}&description=${description && description?.length > 0 && description}&price=${price && price > 0 && price}&imageurl=${imageurl && imageurl?.length > 0 && imageurl}&availability=${availability}`,  {}, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("dish_update_by_id");
            console.log(res.data);
            dispatch({
                type: "dish_update_by_id",
                payload: data
            })
            navigation.navigate("DishListScreen")
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

export const updateDishAvailabilityAction = (dishId: number, availability: boolean) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.put(HOST_URL + `/api/dishes/dish/${dishId}/availability/${availability}`,  {}, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("dish_update_availability_by_id");
            console.log(res.data);
            dispatch({
                type: "dish_update_availability_by_id",
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

export const resetDishAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "dish_reset"
    })
}
