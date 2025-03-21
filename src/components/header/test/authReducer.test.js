import authReducer from "../authReducer"
describe ("Auth reducer",()=>{
    const initialState = {
        isLoggedIn: !! localStorage.getItem("token"),
        user:JSON.parse(localStorage.getItem("user"))|| null 
    }
    it("should return initial state",()=>{
        expect(authReducer(undefined,{})).toEqual(initialState)
    })
    it("should handle LOGIN",()=>{
        const user = {id:1,name:"test user"}
        const action = {type:"LOGIN",payload:user}
        const expectedState = {isLoggedIn: true,user}
        expect(authReducer(initialState,action)).toEqual(expectedState)
    })
    it("should handle LOGOUT",()=>{
        const action = {type:"LOGOUT"}
        const expectedState = {isLoggedIn: false,user: null}
        expect(authReducer(initialState,action)).toEqual(expectedState)
    })
})