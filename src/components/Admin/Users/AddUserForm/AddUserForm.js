import { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import * as Icon from '@ant-design/icons';
import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";
import { roles } from "../../../../utils/constants";

import "./AddUserForm.scss";

export default function EditUserForm(props) {
  const { setIsVisibleModal, setReloadUsers } = props;
  const [userData, setUserData] = useState({});

  const addUser = event => {
    event.preventDefault();

    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification.error({
        message: "Todos los campos son obligatorios."
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification.error({
        message: "Las contraseñas tienen que ser iguale."
      });
    } else {
      const accesToken = getAccessTokenApi();

      signUpAdminApi(accesToken, userData)
        .then(response => {
          notification["success"]({
            message: response
          });
          setIsVisibleModal(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch(err => {
          notification["error"]({
            message: err
          });
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { userData, setUserData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" >
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon.UserOutlined />}
              placeholder="Nombre"
              value={userData.name}
              onChange={e => setUserData({ ...userData, name: e.target.value })}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon.UserOutlined />}
              placeholder="Apellidos"
              value={userData.lastname}
              onChange={e =>
                setUserData({ ...userData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon.MailOutlined />}
              placeholder="Correlo electronico"
              value={userData.email}
              onChange={e =>
                setUserData({ ...userData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona una rol"
              onChange={(e) => {
                setUserData({ ...userData, role: e });
              }}
              defaultValue={userData.role}
              value={userData.role}
            >
              {/* recorro el array de roles de utils constantes */}
              {roles.map((role, index) =>
                <Option value={role.value} key={index}>{role.text}</Option>
              )}
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon.LockOutlined />}
              type="password"
              placeholder="Contraseña"
              value={userData.password}
              onChange={e =>
                setUserData({ ...userData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<Icon.LockOutlined />}
              type="password"
              placeholder="Repetir contraseña"
              value={userData.repeatPassword}
              onChange={e =>
                setUserData({ ...userData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" onClick={addUser}>
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
