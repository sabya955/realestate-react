
import userReducer from "../homeReducer";

describe("User Reducer", () => {
  it("should return the initial state", () => {
    const initialState = {
      users: [],
      message: [],
    };
    expect(userReducer(undefined, {})).toEqual(initialState);
  });
  it("should handle SET_USERS", () => {
    const action = {
      type: "SET_USERS",
      payload: [{ id: 1, name: "John Doe" }],
    };
    const expectedState = {
      message: [],
      users: [{ id: 1, name: "John Doe" }],
    };
    expect(userReducer(undefined, action)).toEqual(expectedState);
  });
  it("should handle ADD_MESSAGE", () => {
    const action = {
      type: "ADD_MESSAGE",
      payload: "Hello, World!",
    };

    const expectedState = {
      users: [],
      message: ["Hello, World!"],
    };

    expect(userReducer(undefined, action)).toEqual(expectedState);
  });

  it("should return the current state for an unknown action", () => {
    const currentState = {
      users: [],
      message: ["Existing message"],
    };

    const action = {
      type: "UNKNOWN_ACTION",
    };

    expect(userReducer(currentState, action)).toEqual(currentState);
  });
});
