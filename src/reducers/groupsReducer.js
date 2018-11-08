import {GET_CHAT_LIST_FOR_USER} from "../actions/actionTypes";

export default function GroupsReducer(state = [], action) {
    switch (action.type) {
        case GET_CHAT_LIST_FOR_USER:
            return action.payload.groups;
        default:
            return state;
    }
}