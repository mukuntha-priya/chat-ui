import axios from 'axios';
import * as actionTypes from './actionTypes';
import {URL} from '../constants';
import React from "react";

export const getChatListForUser = (userId) => (dispatch) => {
    const getGroupsPromise = axios.get(URL.getGroupsForUser(userId));
    const getDirectMessagesPromise = axios.get(URL.getDirectMessagesForUser(userId));
    return Promise.all([getGroupsPromise, getDirectMessagesPromise]).then((response) => {
        const groupDetails = response[0].data;
        const directMessageDetails = response[1].data;
        const directMessages = directMessageDetails.map((dm) => {
            const messageDetails = mapToDirectMessage(dm.direct_message, userId);
            return {
                ...messageDetails,
                unreadCount: dm.unreadCount
            }
        });
        const groups = groupDetails.map((group) => {
            return {
                ...group.group,
                unreadCount: group.unreadCount
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
        dispatch({
            type: actionTypes.GET_DIRECT_MESSAGE_CHAT,
            payload: {
                id: directMessageId,
                messages
            }
        })
    });
};

export const openDirectMessage = (userId, userId2, history) => dispatch => {
    axios.get(URL.getOrCreateDirectMessage(userId, userId2)).then((response) => {
        const directMessage = response.data;
        dispatch({
            type: actionTypes.GET_OR_CREATE_DIRECT_MESSAGE,
            payload: mapToDirectMessage(directMessage, userId)
        });
        history.push(`/slack/direct-messages/${directMessage.id}`);
    });
};

export const getGroupChat = (groupId, userId) => (dispatch) => {
    return axios.get(URL.getGroupChat(groupId, userId)).then((response) => {
        let messages = response.data;
        dispatch({
            type: actionTypes.GET_GROUP_CHAT,
            payload: {
                id: groupId,
                messages
            }
        })
    });
};

const mapToDirectMessage = (dm, userId) => {
    return {
        id: dm.id,
        recipient: dm.user1.id === userId ? dm.user2 : dm.user1
    }
};

export const addMessage = (data) => (dispatch) => {
    return axios.post(URL.addMessage(), data).then((response) => {
        dispatch({
            type: actionTypes.ADD_MESSAGE,
            payload: response.data
        })
    });
};

export const createThread = (data) => {
    return axios.post(URL.createThread(), data);
};

export const addToThread = (data) => {
    return axios.post(URL.addToThread(), data);
};

export const createGroup = (groupName, users) => dispatch => {
    const userIds = users.map(u => u.value);
    return axios.post(URL.createGroup(), {
        name: groupName,
        users: userIds
    }).then((response) => {
        dispatch({
            type: actionTypes.CREATE_GROUP,
            payload: response.data
        });
    });
};

export const addUsersToGroup = (groupId, users) => dispatch => {
    const userIds = users.map(u => u.value);
    return axios.post(URL.addUsersToGroup(groupId), {
        users: userIds
    }).then((response) => {
        dispatch({
            type: actionTypes.UPDATE_GROUP,
            payload: response.data
        });
    });
};