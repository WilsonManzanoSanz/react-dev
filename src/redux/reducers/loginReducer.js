import { ADD_USER, SHOW_USER, REMOVE_USER } from './../constants/constant';

let initialUser = {email:'', name:'', photo_url:'', id:'', api_token:''};

const authReducer = (state = initialUser, action) => {
    switch (action.type){
        case ADD_USER:
        return { ...state, ...  action.user };
        case SHOW_USER:
        return state;
        case REMOVE_USER:
        console.log({...state, email:'', name:'', photo_url:'', id:'', api_token:''});
        return  {...state, email:'', name:'', photo_url:'', id:'', api_token:''};
        default:
        return state
    }
}

export default authReducer;