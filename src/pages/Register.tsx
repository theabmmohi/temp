import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator } from "@ui/field"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@ui/card"
import { Link, Navigate, useNavigate } from "react-router"
import { PasswordRules } from "@component/PasswordRules"
import { useState, type SubmitEvent } from "react"
import { isPasswordValid } from "@util/password"
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
  const [registering, setRegistering] = useState(false)

  async function register(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!isPasswordValid(password)) return toast.error("Password doesn't meet the requirements")
    setRegistering(true)
    const { error } = await supabase.auth.signUp({ email, password })
    if (error) toast.error(error.message)
    else navigate("/verify", { state: { email, type: "email", title: "Verify your email", description: "Enter the 6-digit code sent to {email}" } })
    setRegistering(false)
  }

  if (useAuth.getState().user) return <Navigate to="/" replace />

  return (
    <Card className="max-w-sm m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Hey there</CardTitle>
        <CardDescription>Create an {import.meta.env.VITE_APP_NAME} account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={register}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" autoComplete="email" placeholder="you@example.com" value={email} onChange={(event) => setEmail(event.target.value)} required />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input id="password" type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
              <PasswordRules password={password} />
            </Field>
            <Field>
              <Button type="submit" processing={registering}>
                Register
              </Button>
              <FieldDescription className="text-center">
                Already have an account? <Link to="/login">Login</Link>
              </FieldDescription>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>
            <Field>
              <Button variant="outline" type="button" onClick={() => toast.error("Currently not available !")}>
                <Google />
                Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
