const initialState = {
  properties: [],
  likedProperties: [],

};
const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROPERTIES":
      return { ...state, properties: action.payload };
    case "ADD_PROPERTIES":
      return { ...state, properties: [...state.properties, action.payload] };
    case "UPDATE_PROPERTY_STATE":
      console.log("update property is",action.payload)
      return {
        ...state,
        properties: state.properties.map((prop) =>
          prop.id === action.payload.id ? action.payload : prop
        ),
      };
      case "TOGGLE_LIKE":
        return{
          ...state,
          likedProperties:state.likedProperties.includes(action.payload)
          ? state.likedProperties.filter((id)=>id!==action.payload)
          :[...state.likedProperties,action.payload],
        }
        case "SET_LIKE_PROPERTIES":
          return {
            ...state,
            likedProperties:action.payload,
          }
    default:
      return state;
  }
};
export default propertiesReducer;
