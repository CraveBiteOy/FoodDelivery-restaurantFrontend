import { ACTION, ORDER, declaredStateOrder,  } from "../../model/index.d"

const initialState = {
    order: {},
    orders: [],
    message: null,
    orderSuccess: false,
    orderError: false
}

export default (state:  declaredStateOrder= initialState, action: ACTION) => {
    switch (action.type) {
        case "list_orders_by_restaurant":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case "list_completed_orders_by_restaurant":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case "list_inprogress_orders_by_restaurant":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true
            }
        case "order_by_id":
            return {
                ...state,
                order: action.payload,
                orderSuccess: true
            }
        case "order_owner_accept":
            return {
                ...state,
                order: action.payload,
                orders: state.orders.map((item: ORDER) => item.id == action.payload.id ? action.payload : item),
                orderSuccess: true
            }
        case "order_owner_decline":
            return {
                ...state,
                order: action.payload,
                orders: state.orders.map((item: ORDER) => item.id == action.payload.id ? action.payload : item),
                orderSuccess: true
            }
        case "order_ready_for_pickup":
            return {
                ...state,
                order: action.payload,
                orders: state.orders.map((item: ORDER) => item.id == action.payload.id ? action.payload : item),
                orderSuccess: true
            }
        case "order_update_from_websocket_Subscription":
            return {
                ...state,
                // order: action.payload,
                orders: state.orders.map((item: ORDER) => item.id == action.payload.id ? action.payload : item),
                orderSuccess: true
            }
        case "order_error":
            return {
                ...state,
                message: action.payload,
                orderError: true
            }
        case "order_reset":
            return {
                ...state,
                message: null,
                orderSuccess: false,
                orderError: false,
                order: {},
                // orders: [],
            }
        case "active_order_reset":
            return {
                ...state,
                message: null,
                orderSuccess: false,
                orderError: false,
                orders: [],
            }
        default: 
            return state
    }
}