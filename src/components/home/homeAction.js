export const setUsers = (users)=>({
    type:"SER_USERS",
    paylode:users,
})
export const addMessage = (message) => ({
    type: "ADD_MESSAGE",
    payload: message,
  });