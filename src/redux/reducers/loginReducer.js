import { ADD_USER, SHOW_USER, REMOVE_USER } from './../constants/constant';

let initialUser = {email:'', displayName:'', photoURL:'', uid:''};

const authReducer = (state = initialUser, action) => {
    switch (action.type){
        case ADD_USER:
        return { ...state, ...  action.user };
        case SHOW_USER:
        return state;
        case REMOVE_USER:
        return  {email:'', displayName:'', photoURL:'', uid:''};
        default:
        return state
    }
}

export default authReducer