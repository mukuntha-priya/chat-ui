import {GET_CHAT_LIST_FOR_USER, GET_OR_CREATE_DIRECT_MESSAGE} from "../actions/actionTypes";

export default function DirectMessagesReducer(state = [], action) {
    switch (action.type) {
        case GET_CHAT_LIST_FOR_USER:
            return action.payload.directMessages;
        case GET_OR_CREATE_DIRECT_MESSAGE:
            const updatedDirectMessages = state.filter((dm) => dm.id !== action.payload.id);
            updatedDirectMessages.push(action.payload);
            return updatedDirectMessages;
        default:
            return state;
    }
}