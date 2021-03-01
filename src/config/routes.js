//layouts
import LayoutBasic from '../layouts/LayoutBasic';
import LayoutAdmin from '../layouts/LayoutAdmin';
// Admin pages
import AdminHome from '../pages/Admin/'
import AdminSignIn from '../pages/Admin/SignIn';
import AdminUsers from "../pages/Admin/Users";
import AdminMenuWeb from "../pages/Admin/MenuWeb";
// User pages
import Home from '../pages/Home';
import Contact from '../pages/Contact';
import Courses from '../pages/Courses';
// Other pages
import Error404 from '../pages/Error404';

const routes = [
  // Admin routes
  {
    path: "/admin",
    exact: false,
    component: LayoutAdmin,
    routes: [
      {
        path: "/admin",
        exact: true,
        component: AdminHome
      },
      {
        path: "/admin/login",
        exact: true,
        component: AdminSignIn
      },
      {
        path: "/admin/users",
        exact: true,
        component: AdminUsers
      },
      {
        path: "/admin/menu",
        exact: true,
        component: AdminMenuWeb
      },
      {
        component: Error404
      }
    ]
  },
  // Public routes
  {
    path: "/",
    exact: false,
    component: LayoutBasic,
    routes: [
      {
        path: "/",
        exact: true,
        component: Home
      },
      {
        path: "/contact",
        exact: true,
        component: Contact
      },
      {
        path: "/courses",
        exact: true,
        component: Courses
      },
      {
        component: Error404
      }
    ]
  }
];

export default routes;