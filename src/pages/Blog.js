import React from 'react'
import { Row, Col } from 'antd';
import { useParams } from "react-router-dom";
import PostsListWeb from "../components/Web/Blog/PostsListWeb";

export default function Blog(props) {
  const { location, history } = props;
  const { url } = useParams();
  console.log(url);

  return (
    <Row>
      <Col md={4} />
      <Col md={16}>
        {url ? (
          "postinfo"
          // <PostInfo url={url} />
        ) : (
          <PostsListWeb location={location} history={history} />
        )}
      </Col>
      <Col md={4} />
    </Row>
  )
}
