import { useState, useEffect, useRef } from "react";
import { Form, Input, Button, Select, notification } from "antd";
import * as Icon from '@ant-design/icons';
import { addMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddMenuWebForm.scss";

export default function AddMenuWebForm(props) {
  const { setIsVisibleModal, setReloadMenuWeb } = props;
  const [menuWebData, setMenuWebData] = useState({});

  const addMenu = event => {
    event.preventDefault();

    let finalData = {
      title: menuWebData.title,
      url: (menuWebData.http ? menuWebData.http : "/") + menuWebData.url
    }

    if (!finalData.title || !finalData.url || !menuWebData.url) {
      notification.error({
        message: "Todos los campos son obligatorios."
      });
    } else {
      const accessToken = getAccessTokenApi();
      finalData.active = false;
      finalData.order = 1000;

      addMenuApi(accessToken, finalData)
        .then(response => {
          notification.success({
            message: response
          });
          setIsVisibleModal(false);
          setReloadMenuWeb(true);
          setMenuWebData({});
          finalData = {};
        })
        .catch(() => {
          notification.error({
            message: "Error en el servidor."
          });
        });
    }
  }

  return (
    <div className="add-menu-web-form">
      <AddForm
        menuWebData={menuWebData}
        setMenuWebData={setMenuWebData}
        addMenu={addMenu}
      />
    </div>
  );
}

function AddForm(props) {
  const { menuWebData, setMenuWebData, addMenu } = props;
  const { Option } = Select;
  const inputRef = useRef(null);

  console.log(menuWebData);

  useEffect(() => {
    inputRef.current.focus();
  }, [inputRef])

  const selectBefore = (
    <Select
      defaultValue="/"
      style={{ width: 90 }}
      onChange={e => setMenuWebData({ ...menuWebData, http: e })}
    >
      <Option value="/">/</Option>
      <Option value="http://">http://</Option>
      <Option value="https://">https://</Option>
    </Select>
  );

  return (
    <Form className="form-add">
      <Form.Item>
        <Input
        ref={inputRef} 
          prefix={<Icon.FontSizeOutlined />}
          placeholder="Titulo"
          value={menuWebData.title}
          onChange={e =>
            setMenuWebData({ ...menuWebData, title: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Input
          addonBefore={selectBefore}
          placeholder="URL"
          value={menuWebData.url}
          onChange={e =>
            setMenuWebData({ ...menuWebData, url: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit" onClick={addMenu}>
          Crear menú
        </Button>
      </Form.Item>
    </Form>
  );
}
