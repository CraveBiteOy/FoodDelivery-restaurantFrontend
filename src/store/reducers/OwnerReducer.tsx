import { ACTION, declaredStateOwner,  } from "../../model/index.d"

const initialState = {
    owner: {},
    message: null,
    ownerSuccess: false,
    ownerError: false,
}

export default (state:  declaredStateOwner = initialState, action: ACTION) => {
    switch (action.type) {
        case "owner_by_authenticatedUser":
            return {
                ...state,
                owner: action.payload,
                ownerSuccess: true
            }
        case "owner_by_id":
            return {
                ...state,
                owner: action.payload,
                ownerSuccess: true
            }
        case "owner_error":
            return {
                ...state,
                message: action.payload,
                ownerError: true
            }
        case "owner_reset":
            return {
                ...state,
                message: null,
                ownerSuccess: false,
                ownerError: false,
                owner: {}
            }
        default: 
            return state
    }
}