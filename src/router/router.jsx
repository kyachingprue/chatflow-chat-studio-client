import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import Chat from "../dashboard/Users/Chat";
import GroupChat from "../dashboard/Users/GroupChat";
import Friends from "../dashboard/Users/Friends";
import AddFriend from "../dashboard/Users/AddFriend";
import Explore from "../dashboard/Users/Explore";
import Overview from "../dashboard/Admin/Overview";
import Users from "../dashboard/Admin/Users";
import Chats from "../dashboard/Admin/Chats";
import Reports from "../dashboard/Admin/Reports";
import Security from "../dashboard/Admin/Security";
import Profile from "../pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home/>
      },
      {
        path: "about",
        element: <About/>
      },
      {
        path: "services",
        element: <Services/>
      },
      {
        path: 'profile',
        element: <Profile/>
      }
    ]
  },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
    // User data
      {
        path: 'chat',
        element: <Chat/>
      },
      {
        path: 'group-chat',
        element: <GroupChat/>
      },
      {
        path: 'friends',
        element: <Friends/>
      },
      {
        path: 'add-friend',
        element: <AddFriend/>
      },
      {
        path: 'explore',
        element: <Explore/>
      },
      // Admin data
      {
        path: 'admin/overview',
        element: <Overview/>
      },
      {
        path: 'admin/users',
        element: <Users/>
      },
      {
        path: 'admin/chats',
        element: <Chats/>
      },
      {
        path: 'admin/reports',
        element: <Reports/>
      },
      {
        path: 'admin/security',
        element: <Security/>
      }
    ]
  }
])

export default router;