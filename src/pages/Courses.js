import { Fragment, useState, useEffect } from "react";
import { Row, Col, Spin, notification } from "antd";
import { Helmet } from "react-helmet";
import { getCoursesApi } from "../api/course";
import PresentationCourses from "../components/Web/Courses/PresentationCourses";
import CoursesList from "../components/Web/Courses/CoursesList";

export default function Courses() {
  const [courses, setCourses] = useState(null);

  useEffect(() => {
    getCoursesApi()
      .then(response => {
        if (response?.code !== 200) {
          notification["warning"]({
            message: response.message
          });
        } else {
          setCourses(response.courses);
        }
      })
      .catch(() => {
        notification["error"]({
          message: "Error del servidor intentlo más tarde."
        });
      });
  }, []);

  return (
    <Fragment>
      <Helmet>
        <title> Cursos | Web stack MERN | Gabriel Ballester</title>
        <meta
          name="description"
          content="Home | Web sobre programación"
          data-react-helmet="true"
        />
      </Helmet>
      <Row>
        <Col md={3} />
        <Col md={18}>
          <PresentationCourses />
          {!courses ? (
            <Spin
              tip="Cargando cursos"
              style={{ textAlign: "center", width: "100%", padding: "20px" }}
            />
          ) : (
              <CoursesList courses={courses} />
            )}
        </Col>
        <Col md={3} />
      </Row>

    </Fragment>
  )
}