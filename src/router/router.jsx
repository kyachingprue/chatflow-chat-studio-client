import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import Services from "../pages/Services";
import ErrorPage from "../pages/ErrorPage";
import DashboardLayout from "../layout/DashboardLayout";
import Chat from "../dashboard/Users/Chat";
import Friends from "../dashboard/Users/Friends";
import AddFriend from "../dashboard/Users/AddFriend";
import Explore from "../dashboard/Users/Explore";
import Overview from "../dashboard/Admin/Overview";
import Users from "../dashboard/Admin/Users";
import Chats from "../dashboard/Admin/Chats";
import Reports from "../dashboard/Admin/Reports";
import Security from "../dashboard/Admin/Security";
import Register from "../pages/Register";
import Login from "../pages/Login";
import VerifyEmail from "../pages/VerifyEmail";
import EmailVerifiedSuccess from "../pages/EmailVerifiedSuccess";
import ForgotPassword from "../pages/ForgotPassword";
import CheckEmail from "../pages/CheckEmail";
import ResetPassword from "../pages/ResetPassword";
import FriendRequests from "../dashboard/Users/FriendRequests";
import Profile from "../pages/Profile";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

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
        element:<Profile/> 
      }
    ]
  },
  {
    path: '/dashboard',
    element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
    children: [
    // User data
      {
        path: 'chat',
        element: <PrivateRoute><Chat /></PrivateRoute>
      },
      {
        path: 'friends',
        element: <PrivateRoute><Friends /></PrivateRoute>
      },
      {
        path: 'add-friend',
        element: <PrivateRoute><AddFriend /></PrivateRoute>
      },
      {
        path: "friend-requests",
        element: <PrivateRoute><FriendRequests /></PrivateRoute>
      },
      {
        path: 'explore',
        element: <PrivateRoute><Explore /></PrivateRoute>
      },
      // Admin data
      {
        path: 'admin/overview',
        element: <AdminRoute><Overview /></AdminRoute>
      },
      {
        path: 'admin/users',
        element: <AdminRoute><Users /></AdminRoute>
      },
      {
        path: 'admin/chats',
        element: <AdminRoute></AdminRoute>
      },
      {
        path: 'admin/reports',
        element: <AdminRoute><Reports /></AdminRoute>
      },
      {
        path: 'admin/security',
        element: <AdminRoute><Security /></AdminRoute>
      }
    ]
  },
  {
    path:"/register",
    element:< Register />
    
    },
  {
    path: "/login",
    element: < Login />
  },
  {
    path: "/verify-email",
    element: < VerifyEmail />
  },
  {
    path: "/verified-success",
    element: < EmailVerifiedSuccess />
  },
  {
    path: "/forgot-password",
    element: < ForgotPassword />
  },
  {
    path: "/check-email",
    element: < CheckEmail />
  },
  {
    path: "/reset-password",
    element:< ResetPassword />}
])

export default router;