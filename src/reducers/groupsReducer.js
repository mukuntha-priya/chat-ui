import {GET_CHAT_LIST_FOR_USER, CREATE_GROUP, UPDATE_GROUP, GET_GROUP_CHAT} from "../actions/actionTypes";

export default function GroupsReducer(state = [], action) {
    switch (action.type) {
        case GET_CHAT_LIST_FOR_USER:
            return action.payload.groups;
        case CREATE_GROUP:
            const groups = [].concat(state);
            groups.push(action.payload);
            return groups;
        case UPDATE_GROUP:
            const updatedGroups = state.filter((group) => group.id !== action.payload.id);
            updatedGroups.push(action.payload);
            return updatedGroups;
        case GET_GROUP_CHAT:
            const allGroups = [].concat(state);
            const group = allGroups.filter((group) => group.id === +action.payload.id)[0];
            group.unreadCount = 0;
            return allGroups;
        default:
            return state;
    }
}