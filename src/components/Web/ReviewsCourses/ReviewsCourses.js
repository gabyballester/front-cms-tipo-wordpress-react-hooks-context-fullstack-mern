import React from "react";
import { Row, Col, Card, Avatar } from "antd";
import AvatarPersona from "../../../assets/img/jpg/avatar-persona.jpg";

import "./ReviewsCourses.scss";

export default function ReviewsCourses() {
  return (
    <Row className="reviews-courses">
      <Row>
        <Col lg={4} />
        <Col lg={16} className="reviews-courses__title">
          <h2>
            Forma parte de los +35 mil estudiantes que estan aprendiendo con mis
            cursos
          </h2>
          </Col>
        <Col lg={4} />
      </Row>
      <Row>
        <Col lg={4} />
        <Col lg={16}>

          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Alumno 1"
                subtitle="Curso completado"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Alumno 2"
                subtitle="Curso completado"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Alumno 3"
                subtitle="Curso completado"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."
              />
            </Col>
          </Row>

          <Row className="row-cards">
            <Col md={8}>
              <CardReview
                name="Alumno 4"
                subtitle="Curso completado"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Alumno 5"
                subtitle="Curso completado"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."
              />
            </Col>
            <Col md={8}>
              <CardReview
                name="Alumno 6"
                subtitle="Alumna de Udemy"
                avatar={AvatarPersona}
                review="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dignissim ante sit amet sapien lacinia pulvinar. Praesent pellentesque, massa at."

              />
            </Col>
          </Row>
        </Col>
        <Col lg={4} />
      </Row>
    </Row>
  );
}

function CardReview(props) {
  const { name, subtitle, avatar, review } = props;
  const { Meta } = Card;

  return (
    <Card className="reviews-courses__card">
      <p>{review}</p>
      <Meta
        avatar={<Avatar src={avatar} />}
        title={name}
        description={subtitle}
      />
    </Card>
  );
}
