
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import "./MenuTop.scss";
import Logo from "../../../assets/img/png/logo.png";
import SidebarContext from "../../../context/sidebar/sidebarContext";

import * as Icons from "@material-ui/icons";

export default function MenuTop(props) {
  const sidebarContext = useContext(SidebarContext);
  const { showSidebar, changeSidebarState } = sidebarContext;

  return (
    <div className="menu-top">
      <div className="menu-top-left">
        <Link className="menu-top-left-link" to="/admin">
          <img className="menu-top-left-logo" src={Logo} alt="Página personal" />
        </Link>
        <button
            className="menu-top-left-button"
            onClick={() => changeSidebarState()}
          >
            {showSidebar ? <Icons.MenuOpenOutlined /> : <Icons.MenuOutlined />}
          </button>
      </div>
      <div className="menu-top-right">
        <button
          className="menu-top-right-button"
          onClick={() => console.log("//TODO")}
        >
          <Icons.PowerSettingsNew />
        </button>
      </div>
    </div>
  );
}
