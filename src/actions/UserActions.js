import * as actionTypes from "./actionTypes";
import axios from 'axios';
import {URL} from '../constants';

export const selectUser = (selectedUser) => dispatch => {
    dispatch({
        type: actionTypes.SET_USER,
        payload: {
            id: selectedUser.value,
            name: selectedUser.label
        }
    });
};

export const fetchAllUsers = () => dispatch => {
    return axios.get(URL.getAllUsers()).then((response) => {
        const allUsers = response.data;
        dispatch({
            type: actionTypes.GET_ALL_USERS,
            payload: allUsers.map((user) => {
                return {label: user.name, value: user.id};
            })
        });
    });
};
