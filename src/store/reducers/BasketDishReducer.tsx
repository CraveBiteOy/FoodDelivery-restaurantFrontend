import { ACTION, declaredStateBasket, declaredStateBasketDish,  } from "../../model/index.d"

const initialState = {
    basketDish: {},
    basketDishes: [],
    message: null,
    basketDishSuccess: false,
    basketDishError: false
}

export default (state:  declaredStateBasketDish = initialState, action: ACTION) => {
    switch (action.type) {
        case "basketDishes_by_basketId":
            return {
                ...state,
                basketDishes: action.payload,
                basketDishSuccess: true
            }
        case "basketDish_by_id":
            return {
                ...state,
                basketDish: action.payload,
                basketDishSuccess: true
            }
        case "basketDish_by_dish_and_basket":
            return {
                ...state,
                basketDish: action.payload,
                basketDishSuccess: true
            }
        case "baksetDish_add_dish_to_basket":
            return {
                ...state,
                basketDish: action.payload,
                basketDishes: [action.payload, ...state.basketDishes],
                basketDishSuccess: true
            }
        case "basketDish_remove_basketDish_from_basket":
            return {
                ...state,
                basketDish: {},
                basketDishes: state.basketDishes.filter(item => item.id != action.payload),
                basketDishSuccess: true
            }
        case "basketDish_update":
            return {
                ...state,
                basketDish: action.payload,
                basketDishes: state.basketDishes.map(item => item.id == action.payload.id ? action.payload : item),
                basketDishSuccess: true
            }
        case "basketDish_error":
            return {
                ...state,
                message: action.payload,
                basketDishError: true
            }
        case "basketDish_reset_one_item":
            return {
                ...state,
                message: null,
                basketDishSuccess: false,
                basketDishError: false,
                basketDish: {}
            }
        case "basketDish_reset_all":
            return {
                ...state,
                message: null,
                basketDishSuccess: false,
                basketDishError: false,
                basketDishes: [],
                baksetDish: {}
            }
        default: 
            return state
    }
}