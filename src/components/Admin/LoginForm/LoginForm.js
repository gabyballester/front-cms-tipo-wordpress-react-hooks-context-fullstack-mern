import { useState } from "react";
import * as Icons from "@material-ui/icons";
import { signInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";
import { notification } from "antd";

import "antd/dist/antd.css";
export default function LoginForm() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const result = await signInApi(inputs);

    if (result.message) {
      notification.error({
        message: result.message,
      });

    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification.success({
        message: "Login correcto.",
      });

      window.location.href = "/admin";
    }

  };

  return (
    <form
      className="container-form"
      onSubmit={handleSubmit}
      onChange={handleChange}
    >
      {/* email input */}
      <div className="input-container">
        <Icons.MailOutline />
        <input
          className="data-input"
          name="email"
          type="email"
          placeholder="Correo electrónico"
        />
      </div>
      {/* password input */}
      <div className="input-container">
        <Icons.LockOutlined />
        <input
          className="data-input"
          name="password"
          type="password"
          placeholder="Contraseña"
        />
      </div>
      <button type="submit">Iniciar sesión</button>
    </form>
  );
}
