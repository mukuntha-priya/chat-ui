import {GET_CHAT_LIST_FOR_USER, GET_DIRECT_MESSAGE_CHAT, GET_OR_CREATE_DIRECT_MESSAGE} from "../actions/actionTypes";

export default function DirectMessagesReducer(state = [], action) {
    switch (action.type) {
        case GET_CHAT_LIST_FOR_USER:
            return action.payload.directMessages;
        case GET_OR_CREATE_DIRECT_MESSAGE:
            const updatedDirectMessages = state.filter((dm) => dm.id !== action.payload.id);
            updatedDirectMessages.push(action.payload);
            return updatedDirectMessages;
        case GET_DIRECT_MESSAGE_CHAT:
            const dms = [].concat(state);
            const message = dms.filter((dm) => dm.id === action.payload.id)[0];
            message.unreadCount = 0;
            return dms;
        default:
            return state;
    }
}