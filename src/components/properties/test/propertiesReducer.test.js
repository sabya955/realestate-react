
import propertiesReducer from '../propertiesReducer';
const initialState = {
    properties: [],
    likedProperties: [],
};

describe('propertiesReducer', () => {
    it('should return the initial state',()=>{
        expect(propertiesReducer(undefined,{})).toEqual(initialState);
    });
    it('should handle SET_PROPERTIES',()=>{
        const action = {
            type: 'SET_PROPERTIES',
            payload: [{id: 1, name: 'Property 1'}]
        }
        expect(propertiesReducer(initialState,action)).toEqual({
            ...initialState,
            properties: action.payload
        })
    })
    it("should add properties",()=>{
        const priviouseState = {
            ...initialState,
            properties: [{id: 1, name: 'Property 1'}]
        }
        const action = {
            type: 'ADD_PROPERTIES',
            payload: [{id: 2, name: 'Property 2'}]
        }
        expect(propertiesReducer(priviouseState,action)).toEqual({
            ...priviouseState,
            properties: [...priviouseState.properties, action.payload]
        })
    })
    it('should update property state',()=>{
        const priviouseState = {
            properties: [{id: 1, name: 'Property 1'}]
        }
        const action = {
            type: 'UPDATE_PROPERTY_STATE',
            payload: {id: 1, name: 'New Property 1'}
        }
        expect(propertiesReducer(priviouseState,action)).toEqual({
            ...priviouseState,
            properties: [{id: 1, name: 'New Property 1'}]
        })
    })
    it('should toggle like',()=>{
        const priviouseState = {
            properties :[],
            likedProperties:[1]
        }
        const action={
            type:"TOGGLE_LIKE",
            payload:1
        };
        expect(propertiesReducer(priviouseState,action)).toEqual(initialState)
    })
    it("should set all like properties",()=>{

        const action ={
            type:"SET_LIKE_PROPERTIES",
            payload:[1,2,3],
        }
        expect(propertiesReducer(initialState,action)).toEqual({
            ...initialState,
            likedProperties:[1,2,3]
        })
    })
    
})