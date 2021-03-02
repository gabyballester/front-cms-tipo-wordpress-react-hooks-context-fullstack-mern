import { Link } from "react-router-dom";
import { List, Button, Modal, notification } from "antd";
import * as Icon from "@ant-design/icons";

import "./PostsList.scss";

const { confirm } = Modal;

export default function PostsList(props) {
  const { posts } = props

  return (
    <div className="posts-list">
      <List
        dataSource={posts.docs}
        renderItem={post =>
          <Post post={post} />
        }
      />
    </div>
  )
}

function Post(props) {
  const { post } = props;

  return (
    <List.Item
      actions={[
        <Link to={`/blog/${post.url}`} target="_blank">
          <Button type="primary">
            <Icon.EyeOutlined />
          </Button>
        </Link>,
        <Button type="primary" onClick={() => console.log('editar')}>
          <Icon.EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => console.log('borrar')}>
          <Icon.DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={post.title} />
    </List.Item>
  )
}