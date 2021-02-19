
import {useContext} from 'react';
import "./MenuTop.scss";
import Logo from "../../../assets/img/png/logo.png";
import SidebarContext from "../../../context/sidebar/sidebarContext";

import * as Icons from "@material-ui/icons";

export default function MenuTop(props) {
  const sidebarContext = useContext(SidebarContext);
  const { showSidebar, changeSidebarState } = sidebarContext;
  
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="Página personal" />
        <button onClick={()=>changeSidebarState()}>
          {showSidebar?<Icons.MenuOpenOutlined />: <Icons.MenuOutlined />}
        </button>
      </div>
      <div className="menu-top__right">
        <button onClick={() => console.log("clicado")}>
          <Icons.PowerSettingsNew />
        </button>
      </div>
    </div>
  );
}
