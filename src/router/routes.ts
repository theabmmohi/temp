import type { RouteObject } from "react-router"

export const routes: RouteObject[] = [
  {
    path: "/",
    lazy: () => import("@page/Index")
  },
  {
    path: "/register",
    lazy: () => import("@page/Register")
  },
  {
    path: "/login",
    lazy: () => import("@page/Login")
  }
]
