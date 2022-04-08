import React from "react"
import { Redirect } from "react-router-dom"

// Authentication related pages
import Login from "../pages/Authentication/Login"
import Logout from "../pages/Authentication/Logout"

// Dashboard
import Dashboard from "../pages/Dashboard/index"

import EntryData from "../pages/Entrydata/EntryData"
import DonwloadData from "../pages/DonwloadData/DonwloadData"
import TestingPage from "../pages/TestingPage/TestingPage"

const authProtectedRoutes = [
  { path: "/dashboard", component: Dashboard },
  { path: "/entrydata", component: EntryData },
  { path: "/donwload", component: DonwloadData },
  { path: "/testing", component: TestingPage},

  // this route should be at the end of all other routes
  // eslint-disable-next-line react/display-name
  { path: "/", exact: true, component: () => <Redirect to="/dashboard" /> },
]

const publicRoutes = [
  { path: "/logout", component: Logout },
  { path: "/login", component: Login },
]

export { publicRoutes, authProtectedRoutes }
