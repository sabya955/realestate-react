const initialState = {
  properties: [],
  selectProduct: null,
};
const propertiesReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_PROPERTIES":
      console.log("inside properties", action);
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
    case "SET_SELECT_PRODUCT":
      return { ...state, selectProduct: action.payload };
    case "CLEAR_SELECT_PRODUCT":
      return { ...state, selectProduct: null };
    default:
      return state;
  }
};
export default propertiesReducer;
