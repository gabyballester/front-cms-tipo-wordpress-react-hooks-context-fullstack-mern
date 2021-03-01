import { Row, Col, } from "antd";
import * as Icon from '@ant-design/icons';

import "./NavigationFooter.scss";

export default function NavigationFooter() {
  return (
    <Row className="navigation-footer">
      <Row>
        <Col>
          <h3>Navegación</h3>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          <RenderListLeft />
        </Col>
        <Col md={12}>
          <RenderListRight />
        </Col>
      </Row>
    </Row>
  );
}

function RenderListLeft() {
  return (
    <ul>
      <li>
        <a href="#">
          <Icon.BookOutlined /> Cursos Online
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.CodeOutlined /> Desarrollo Web
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.DatabaseOutlined /> Base de Datos
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.RightOutlined /> Política de Privacidad
        </a>
      </li>
    </ul>
  )
}

function RenderListRight() {
  return (
    <ul>
      <li>
        <a href="#">
          <Icon.HddOutlined /> Sistemas / Servidores
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.AppstoreOutlined /> CMS
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.UserOutlined /> Portfolio
        </a>
      </li>
      <li>
        <a href="#">
          <Icon.RightOutlined /> Política de Cookies
        </a>
      </li>
    </ul>
  )
}