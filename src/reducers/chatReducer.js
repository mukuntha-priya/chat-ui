import {GET_DIRECT_MESSAGE_CHAT, GET_GROUP_CHAT, ADD_MESSAGE} from "../actions/actionTypes";

export default function ChatReducer(state = {}, action) {
    switch (action.type) {
        case GET_DIRECT_MESSAGE_CHAT:
            return {
                type: 'DIRECT_MESSAGE',
                id: +action.payload.id,
                messages: action.payload.messages
            };
        case GET_GROUP_CHAT:
            return {
                type: 'GROUP',
                id: +action.payload.id,
                messages: action.payload.messages
            };
        case ADD_MESSAGE:
            let messages = [].concat(state.messages);
            messages.push(action.payload);
            return {
                ...state,
                messages
            };
        default:
            return state;
    }
}