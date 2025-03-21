import {
  setProperties,
  addProperty,
  toggleLike,
  setLikeProperties,
  updatePropertyState,
} from "../propertiesAction";

describe("propertiesAction", () => {
  it("should create an action to set properties", () => {
    const properties = [
      { id: 1, name: "Property 1" },
      { id: 2, name: "Property 2" },
    ];
    const expectAction = {
      type: "SET_PROPERTIES",
      payload: properties,
    };
    expect(setProperties(properties)).toEqual(expectAction);
  });
  it("should create  an action to add a property", () => {
    const property = { id: 3, name: "Property 3" };
    const expectAction = {
      type: "ADD_PROPERTY",
      payload: property,
    };
    expect(addProperty(property)).toEqual(expectAction);
  });
  it("should create an action to update a property state", () => {
    const property = [{ id: 1, state: "published" }];
    const expectAction = {
      type: "UPDATE_STATE_PROPERTY",
      payload: property,
    };
    expect(updatePropertyState(property)).toEqual(expectAction);
  });
  it("should create an action to add a like for a property", () => {
    const productId = 1;
    const expectAction = {
      type: "TOGGLE_LIKE",
      payload: productId,
    };
    expect(toggleLike(productId)).toEqual(expectAction);
  });
  it("should create an action to set like properties", () => {
    const productId = 2;
    const expectAction = {
      type: "SET_LIKE_PROPERTIES",
      payload: productId,
    };
    expect(setLikeProperties(productId)).toEqual(expectAction);
  });
});
