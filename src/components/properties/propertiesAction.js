 export const setProperties=(properties)=>({
    type:'SET_PROPERTIES',
    payload:properties,
 })
 export const setSelectProduct = (product)=>({
   type: "SET_SELECT_PRODUCT",
   payload:product,
 })
 export const clearSelectProduct = ()=>({
   type:"CLEAR_SELECT_PRODUCT",
 })
export const addProperty =(property)=>({
  type:"ADD_PROPERTY",
  payload:property,
})
export const deleteProperty = (id) => ({
  type: "DELETE_PROPERTY",
  payload: id,
});