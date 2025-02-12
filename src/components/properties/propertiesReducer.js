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
    case "DELETE PROPERTIES":
      return {
        ...state,
        properties: state.properties.filter(
          (prop) => prop.id !== action.payload
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
