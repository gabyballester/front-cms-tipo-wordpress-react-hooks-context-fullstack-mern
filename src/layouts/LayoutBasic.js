import {Fragment} from "react";
import { Route, Switch } from "react-router-dom";
import { Row, Col } from "antd";
import MenuTop from "../components/Web/MenuTop";
import Footer from "../components/Web/Footer";

export default function LayoutBasic(props) {
  const { routes } = props;
  
  return (
    <Fragment>
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <MenuTop />
        </Col>
        <Col lg={4} />
      </Row>
      <LoadRoutes routes={routes} />
      <Footer> Gabriel Ballester </Footer>
    </Fragment>
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
