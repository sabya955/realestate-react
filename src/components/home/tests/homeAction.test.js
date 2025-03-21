import { setUsers, addMessage } from "../homeAction";
describe("homeAction", () => {
  it("shoult create an action to set users", () => {
    const users = [{ id: 1, name: "sabya" }];
    const expextedAction = {
      type: "SET_USERS",
      payload: users,
    };
    expect(setUsers(users)).toEqual(expextedAction);
  });
  it("should create an action to add message", () => {
    const message = "New messsage ";
    const expectedAction = {
      type: "ADD_MESSAGE",
      payload: message,
    };
    expect(addMessage(message)).toEqual(expectedAction);
  });
});
