import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'

export const customerByIdAction = (customerId: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "customer_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/customers/customer/id/" + customerId, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("customer_by_id");
            console.log(res.data);
            dispatch({
                type: "customer_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading customer failed") 
        dispatch({
            type: "customer_error",
            payload: "loading customer failed"
        });
    }
}

export const authenticatedCustomerAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "customer_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/customers/customer/authenticatedUser", {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("customer_by_id");
            console.log(res.data);
            dispatch({
                type: "customer_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading customer failed") 
        dispatch({
            type: "customer_error",
            payload: "loading customer failed"
        });
    }
}

export const resetCustomerAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "customer_reset"
    })
}