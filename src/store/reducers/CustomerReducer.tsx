import { ACTION, declaredStateCustomer,  } from "../../model/index.d"

const initialState = {
    customer: {},
    message: null,
    customerSuccess: false,
    customerError: false
}

export default (state:  declaredStateCustomer = initialState, action: ACTION) => {
    switch (action.type) {
        case "authenticated_customer":
            return {
                ...state,
                customer: action.payload,
                customerSuccess: true
            }
        case "customer_by_id":
            return {
                ...state,
                customer: action.payload,
                customerSuccess: true
            }
        case "customer_error":
            return {
                ...state,
                message: action.payload,
                customerError: true
            }
        case "customer_reset":
            return {
                ...state,
                message: null,
                customerSuccess: false,
                customerError: false,
                customer: {}
            }
        default: 
            return state
    }
}