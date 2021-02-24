import { useState } from "react";
import { Redirect } from 'react-router-dom';
import Logo from "../../assets/img/png/logo.png";
import RegisterForm from '../../components/Admin/RegisterForm';
import LoginForm from '../../components/Admin/LoginForm';
import { getAccessTokenApi } from "../../api/auth";

import "./SignIn.scss";

export default function SignIn() {
  const [tab, setTab] = useState(true);

  if (getAccessTokenApi()) {
    return <Redirect to="/admin" />;
  }

  return (
    <div className="layout-signin">
      <div className="content-signin">
        <h1 className="logo-signin">
          <img className="logo-signin-img" src={Logo} alt="logo" />
        </h1>
        {/* tab-layout */}
        <div className="tab-layout-signin">
          {/* tab-row */}
          <div className="tab-header-signin">
            {/* tab1 */}
            <div
              className={tab ? "tab1 active" : "tab1 inactive"}
              onClick={() => setTab(true)}>
              <p className="text">Entrar</p>
            </div>
            {/* tab2 */}
            <div className={!tab ? "tab2 active" : "tab2 inactive"}
              onClick={() => setTab(false)}>
              <p className="text">Nuevo Usuario</p>
            </div>
          </div>
          {/* tab-content*/}
          <div
            className={tab ? "tab-content-signin" : "tab-content-signin-hidden"}
          >
            <LoginForm />
          </div>
          <div className={!tab ? "tab-content-signin" : "tab-content-signin-hidden"}>
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
