/*!

=========================================================
* Paper Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Mydetails from "views/Mydetails.js";
import Typography from "views/Typography.js";
import Feedback from "views/Feedback";
import Viewfeedback from "views/Feedbacklist";
import Uploadpage from "views/Uploadpage.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

var routes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/mydetails",
    name: "My details",
    icon: "nc-icon nc-diamond",
    component: Mydetails,
    layout: "/admin",
  },
  {
    path: "/uploadpage",
    name: "Upload Page",
    icon: "nc-icon nc-pin-3",
    component: Uploadpage,
    layout: "/admin",
  },
  {
    path: "/viewupload-docuement",
    name: "View Upload Document",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
  },
  {
    path: "/download-request-page",
    name: "Download Request Page",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  {
    path: "/feedback",
    name: "Feedback",
    icon: "nc-icon nc-tile-56",
    component: Feedback,
    layout: "/admin",
  },
  {
    path: "/viewfeedback",
    name: "View feedback",
    icon: "nc-icon nc-tile-56",
    component: Viewfeedback,
    layout: "/admin",
  },
  {
    path: "/logout",
    name: "Logout",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
  },
  // {
  //   pro: true,
  //   path: "/upgrade",
  //   name: "Upgrade to PRO",
  //   icon: "nc-icon nc-spaceship",
  //   component: UpgradeToPro,
  //   layout: "/admin",
  // },
];
export default routes;
