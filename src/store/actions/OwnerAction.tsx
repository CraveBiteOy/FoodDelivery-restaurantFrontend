import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'

export const ownerByIdAction = (ownerID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "owner_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/owners/owner/id/" + ownerID, {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("owner_by_id");
            console.log(res.data);
            dispatch({
                type: "owner_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log("owner failed in loading "  + err);
        Alert.alert("loading owner failed") 
        dispatch({
            type: "owner_error",
            payload: "loading owner failed"
        });
    }
}

export const ownerByAuthUserAction = () => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "owner_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/owners/owner/authenticatedUser", {
                headers: {
                    "Authorization": token
                }
            });
            const data = res.data;
            console.log("owner_by_authenticatedUser");
            console.log(res.data);
            dispatch({
                type: "owner_by_authenticatedUser",
                payload: data
            })
        }
    } catch (err) {
        console.log("owner failed in loading "  + err);
        Alert.alert("loading owner failed") 
        dispatch({
            type: "owner_error",
            payload: "loading owner failed"
        });
    }
}

export const resetOwnerAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "owner_reset"
    })
}