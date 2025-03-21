import {login, logout} from "../authAction"
describe("AuthAction", ()=>{
    describe("login action",()=>{
        it("should store token and user in local storage and return correct action",()=>{
            const user ={token:"12345",name:"sabya"}
            const result = login(user);
            expect(localStorage.getItem("token")).toEqual(user.token);
            expect(JSON.parse(localStorage.getItem("user"))).toEqual(user);
            expect(result).toEqual({ type: "LOGIN", payload: user });
        })
    })
    describe("logout action", () => {
        it("should remove token and user from localStorage and return correct action", () => {
          localStorage.setItem("token", "12345");
          localStorage.setItem("user", JSON.stringify({ name: "John Doe" }));
          const result = logout();
          expect(localStorage.getItem("token")).toBeNull();
          expect(localStorage.getItem("user")).toBeNull();
          expect(result).toEqual({ type: "LOGOUT" });
        });
      });
})