import { RouterProvider, createBrowserRouter } from "react-router"
import { createRoot } from "react-dom/client"
import { StrictMode } from "react"

import { HydrateFallback } from "@router/HydrateFallback"
import { ErrorBoundary } from "@router/ErrorBoundary"
import { supabase } from "@util/supabase"
import { Layout } from "@router/Layout"
import { routes } from "@router/routes"
import { useAuth } from "@util/auth"
import "@util/listeners"
import "@/main.css"

const router = createBrowserRouter([
  {
    id: "teadesk",
    element: <Layout />,
    children: routes,
    HydrateFallback,
    ErrorBoundary,
    loader: async () => {
      const { setState } = useAuth
      const { data } = await supabase.auth.getUser()
      setState({ user: data.user })
      console.log("Im loader !")
      return null
    }
  }
])

createRoot(document.getElementById("teadesk")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
