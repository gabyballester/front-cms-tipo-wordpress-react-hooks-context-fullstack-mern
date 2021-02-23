import { useState } from "react";
import Logo from "../../assets/img/png/logo.png";
import RegisterForm from '../../components/Admin/RegisterForm';
import LoginForm from '../../components/Admin/LoginForm';


import "./SignIn.scss";

export default function SignIn() {
  const [tab, setTab] = useState(true);

  return (
    <div className="layout">
      <div className="content">
        <h1 className="logo">
          <img src={Logo} />
        </h1>
        {/* tab-layout */}
        <div className="tab-layout">
          {/* tab-row */}
          <div className="tab-header">
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
              className={tab ? "tab-content" : "tab-content-hidden"}
            >
              <LoginForm/>
            </div>
            <div className={!tab ? "tab-content" : "tab-content-hidden"}>
            <RegisterForm/>
            </div>
        </div>
      </div>
    </div>
  );
}
