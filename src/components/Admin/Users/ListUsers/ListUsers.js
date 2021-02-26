import { Fragment, useEffect, useState } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import SwitchButton from "../../common/SwitchButton";
import Avatar from "@material-ui/core/Avatar";
import * as Icon from "@material-ui/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import { getAvatarApi } from "../../../../api/user";

import "./ListUsers.scss";

export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("")
    const [modalContent, setModalContent] = useState(null)
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
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                />
            ) : (
                    <UsersInactive usersInactive={usersInactive} />
                )}
            <Modal
                title={modalTitle}
                isVisible={isVisibleModal}
                setIsVisible={setIsVisibleModal}
            >
                {modalContent}
            </Modal>
        </div>
    );
}


function UsersActive(props) {
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent,setReloadUsers } = props;
    const usersArray = usersActive;

    const editUser = user => {
        setIsVisibleModal(true);
        setModalTitle(`Editar ${user.name ? user.name : "..."} ${user.lastname ? user.lastname : "..."}`);
        setModalContent(
            <EditUserForm
                user={user}
                setIsVisibleModal={setIsVisibleModal}
                setReloadUsers={setReloadUsers}
            />);
    }

    return (
        <Fragment>
            {usersArray && usersArray.length
                ? usersArray.map((user, index) => (
                    <UserActive user={user} key={index} editUser={editUser} />
                ))
                : "no hay usuarios"}
        </Fragment>
    );
}


function UserActive(props) {
    const { user, editUser } = props;
    const [avatar, setAvatar] = useState(null);
    // si existe el avatar lo actualiza
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user, avatar]);

    return (
        <div className="list-user-card">
            <div className="avatar">
                <Avatar src={avatar ? avatar : NoAvatar} />
            </div>

            <div className="userInfo">
                <p className="title">
                    {user.name ? user.name : "Colocar el nombre"}{" "}
                    {user.lastname ? user.lastname : "Colocar el apellido"}
                </p>
                <p className="description">{user.email}</p>
            </div>

            <div className="actions">
                <div
                    className="button button-edit"
                    onClick={() => editUser(user)}
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
    )

}


function UsersInactive({ usersInactive }) {
    const usersArray = usersInactive;

    return (
        <Fragment>
            {usersArray && usersArray.length
                ? usersArray.map((user, index) => (
                    <UserInactive user={user} key={index} />
                ))
                : "no hay usuarios"}
        </Fragment>
    );
}

function UserInactive(props) {
    const { user, editUser } = props;
    const [avatar, setAvatar] = useState(null);

    // si existe el avatar lo actualiza
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]);

    return (

        <div className="list-user-card">
            <div className="avatar">
                <Avatar src={avatar ? avatar : NoAvatar} />
            </div>

            <div className="userInfo">
                <p className="title">
                    {user.name ? user.name : "Colocar el nombre"}{" "}
                    {user.lastname ? user.lastname : "Colocar el apellido"}
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
    )
}