import "./layoutStyles.scss";
import { Route, Switch } from "react-router-dom";

export default function LayoutBasic(props) {
  const { routes } = props;

  return (
    <div className="layout">
      <div className="sidebar">Basic Sidebar</div>
      <div className="main">
        <div className="header">basic header</div>
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
  );
}
