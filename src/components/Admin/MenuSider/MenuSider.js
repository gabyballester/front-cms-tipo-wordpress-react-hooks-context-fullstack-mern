import "./MenuSider.scss";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

export default function MenuSider() {

  const pathName = window.location.pathname;

  return (
    <div className="sider">

      {SidebarData.map((option, index) => (
        <Link
          key={index}
          to={option.path}
          className={option.path == pathName ? "row active" : "row"}
        >
          {option.icon}
          <span className="text">
            {option.name}
          </span>
        </Link>
      ))}
    </div>
  );
}



