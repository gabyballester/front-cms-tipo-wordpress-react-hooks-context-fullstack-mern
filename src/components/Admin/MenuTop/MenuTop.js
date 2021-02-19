import "./MenuTop.scss";
import Logo from "../../../assets/img/png/logo.png";

import * as Icons from "@material-ui/icons";

export default function MenuTop(props) {
  const [ sidebar, setSidebar ] = useState(false);

  const showSidebar = () => setSidebar(!sidebar)
  return (
    <div className="menu-top">
      <div className="menu-top__left">
        <img className="menu-top__left-logo" src={Logo} alt="Página personal" />
        <button onClick={() => console.log("clicado")}>
          <Icons.MenuOpenOutlined />
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
