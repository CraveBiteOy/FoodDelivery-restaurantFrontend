import AsyncStorage from "@react-native-async-storage/async-storage"
import { Dispatch } from "react";
import { HOST_URL } from "../store";
import axios from "axios";
import { ACTION, CHANGEPASSWORD, LoginForm,  ORDER,  ORDER_REQUEST,  ORDER_STATUS,  UserRegisterForm } from "../../model/index.d";
import { Alert } from 'react-native'
import { CheckoutScreenNavigationProp } from "../../screens/CheckoutScreen";
import { OrderDetailedNavigationProp } from "../../screens/OrderDetailed";
import { CompletedOrderDetailedNavigationProp } from "../../screens/CompletedOrderDetailed";



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

export const completedOrdersAction = (customerID: number, status: ORDER_STATUS) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.get(HOST_URL + `/api/orders/customer/${customerID}/status/${status}`, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER[] = res.data;
            console.log("orders_completed_status_by_Customer");
            console.log(res.data);
            dispatch({
                type: "orders_completed_status_by_Customer",
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

export const AllOrdersofCustomerAction = (customerID: number) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.get(HOST_URL + `/api/orders/customer/${customerID}`, {
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER[] = res.data;
            console.log("orders_by_Customer");
            console.log(res.data);
            dispatch({
                type: "orders_by_Customer",
                payload: data
            })
        }
    } catch (err) {
        console.log(err);
        // Alert.alert("loading order failed") 
        dispatch({
            type: "order_error",
            payload: "loading order failed"
        });
    }
}


export const createOrderAction = (orderReq : ORDER_REQUEST, navigation: CheckoutScreenNavigationProp) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.post(HOST_URL + "/api/orders/order", orderReq,{
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("order_create");
            console.log(res.data);
            dispatch({
                type: "order_create",
                payload: data
            })
            navigation.navigate("OrderStack", {screen: "OrderDetailed", params: {orderID: data.id}})
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

export const reorderingAction = (preOrderID: number, navigation: CompletedOrderDetailedNavigationProp) => async (dispatch: Dispatch<ACTION>, getState: any) => {
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
            const res = await axios.post(HOST_URL + "/api/orders/reorder/previousOrder/" + preOrderID, {},{
                headers: {
                    "Authorization": token
                }
            });
            const data : ORDER = res.data;
            console.log("reordering_create");
            console.log(res.data);
            dispatch({
                type: "reordering_create",
                payload: data
            })
            navigation.navigate("OrderDetailed", {orderID: data.id});
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
