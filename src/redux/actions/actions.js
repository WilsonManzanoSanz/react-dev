import { ADD_USER, SHOW_USER, REMOVE_USER } from './../constants/constant';

export const showUser = (state) => ({
    type: SHOW_USER,
});

export const removeUser = () => ({
    type: REMOVE_USER,
});

export const addUser = user => ({
    type: ADD_USER,
    user: user
});

