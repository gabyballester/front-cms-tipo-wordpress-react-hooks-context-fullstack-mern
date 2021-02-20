// import { useContext, useState } from "react";
import { Route, Switch } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
// import SidebarContext from "../context/sidebar/sidebarContext";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  
//obtengo el estado del estate del menu
  // const sidebarContext = useContext(SidebarContext);
  // const { showSidebar } = sidebarContext;
  
  return (
    <div className="layout">
      <MenuSider/>
      <div className="main">
        <div className="header"><MenuTop/></div>
        <div className="content">
          <LoadRoutes routes={routes} />
        </div>
        <div className="footer">Footer</div>
      </div>
    </div>
  );
} 
 
function LoadRoutes({ routes }) {
  return (
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.component}
        />
      ))}
    </Switch>
  )
}