import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator } from "@ui/field"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@ui/card"
import { Link, Navigate, useNavigate } from "react-router"
import { useState, type SubmitEvent } from "react"
import { supabase } from "@/utils/supabase"
import { useAuth } from "@/utils/auth"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { toast } from "sonner"

import Google from "@thesvg/react/google"

export function Component() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggingIn, setLoggingIn] = useState(false)

  const login = async (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoggingIn(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) toast.error(error.message)
    else navigate("/", { replace: true })
    setLoggingIn(false)
  }

  if (useAuth.getState().user) return <Navigate to="/" replace />

  return (
    <Card className="max-w-sm m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login to your {import.meta.env.VITE_APP_NAME} account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={login}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Link to="/forgot" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required />
            </Field>
            <Field>
              <Button type="submit" processing={loggingIn}>
                Login
              </Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <Link to="/register">Register</Link>
              </FieldDescription>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>
            <Field>
              <Button variant="outline" type="button" onClick={() => toast.error("Currently not available !")}>
                <Google /> Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
