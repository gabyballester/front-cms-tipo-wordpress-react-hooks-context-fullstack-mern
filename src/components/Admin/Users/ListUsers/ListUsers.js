import { Fragment, useState } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import SwitchButton from "../../common/SwitchButton";
import Avatar from "@material-ui/core/Avatar";
import * as Icon from "@material-ui/icons";

import "./ListUsers.scss";

export default function ListUsers(props) {
  const { usersActive, usersInactive } = props;
  const [viewUsersActives, setViewUsersActives] = useState(true);

  return (
    <div className="list-users">
      <div className="list-users-switch">
        <SwitchButton
          viewUsersActives={viewUsersActives}
          setViewUsersActives={setViewUsersActives}
        />
        <span>
          {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
        </span>
      </div>
      {viewUsersActives ? (
        <UsersActive usersActive={usersActive} />
      ) : (
        <UsersInactive usersInactive={usersInactive} />
      )}
    </div>
  );
}

function UsersActive({ usersActive }) {
  const usersArray = usersActive;
  console.log(usersArray);

  return (
    <Fragment>
      {usersArray && usersArray.length
        ? usersArray.map((user, index) => (
            <div className="list-user-card" key={index}>
              <div className="avatar">
                <Avatar avatar={user.avatar ? user.avatar : NoAvatar} />
              </div>

              <div className="userInfo">
                <p className="title">
                  {user.name ? user.name : "Colocar el nombre"}{" "}
                  {user.surname ? user.surname : "Colocar el apellido"}
                </p>
                <p className="description">{user.email}</p>
              </div>

              <div className="actions">
                <div
                  className="button button-edit"
                  onClick={() => console.log("Editar")}
                >
                  <Icon.EditOutlined />
                </div>
                <div
                  className="button button-disable"
                  onClick={() => console.log("Desactivar")}
                >
                  <Icon.NotInterestedOutlined />
                </div>
                <div
                  className="button button-delete"
                  onClick={() => console.log("Borrar")}
                >
                  <Icon.DeleteOutlineOutlined />
                </div>
              </div>
            </div>
          ))
        : "no hay usuarios"}
    </Fragment>
  );
}

function UsersInactive({usersInactive}) {
  const usersArray = usersInactive;
  console.log(usersArray);

  return (
    <Fragment>
      {usersArray && usersArray.length
        ? usersArray.map((user, index) => (
            <div className="list-user-card" key={index}>
              <div className="avatar">
                <Avatar avatar={user.avatar ? user.avatar : NoAvatar} />
              </div>

              <div className="userInfo">
                <p className="title">
                  {user.name ? user.name : "Colocar el nombre"}{" "}
                  {user.surname ? user.surname : "Colocar el apellido"}
                </p>
                <p className="description">{user.email}</p>
              </div>

              <div className="actions">
                <div
                  className="button button-activate"
                  onClick={() => console.log("Activar")}
                >
                  <Icon.CheckOutlined />
                </div>
                <div
                  className="button button-delete"
                  onClick={() => console.log("Borrar")}
                >
                  <Icon.DeleteOutlineOutlined />
                </div>
              </div>
            </div>
          ))
        : "no hay usuarios"}
    </Fragment>
  );
}
