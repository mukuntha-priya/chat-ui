import {GET_CHAT_LIST_FOR_USER, CREATE_GROUP, UPDATE_GROUP} from "../actions/actionTypes";

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
        default:
            return state;
    }
}