import {setUsers,updateUserRole} from "../userAction"
describe("Users Action",()=>{
    it("should create an action to set user",()=>{
        const users = [
            {id:1,name:"sabyasachi"},{id:2,name:"sipuna"}
        ]
        const expectedAction = {
            type:"SET_USERS",
            payload:users
        }
        expect(setUsers(users)).toEqual(expectedAction)
    })
    it("should create an action to update user role",()=>{
        const id = 2
        const role = "admin"
        const expectedAction={
            type:"UPDATE_USER_ROLE",
            payload:{id,role}
        }
        expect(updateUserRole(id,role)).toEqual(expectedAction)
    })
})