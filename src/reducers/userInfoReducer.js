import {GET_ALL_USERS, SET_USER} from "../actions/actionTypes";

export default function UserInfoReducer(state = {
    user: null,
    allUsers: []
}, action) {
    switch (action.type) {
        case GET_ALL_USERS:
            return {
                ...state,
                allUsers: action.payload
            };
        case SET_USER:
            return {
                ...state,
                user: action.payload
            };
        default:
            return state;
    }
}