import { useState, useEffect, useCallback } from "react";
import { Avatar, Form, Input, Select, Button, Row, Col, notification } from "antd";
import * as Icon from '@ant-design/icons';
import { useDropzone } from "react-dropzone";
import NoAvatar from "../../../../assets/img/png/no-avatar.png";
import { getAvatarApi, uploadAvatarApi, updateUserApi } from "../../../../api/user";
import { getAccessTokenApi } from '../../../../api/auth';
import { roles } from "../../../../utils/constants";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
    const { user,setIsVisibleModal, setReloadUsers } = props;
    const [avatar, setAvatar] = useState(null);
    const [userData, setUserData] = useState({})


    // actualiza userData con el formulario
    useEffect(() => {
        setUserData({
            name: user.name,
            lastname: user.lastname,
            email: user.email,
            role: user.role,
            avatar: user.avatar
        });
    }, [avatar, user, setUserData]); // al inicio y si estos cambian


    // si trae avatar de la BD lo setea en avatar
    useEffect(() => {
        if (user.avatar) {
            getAvatarApi(user.avatar).then(response => {
                setAvatar(response);
            });
        } else {
            setAvatar(null);
        }
    }, [user]); // al inicio y si usuario cambia


    //si existe avatar lo introduce en el objeto userData
    useEffect(() => {
        if (avatar) {
            setUserData({ ...userData, avatar: avatar.file });
        }
    }, [avatar, setUserData]); // al inicio y si avatar cambia


    const updateUser = e => {
        e.preventDefault();
        const token = getAccessTokenApi();

        let userUpdate = userData;

        
  
        if (userUpdate.password || userUpdate.repeatPassword) {
            if (userUpdate.password !== userUpdate.repeatPassword) {
                notification.error({
                    message: "Las contraseñas tienen que ser iguales."
                });
                return;
            }
            else {
                delete userUpdate.repeatPassword;
            }
        }

        if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
            notification.error({
                message: "El nombre, apellidos e email son obligatorios."
            });
            return;
        }

        if (typeof userUpdate.avatar === "object") {
            uploadAvatarApi(token, userUpdate.avatar, user._id).then(response => {
                userUpdate.avatar = response.avatarName;
                updateUserApi(token, userUpdate, user._id).then(result => {
                    notification.success({
                        message:  result.message
                    });
                    setIsVisibleModal(false);
                    setReloadUsers(true);
                    setUserData({ ...userData, password: null, repeatPassword: null });
                });
            });
        } else {
            updateUserApi(token, userUpdate, user._id).then(result => {
                notification.success({
                    message: result.message
                });
                setIsVisibleModal(false);
                setReloadUsers(true);
                setUserData({ ...userData, password: null, repeatPassword: null });
            });
        }
    };


    return (
        <div className="edit-user-form">
            <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
            <EditForm userData={userData} setUserData={setUserData} updateUser={updateUser} />
        </div>
    );
}


function UploadAvatar(props) {
    const { avatar, setAvatar } = props;
    const [avatarUrl, setAvatarUrl] = useState(null);

    useEffect(() => {
        if (avatar) {
            if (avatar.preview) {
                setAvatarUrl(avatar.preview);
            } else {
                setAvatarUrl(avatar);
            }
        } else {
            setAvatarUrl(null);
        }
    }, [avatar]);

    const onDrop = useCallback(
        acceptedFiles => {
            const file = acceptedFiles[0];
            setAvatar({ file, preview: URL.createObjectURL(file) });
        },
        [setAvatar]
    )

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpeg, image/png",
        noKeyboard: true,
        onDrop
    });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <Avatar size={150} src={NoAvatar} />
            ) : ( // avatar.preview
                    <Avatar size={150} src={avatar ? avatarUrl : NoAvatar} />
                )}
        </div>
    );
}

function EditForm(props) {
    const { userData, setUserData, updateUser } = props;
    const { Option } = Select;


    return (
        <Form className="form-edit"
           
        >
            <Row gutter={24}>
                <Col span={12}>
                    <Form.Item className="ant-form-item">
                        <Input
                            prefix={<Icon.UserOutlined />}
                            placeholder="Nombre"
                            value={userData.name}
                            defaultValue={userData.name}
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
                            defaultValue={userData.lastname}
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
                            placeholder="Correo electronico"
                            value={userData.email}
                            defaultValue={userData.email}
                            onChange={e =>
                                setUserData({ ...userData, email: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item>
                        <Select
                            placeholder="Seleccióna una rol"
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
                            onChange={e =>
                                setUserData({ ...userData, repeatPassword: e.target.value })
                            }
                        />
                    </Form.Item>
                </Col>
            </Row>

            <Form.Item>
                <Button type="primary" className="btn-submit" htmlType="submit"  onClick={updateUser} >
                    Actualizar Usuario
        </Button>
            </Form.Item>
        </Form>
    );
}