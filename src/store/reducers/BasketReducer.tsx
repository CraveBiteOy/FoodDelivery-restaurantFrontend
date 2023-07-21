import { ACTION, declaredStateBasket,  } from "../../model/index.d"

const initialState = {
    basket: {},
    message: null,
    basketSuccess: false,
    basketError: false
}

export default (state:  declaredStateBasket = initialState, action: ACTION) => {
    switch (action.type) {
        case "basket_by_authenticatedUser_and_restaurant":
            return {
                ...state,
                basket: action.payload,
                basketSuccess: true
            }
        case "basket_by_id":
            return {
                ...state,
                basket: action.payload,
                basketSuccess: true
            }
        case "basket_by_customer_and_restaurant":
            return {
                ...state,
                basket: action.payload,
                basketSuccess: true
            }
        // case "add_dish_to_basket":
        //     return {
        //         ...state,
        //         basket: action.payload,
        //         basketSuccess: true
        //     }
        // case "remove_basketDish_from_basket":
        //     return {
        //         ...state,
        //         basket: action.payload,
        //         basketSuccess: true
        //     }
        case "basket_remove_all_basketDishes_from_basket":
            return {
                ...state,
                basket: action.payload,
                basketSuccess: true
            }
        case "basket_error":
            return {
                ...state,
                message: action.payload,
                basketError: true
            }
        case "basket_reset":
            return {
                ...state,
                message: null,
                basketSuccess: false,
                basketError: false,
                basket: {}
            }
        default: 
            return state
    }
}