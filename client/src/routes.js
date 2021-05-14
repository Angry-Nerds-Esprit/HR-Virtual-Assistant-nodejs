/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import UserProfile from "views/UserProfile.js";
import TableList from "views/TableList.js";
import Typography from "views/Typography.js";
import Icons from "views/Icons.js";
import Maps from "views/Maps.js";
import Notifications from "views/Notifications.js";
import Upgrade from "views/Upgrade.js";
import FoldersList from "components/folder/FoldersList";
import Addfolder from "components/folder/AddFolder";
import Folder from "components/folder/Folder";
import ProfilesList from "components/Profiles/Profileslist";
import Profile from "components/Profiles/Profile";
import Addrdv from "components/rdv/Addrdv";
import rdvList from "components/rdv/rdvList";
import rdv from "components/rdv/rdv";
import PDFcv  from "components/PDFcv/PDFcv";
import PDFcvLList  from "components/PDFcv/PDFcvList";


const dashboardRoutes = [
  {
    upgrade: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-alien-33",
    component: Upgrade,
    layout: "/admin",
    hide:"yes",
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-chart-pie-35",
    component: Dashboard,
    layout: "/admin",
    
  },
  {
    path: "/user",
    name: "User Profile",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/admin",
    hide:"yes",
  },
  {
    path: "/table",
    name: "Table List",
    icon: "nc-icon nc-notes",
    component: TableList,
    layout: "/admin",
    hide:"yes"
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-paper-2",
    component: Typography,
    layout: "/admin",
    hide:"yes",
  },
  {
    path: "/icons", 
    name: "Icons",
    icon: "nc-icon nc-atom",
    component: Icons,
    layout: "/admin",
    hide:"yes",
  }
 /* {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    hide:"yes",
  }*/,
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    hide:"yes"
  },
  {
    path: "/folder",
    name: "folder",
    icon: "nc-icon nc-chart-pie-35",
    component: FoldersList,
    layout: "/admin",
  },
  {
    path: "/addFolder",
    name: "add folder",
    icon: "nc-icon nc-chart-pie-35",
    component: Addfolder,
    layout: "/admin",
    hide:"yes"
  },{

  path: "/folder/:id",
  name: "folder",
  icon: "nc-icon nc-chart-pie-35",
  component: Folder,
  layout: "/admin",
  hide:"yes",
},
{
  path: "/profiles",
  name: "Profiles",
  icon: "nc-icon nc-atom",
  component: ProfilesList,
  layout: "/admin",
},{
  path: "/profiles/:id",
  name: "folder profiles ",
  icon: "nc-icon nc-atom",
  component: ProfilesList,
  layout: "/admin",
  hide:"yes"
},
{
  path: "/profile/:id",
  name: "Profile",
  icon: "nc-icon nc-atom",
  component: Profile,
  layout: "/admin",
  hide:"yes"
},
{
  path: "/folder/profile/:id",
  name: "Profile",
  icon: "nc-icon nc-atom",
  component: Profile,
  layout: "/admin",
  hide:"yes"
},
{
  path: "/addrdv/:id",
  name: "Add An Appointment",
  icon: "nc-icon nc-chart-pie-35",
  component: Addrdv,
  layout: "/admin",
  hide:"yes"
},
{
  path: "/calender",
  name: "calender",
  icon: "nc-icon nc-chart-pie-35",
  component: rdvList,
  layout: "/admin",
},
{
  path: "/rdv/:id",
  name: "rdv",
  icon: "nc-icon nc-chart-pie-35",
  component: rdv,
  layout: "/admin",
  hide:"yes"
},
{
  path: "/uploadPDF",
  name: "Upload cv",
  icon: "nc-icon nc-chart-pie-35",
  component: PDFcv,
  layout: "/admin",
},
{
  path: "/PDFcvLList",
  name: "list of Pdf Cv",
  icon: "nc-icon nc-chart-pie-35",
  component: PDFcvLList,
  layout: "/admin",
}


];

export default dashboardRoutes;
