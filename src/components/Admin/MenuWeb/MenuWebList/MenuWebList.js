import { useState, useEffect } from "react";
import { Switch, List, Button, Modal as ModalAntd, notification } from "antd";
import * as Icon from '@ant-design/icons';
import Modal from "../../../Modal";
import DragSortableList from "react-drag-sortable";
import { updateMenuApi } from "../../../../api/menu";
import { getAccessTokenApi } from "../../../../api/auth";

import "./MenuWebList.scss";

const { confirm } = ModalAntd;

export default function MenuWebList(props) {
  const { menu, setReloadMenuWeb } = props;
  const [listItems, setListItems] = useState([]);
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  
  useEffect(() => {
    const listItemsArray = [];
    menu.forEach(item => {
      listItemsArray.push({
        content: (
          <MenuItem item={item} />
        )
      });
    });
    setListItems(listItemsArray);
  }, [menu]);


  const onSort = (sortedList, dropEvent) => {
    const accesToken = getAccessTokenApi();

    sortedList.forEach(item => {
      const { _id } = item.content.props.item;
      const order = item.rank;
      updateMenuApi(accesToken, _id, { order });
    });
  };

  const addMenuWebModal = () => {
    setIsVisibleModal(true);
    setModalTitle("Creando nuevo menú");
    setModalContent(
      <div>add menu web form</div>
      // <AddMenuWebForm
      //   setIsVisibleModal={setIsVisibleModal}
      //   setReloadMenuWeb={setReloadMenuWeb}
      // />
    );
  };


  return (
    <div className="menu-web-list">
      <div className="menu-web-list__header">
        <Button type="primary">
          Menú menú
        </Button>
      </div>

      <div className="menu-web-list__items">
        <DragSortableList items={listItems} onSort={onSort} type="vertical" />
      </div>

    </div>
  )
}

function MenuItem(props) {
  const { item, activateMenu, editMenuWebModal, deleteMenu } = props;

  return (
    <List.Item
      actions={[
        <Switch defaultChecked={item.active} />,
        <Button type="primary">
          <Icon.EditOutlined />
        </Button>,
        <Button type="danger" onClick={() => deleteMenu(item)}>
          <Icon.WarningOutlined />
        </Button>
      ]}
    >
      <List.Item.Meta title={item.title} description={item.url} />
    </List.Item>
  );
}
