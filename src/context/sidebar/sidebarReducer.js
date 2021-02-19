import { CHANGE_SIDEBAR_STATE } from "../types";

 const sidebarReducer = (state, action) => {
  switch(action.type){
    case CHANGE_SIDEBAR_STATE:
      return{
        ...state,
        showSidebarState: !action.payload
      }
    default:
      return state;
  }
}

export default sidebarReducer;