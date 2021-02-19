import { useContext } from "react";
import "./layoutStyles.scss";
import { Route, Switch } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import SidebarContext from "../context/sidebar/sidebarContext";

export default function LayoutAdmin(props) {
  const { routes } = props;
  //obtengo el estado del estate del menu
  const sidebarContext = useContext(SidebarContext);
  const { showSidebar } = sidebarContext;
  
  return (
    // <div className={showSidebar ? "layout-admin": "layout-admin-closed"}>
    <div className={showSidebar ? "layout-admin": "layout-admin-closed"}>
      {showSidebar ? (
        <div className="layout-admin__sidebar">
          <MenuSider />
        </div>
      ) : null}

      <div className="layout-admin__header">
        <MenuTop />
      </div>
      <div className="layout-admin__content">
        <LoadRoutes routes={routes} />
      </div>
      <div className="layout-admin__footer">Footer</div>
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
  );
}
