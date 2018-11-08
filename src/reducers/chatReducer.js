import {GET_DIRECT_MESSAGE_CHAT, GET_GROUP_CHAT, ADD_MESSAGE} from "../actions/actionTypes";

export default function ChatReducer(state = [], action) {
    switch (action.type) {
        case GET_DIRECT_MESSAGE_CHAT:
            return action.payload;
        case GET_GROUP_CHAT:
            return action.payload;
        case ADD_MESSAGE:
            return [].concat(state, action.payload);
        default:
            return state;
    }
}