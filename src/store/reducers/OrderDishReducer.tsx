import { ACTION, declaredStateOrderDish} from "../../model/index.d"

const initialState = {
    orderDish: {},
    orderDishes: [],
    message: null,
    orderDishSuccess: false,
    orderDishError: false
}

export default (state:  declaredStateOrderDish= initialState, action: ACTION) => {
    switch (action.type) {
        case "orderDishes_by_order":
            return {
                ...state,
                orderDishes: action.payload,
                orderDishSuccess: true 
            }
        case "orderDish_by_id":
            return {
                ...state,
                orderDish: action.payload,
                orderDishSuccess: true
            }
        case "orderDish_error":
            return {
                ...state,
                message: action.payload,
                orderDishError: true
            }
        case "orderDishes_reset":
            return {
                ...state,
                message: null,
                orderDishSuccess: false,
                orderDishError: false,
                orderDish: {},
                orderDishes: [],
            }
        case "orderDish_item_reset":
            return {
                ...state,
                message: null,
                orderDishSuccess: false,
                orderDishError: false,
                orderDish: {}
            }
        default: 
            return state
    }
}