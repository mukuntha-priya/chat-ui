import axios from 'axios';
import * as actionTypes from './actionTypes';
import {URL} from '../constants';

export const getChatListForUser = (userId) => (dispatch) => {
    const getGroupsPromise = axios.get(URL.getGroupsForUser(userId));
    const getDirectMessagesPromise = axios.get(URL.getDirectMessagesForUser(userId));
    return Promise.all([getGroupsPromise, getDirectMessagesPromise]).then((response) => {
        const groups = response[0].data;
        const directMessages = response[1].data.map((dm) => {
            return {
                id: dm.id,
                recipient: dm.user1.id === userId ? dm.user2 : dm.user1
            };
        });
        dispatch({
            type: actionTypes.GET_CHAT_LIST_FOR_USER,
            payload: {
                groups,
                directMessages
            }
        });
    })
};

export const getDirectMessageChat = (directMessageId, userId) => (dispatch) => {
    return axios.get(URL.getDirectMessageChat(directMessageId, userId)).then((response) => {
        let messages = response.data;
        messages = mapMessages(messages, userId);
        dispatch({
            type: actionTypes.GET_DIRECT_MESSAGE_CHAT,
            payload: messages
        })
    });
};

export const getGroupChat = (groupId, userId) => (dispatch) => {
    return axios.get(URL.getGroupChat(groupId, userId)).then((response) => {
        let messages = response.data;
        messages = mapMessages(messages, userId);
        dispatch({
            type: actionTypes.GET_GROUP_CHAT,
            payload: messages
        })
    });
};

export const addMessage = (content, userId, directMessageId, groupId) => (dispatch) => {
    return axios.post(URL.addMessage(), {
        userId,
        directMessageId,
        groupId,
        content
    }).then((response) => {
        let message = mapMessages([response.data], userId);
        dispatch({
            type: actionTypes.ADD_MESSAGE,
            payload: message
        })
    });
};

function mapMessages(messages, userId) {
    return messages.map((message) => {
        return {
            "type": message.sender.id === userId ? 1 : 0,
            "image": "anonymous.jpg",
            "text": `${message.sender.name} at ${message.created_at}: \n ${message.content}`
        };
    });
}