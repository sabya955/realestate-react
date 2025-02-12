export const login = (user) =>{
    localStorage.setItem("token",user.token);
    localStorage.setItem("user",JSON.stringify(user))
    return {type:"LOGIN",payload:user}
}   
export const logout = ()=>{
    localStorage.removeItem("token")
    localStorage.removeItem("user")
    return{type:"LOGOUT"};
}