import { Field, FieldGroup, FieldLabel, FieldDescription, FieldSeparator } from "@ui/field"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@ui/card"
import { Button } from "@ui/button"
import { Input } from "@ui/input"
import { toast } from "sonner"

import Google from "@thesvg/react/google"

export function Component() {
  return (
    <Card className="max-w-sm m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login to your Apple or Google account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="you@example.com" required />
            </Field>
            <Field>
              <div className="flex items-center">
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <a href="#" className="ml-auto text-sm underline-offset-4 hover:underline">
                  Forgot your password?
                </a>
              </div>
              <Input id="password" type="password" required />
            </Field>
            <Field>
              <Button type="submit">Login</Button>
              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="#">Sign up</a>
              </FieldDescription>
            </Field>
            <FieldSeparator className="*:data-[slot=field-separator-content]:bg-card">Or continue with</FieldSeparator>
            <Field>
              <Button variant="outline" type="button" onClick={() => toast.error("Currently not available !")}>
                <Google />
                Login with Google
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  )
}
