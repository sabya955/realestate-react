const initialState = {
    users:[],
    message:[],
}
const userReducer = (state = initialState,action)=>{
    switch(action.type){
        case "SET_USERS":
            return {...state,users:action.payload};
            case "ADD_MESSAGE":
                return { ...state, message: [...state.message, action.payload] };
                default:
                    return state
    }
}
export default userReducer