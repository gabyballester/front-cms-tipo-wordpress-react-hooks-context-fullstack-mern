import { Fragment, useEffect, useState } from "react";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { notification, Modal as ModalAntd, Button } from "antd";
import SwitchButton from "../../common/SwitchButton";
import Avatar from "@material-ui/core/Avatar";
import * as Icon from "@material-ui/icons";
import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";
import { getAvatarApi, activateUserApi, deleteUserApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

const showDeleteConfirm = (props) => {
    const { user, setReloadUsers } = props;
    const accesToken = getAccessTokenApi();

    confirm({
        title: "Eliminando usuario",
        content: `¿Estas seguro que quieres eliminar a ${user.email}?`,
        okText: "Eliminar",
        okType: "danger",
        cancelText: "Cancelar",
        onOk() {
            deleteUserApi(accesToken, user._id)
                .then(response => {
                    notification["success"]({
                        message: response
                    });
                    setReloadUsers(true);
                })
                .catch(err => {
                    notification["error"]({
                        message: err
                    });
                });
        }
    });
};


export default function ListUsers(props) {
    const { usersActive, usersInactive, setReloadUsers } = props;
    const [viewUsersActives, setViewUsersActives] = useState(true);
    const [isVisibleModal, setIsVisibleModal] = useState(false);
    const [modalTitle, setModalTitle] = useState("");
    const [modalContent, setModalContent] = useState(null);

    const addUserModal = () => {
        setIsVisibleModal(true);
        setModalTitle("Creando nuevo usuario");
        setModalContent(
            <AddUserForm
            setIsVisibleModal={setIsVisibleModal}
            setReloadUsers={setReloadUsers}
          />
        );
    };

    return (
        <div className="list-users">
            <div className="list-user-header">

                <div className="list-users-switch">
                    <SwitchButton
                        viewUsersActives={viewUsersActives}
                        setViewUsersActives={setViewUsersActives}
                    />
                    <span>
                        {viewUsersActives ? "Usuarios activos" : "Usuarios inactivos"}
                    </span>
                </div>
                <Button type="primary" onClick={addUserModal}>
                    Nuevo Usuario
                </Button>
            </div>
            {viewUsersActives ? (
                <UsersActive
                    usersActive={usersActive}
                    setIsVisibleModal={setIsVisibleModal}
                    setModalTitle={setModalTitle}
                    setModalContent={setModalContent}
                    setReloadUsers={setReloadUsers}
                    showDeleteConfirm={showDeleteConfirm}
                />
            ) : (
                    <UsersInactive usersInactive={usersInactive} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />
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
    const { usersActive, setIsVisibleModal, setModalTitle, setModalContent, setReloadUsers, showDeleteConfirm } = props;
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
                    <UserActive user={user} key={index} editUser={editUser} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />
                ))
                : "no hay usuarios"}
        </Fragment>
    );
}

function UserActive(props) {
    const { user, editUser, setReloadUsers, showDeleteConfirm } = props;
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

    const deactivateUser = () => {
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, false)
            .then(response => {
                notification.success({
                    message: response
                });
                setReloadUsers(true);
            })
            .catch(err => {
                notification.error({
                    message: err
                });
            });
    };

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
                    onClick={deactivateUser}
                >
                    <Icon.NotInterestedOutlined />
                </div>
                <div
                    className="button button-delete"
                    onClick={() => showDeleteConfirm({ user, setReloadUsers })}
                >
                    <Icon.DeleteOutlineOutlined />
                </div>
            </div>
        </div>
    )

}

function UsersInactive(props) {
    const { usersInactive, setReloadUsers, showDeleteConfirm } = props;

    return (
        <Fragment>
            {usersInactive && usersInactive.length
                ? usersInactive.map((user, index) => (
                    <UserInactive user={user} key={index} setReloadUsers={setReloadUsers} showDeleteConfirm={showDeleteConfirm} />
                ))
                : "no hay usuarios"}
        </Fragment>
    );
}

function UserInactive(props) {
    const { user, setReloadUsers } = props;
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

    const activateUser = (props) => {
        const { showDeleteConfirm } = props;
        const accesToken = getAccessTokenApi();

        activateUserApi(accesToken, user._id, true)
            .then(response => {
                notification.success({
                    message: response
                });
                setReloadUsers(true);
            })
            .catch(err => {
                notification.error({
                    message: err
                });
            });
    };


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
                    onClick={activateUser}
                >
                    <Icon.CheckOutlined />
                </div>
                <div
                    className="button button-delete"
                    onClick={() => showDeleteConfirm({ user, setReloadUsers })}
                >
                    <Icon.DeleteOutlineOutlined />
                </div>
            </div>
        </div>
    )
}