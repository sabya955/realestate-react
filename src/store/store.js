import {createStore,combineReducers} from "redux";
import authReducer from '../components/header/authReducer'
import userReducer from '../components/check-users/userReducer'
import propertiesReducer from "../components/properties/propertiesReducer";
import homeReducer from "../components/properties/propertiesReducer"
const rootReducer = combineReducers({
    auth:authReducer,
    users:userReducer,
    properties:propertiesReducer,
    home:homeReducer,
})
const store = createStore(rootReducer)
export default store 