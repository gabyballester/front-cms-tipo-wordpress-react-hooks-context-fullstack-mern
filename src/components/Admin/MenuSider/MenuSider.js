import { useContext } from "react";
import "./MenuSider.scss";
import { Link } from 'react-router-dom';
import { MenuSiderData } from './MenuSiderData';
import SidebarContext from "../../../context/sidebar/sidebarContext";

export default function MenuSider() {

  // obtengo el estado del estate del menu
  const sidebarContext = useContext(SidebarContext);
  const { showSidebar } = sidebarContext;

  const pathName = window.location.pathname;

  return (
    <div className="menu-sider"
      style={!showSidebar ? { width: "64px" } : null}
    >

      {MenuSiderData.map((option, index) => (
        <Link
          key={index}
          to={option.path}
          className={option.path === pathName ? "menu-sider-row active" : "menu-sider-row"}
        >
          {option.icon}

          <span className="menu-sider-text"
            style={{color: !showSidebar ?  "transparent"  : null}}
          > {option.name} </span>

        </Link>

      ))}
    </div>
  );
}



