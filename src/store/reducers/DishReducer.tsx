import { ACTION, declaredStateDish,  } from "../../model/index.d"

const initialState = {
    dish: {},
    dishes: [],
    message: null,
    dishSuccess: false,
    dishError: false
}

export default (state:  declaredStateDish= initialState, action: ACTION) => {
    switch (action.type) {
        case "dishes_by_restaurant":
            return {
                ...state,
                dishes: action.payload,
                dishSuccess: true
            }
       
        case "dish_by_id":
            return {
                ...state,
                dish: action.payload,
                dishSuccess: true
            }
        case "dish_error":
            return {
                ...state,
                message: action.payload,
                dishError: true
            }
        case "dish_reset":
            return {
                ...state,
                message: null,
                dishSuccess: false,
                dishError: false,
                dish: {},
                dishes: [],
            }
        default: 
            return state
    }
}