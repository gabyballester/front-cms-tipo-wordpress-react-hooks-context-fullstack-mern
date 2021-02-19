import "./MenuSider.scss";
import { Link } from 'react-router-dom';
import { SidebarData } from './SidebarData';

export default function MenuSider() {



  return (
    <nav className{sidebar ? 'nav-menu active': 'nav-menu'}>
    <ul className="navbar">
      {SidebarData.map((option, index) => (
        <li className="nav-menu-item">
         <Link
         key={index}
           to={option.path}
           className="menu-bars"
        >
           <span className="sider__icon">
             {option.icon}
             </span>
           <span className="sider__text">
             {option.name}
             </span>
         </Link>
         </li>
      ))}
    </div>
    </nav>
  );
}

