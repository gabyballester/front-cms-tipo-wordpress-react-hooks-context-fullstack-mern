import React from "react";
import { Row, Col } from "antd";

import "./MainBanner.scss";

export default function MainBanner() {
  return (
    <div className="main-banner">
      <div className="main-banner__dark" />
      <Row>
        <Col lg={4} />
        <Col lg={16}>
          <h2>
            Montando un CMS con React y Node al estilo wordpress
        </h2>
          <h3>
            Aprendiendo a desarrollar en Stack MERN{" "}
            <br />
          Mongo, Express, React, Node
        </h3>
        </Col>
        <Col lg={4} />
      </Row>
    </div>
  );
}
