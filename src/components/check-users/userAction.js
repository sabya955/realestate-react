
export const setUsers = (users) => {
    console.log("Dispatching setUsers with:", users);
    return {
      type: "SET_USERS",
      payload: users,
    };
  };
  
export const updateUserRole =(id,role)=>({
    type:"UPDATE_USER_ROLE",
    payload:{id,role},
})
