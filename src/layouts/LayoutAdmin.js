// import { useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";
import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;
  const { user, isLoading } = useAuth();

  if (!user && !isLoading) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }
  if (user && !isLoading) {
    return (
      <div className="layout-admin">
        <MenuSider />
        <div className="layout-admin-main">
          <div className="main-header"><MenuTop /></div>
          <div className="main-content">
            <LoadRoutes routes={routes} />
          </div>
          <div className="main-footer">Gabriel Ballester</div>
        </div>
      </div>
    );
  }

  return null;
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