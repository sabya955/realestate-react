const initialAuthState ={
    isLoggedIn:!! localStorage.getItem('token'),
    user:JSON.parse(localStorage.getItem('user')) || null,
};

const authReducer = (state = initialAuthState,action)=>{
    switch(action.type){
        case 'LOGIN':
            return{...state,isLoggedIn:true,user:action.payload};
            case 'LOGOUT':
                return{...state,isLoggedIn:false,user:null};
            default:
        return state
    }
}
export default authReducer;