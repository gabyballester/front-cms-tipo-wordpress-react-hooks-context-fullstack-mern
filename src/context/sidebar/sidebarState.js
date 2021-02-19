import React, { useReducer } from "react";

import sidebarContext from "./sidebarContext";
import sidebarReducer from "./sidebarReducer";
import { CHANGE_SIDEBAR_STATE } from "../types";

const SidebarState = (props) => {
  const initialState = {
    showSidebarState: true
  };

  // dispatch para ejecutar las acciones
  const [state, dispatch] = useReducer(sidebarReducer, initialState);

  const changeSidebarState = () => {
    dispatch({
      type: CHANGE_SIDEBAR_STATE,
      payload: state.showSidebarState
    })
  }

  return (
    <sidebarContext.Provider
      value={{
        showSidebar: state.showSidebarState,
        changeSidebarState
      }}
    >
      {props.children}
    </sidebarContext.Provider>
  );
};

export default SidebarState;
