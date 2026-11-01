import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp"
import { Field, FieldLabel } from "@ui/field"
import { RefreshCwIcon } from "lucide-react"
import { useLocation } from "react-router"
import { type SubmitEvent } from "react"
import { Button } from "@ui/button"
import { Slot } from "@ui/otp-slot"

export function Component() {
  const location = useLocation()

  const { state } = location as { state: { email: string; type: string } | null }

  async function verify(event: SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
  }

  if (!state?.email || !state.type) return <h1>Invalid session !</h1>

  return (
    <Card className="max-w-sm m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">Welcome back</CardTitle>
        <CardDescription>Login to your {import.meta.env.VITE_APP_NAME} account</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={verify}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
            <Button type="button" variant="outline" size="xs">
              <RefreshCwIcon />
              Resend Code
            </Button>
          </div>
          <Field className="py-5">
            <OTPInput
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              containerClassName="group flex items-center has-[:disabled]:opacity-40"
              render={({ slots }) => (
                <div className="flex">
                  {slots.map((slot, idx) => (
                    <Slot key={idx} {...slot} />
                  ))}
                </div>
              )}
            />
          </Field>
          <Field>
            <Button type="submit">Verify</Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}
