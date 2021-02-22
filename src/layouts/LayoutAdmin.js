// import { useContext, useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import MenuTop from "../components/Admin/MenuTop";
import MenuSider from "../components/Admin/MenuSider";
import AdminSignIn from "../pages/Admin/SignIn";

import "./LayoutAdmin.scss";

export default function LayoutAdmin(props) {
  const { routes } = props;

  const user = null;

  if (!user) {
    return (
      <>
        <Route path="/admin/login" component={AdminSignIn} />
        <Redirect to="/admin/login" />
      </>
    );
  }

  return (
    <div className="layout">
      <MenuSider />
      <div className="main">
        <div className="header"><MenuTop /></div>
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