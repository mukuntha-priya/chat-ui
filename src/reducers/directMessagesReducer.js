import {GET_CHAT_LIST_FOR_USER} from "../actions/actionTypes";

export default function DirectMessagesReducer(state = [], action) {
    switch (action.type) {
        case GET_CHAT_LIST_FOR_USER:
            return action.payload.directMessages;
        default:
            return state;
    }
}