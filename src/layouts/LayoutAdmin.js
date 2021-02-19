import './layoutStyles.scss';
import { Route, Switch } from 'react-router-dom';
import MenuTop from '../components/Admin/MenuTop';
import MenuSider from '../components/Admin/MenuSider';

export default function LayoutAdmin(props) {
  const { routes } = props;

  return (
    <div className="layout-admin">
      
      <div className="layout-admin__sidebar"><MenuSider/></div>

      <div className="layout-admin__header">
        <MenuTop/>
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
  )
}