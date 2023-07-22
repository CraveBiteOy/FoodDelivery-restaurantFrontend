import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  ORDER,  ORDER_REQUEST,  ORDER_STATUS,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'




export const orderByIdAction = (orderID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orders/order/id/" + orderID, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("order_by_id");
            console.log(res.data);
            dispatch({
                type: "order_by_id",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}

export const ownerAcceptOrderAction = (orderID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.put(HOST_URL + `/api/orders/order/id/${orderID}/acceptByOwner`, {},{
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("order_owner_accept");
            console.log(res.data);
            dispatch({
                type: "order_owner_accept",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}

export const ownerDeclineOrderAction = (orderID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.put(HOST_URL + `/api/orders/order/id/${orderID}/rejectByOwner`, {},{
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("order_owner_decline");
            console.log(res.data);
            dispatch({
                type: "order_owner_decline",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}

export const orderCookedAndReadyForPickupAction = (orderID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.put(HOST_URL + `/api/orders/order/id/${orderID}/finishCooking`, {},{
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("order_ready_for_pickup");
            console.log(res.data);
            dispatch({
                type: "order_ready_for_pickup",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}
export const listOrdersCompletedAction = (restaurantID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orders/completed/restaurant/" + restaurantID, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("list_completed_orders_by_restaurant");
            console.log(res.data);
            dispatch({
                type: "list_completed_orders_by_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}

export const listOrdersInProgressAction = (restaurantID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orders/inprogress/restaurant/" + restaurantID, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("list_inprogress_orders_by_restaurant");
            console.log(res.data);
            dispatch({
                type: "list_inprogress_orders_by_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}

export const listOrdersAction = (restaurantID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
    try {
        const token : string | null = await AsyncStorage.getItem("token"); 
        if(token == null) {
            console.log("token is null");
            Alert.alert("token is null") 
            dispatch({
                type: "order_error",
                payload: "token is null"
            });
        } else {
            const res = await axios.get(HOST_URL + "/api/orders/restaurant/" + restaurantID, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("list_orders_by_restaurant");
            console.log(res.data);
            dispatch({
                type: "list_orders_by_restaurant",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}


export const updateOrderFromWebsocket = (order: ORDER) => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "order_update_from_websocket_Subscription",
        payload: order
    })
}

export const resetOrderAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "order_reset"
    })
}
export const resetActiveOrderAction = () => (dispatch : Dispatch<ACTION>, getState: any) => {
    dispatch({
        type: "active_order_reset"
    })
}
