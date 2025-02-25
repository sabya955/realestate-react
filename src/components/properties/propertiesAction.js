 export const setProperties=(properties)=>({
    type:'SET_PROPERTIES',
    payload:properties,
 })
export const addProperty =(property)=>({
  type:"ADD_PROPERTY",
  payload:property,
})
export const updatePropertyState = ((property)=>{
  console.log("property is",property);
  return {
      type:"UPDATE_STATE_PROPERTY",
      payload:property
    }
})
export const toggleLike  = (productId)=>({
  type:"TOGGLE_LIKE",
  payload:productId,
})
export const setLikeProperties = (productId)=>({
  type:"SET_LIKE_PROPERTIES",
  payload:productId,
})