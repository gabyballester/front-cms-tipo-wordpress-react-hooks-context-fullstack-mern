import { Link } from "react-router-dom";
import { List, Button, Modal, notification } from "antd";
import * as Icon from "@ant-design/icons";
import { getAccessTokenApi } from "../../../../api/auth";
import { deletePostApi } from "../../../../api/post";

import "./PostsList.scss";

const { confirm } = Modal;

export default function PostsList(props) {
  const { posts, setReloadPosts } = props;

  const deletePost = post => {
    const accessToken = getAccessTokenApi();
    
    confirm({
      title: "Eliminando post",
      content: `¿Estas segurod de eliminar el post ${post.title}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(accessToken, post._id)
          .then(response => {
            const typeNotification =
              response.code === 200 ? "success" : "warning";
            notification[typeNotification]({
              message: response.message
            });
            setReloadPosts(true);
          })
          .catch(() => {
            notification["error"]({
              message: "Error del servidor."
            });
          });
      }
    });
  };

  return (
    <div className="posts-list">
      <List
        dataSource={posts.docs}
        renderItem={post =>
          <Post post={post} deletePost={deletePost} />
        }
      />
    </div>
  )
}

function Post(props) {
  const { post, deletePost } = props;

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
        <Button type="danger" onClick={() => deletePost(post)}>
          <Icon.DeleteOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={post.title} className=""/>
    </List.Item>
  )
}