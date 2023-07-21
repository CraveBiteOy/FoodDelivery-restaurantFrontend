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
        case "orders_completed_status_by_Customer":
            return {
                ...state,
                orders: action.payload,
                orderSuccess: true 
            }
        case "orders_by_Customer":
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
         case "order_update_from_websocket_Subscription":
            return {
                ...state,
                // order: action.payload,
                orders: state.orders.map((item: ORDER) => item.id == action.payload.id ? action.payload : item),
                orderSuccess: true
            }
        case "order_create":
            return {
                ...state,
                order: action.payload,
                orders: [action.payload, ...state.orders],
                orderSuccess: true
            }
        case "reordering_create":
            return {
                ...state,
                order: action.payload,
                orders: [action.payload, ...state.orders],
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