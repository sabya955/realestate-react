const initialState = {
  users: [],
};
const userReduer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER_ROLE":
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id
            ? { ...user, role: action.payload.role }
            : user
        ),
      };
    default:
      return state;
  }
};
export default userReduer;
