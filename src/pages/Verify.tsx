import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@ui/card"
import { useEffect, useState, type SubmitEvent } from "react"
import { type EmailOtpType } from "@supabase/supabase-js"
import { OTPInput, REGEXP_ONLY_DIGITS } from "input-otp"
import { useLocation, useNavigate } from "react-router"
import { Field, FieldLabel } from "@ui/field"
import { RefreshCwIcon } from "lucide-react"
import { supabase } from "@/utils/supabase"
import { Button } from "@ui/button"
import { Slot } from "@ui/otp-slot"
import { toast } from "sonner"

const RESEND_COOLDOWN = 60

export function Component() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state: { email: string; type: EmailOtpType; title: string; description: string } | null }

  const [code, setCode] = useState("")
  const [verifying, setVerifying] = useState(false)
  const [resending, setResending] = useState(false)
  const [cooldown, setCooldown] = useState(0)

  useEffect(() => {
    if (cooldown <= 0) return
    const timer = setTimeout(() => setCooldown((seconds) => seconds - 1), 1000)
    return () => clearTimeout(timer)
  }, [cooldown])

  if (!state?.email || !state.type) return <h1>Invalid session !</h1>
  const { email, type } = state

  async function verify(token: string) {
    if (verifying || token.length < 6) return
    setVerifying(true)
    const { error } = await supabase.auth.verifyOtp({ email, token, type })
    if (error) {
      toast.error(error.message)
      setCode("")
      setVerifying(false)
      return
    }
    if (type === "signup") navigate("/onboard", { replace: true })
    else navigate("/", { replace: true })
  }

  async function resend() {
    setResending(true)
    const { error } = await supabase.auth.resend({ type: "signup", email })
    if (error) toast.error(error.message)
    else {
      toast.success("A new code was sent")
      setCooldown(RESEND_COOLDOWN)
    }
    setResending(false)
  }

  const submit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()
    verify(code)
  }

  return (
    <Card className="max-w-sm m-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{state.title}</CardTitle>
        <CardDescription>{state.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={submit}>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">Verification code</FieldLabel>
            <Button type="button" variant="outline" size="xs" processing={resending} disabled={cooldown > 0} onClick={resend}>
              <RefreshCwIcon />
              {cooldown > 0 ? `Resend in ${cooldown}s` : "Resend Code"}
            </Button>
          </div>
          <Field className="py-5">
            <OTPInput
              id="otp-verification"
              autoFocus
              maxLength={6}
              value={code}
              onChange={setCode}
              onComplete={verify}
              disabled={verifying}
              pattern={REGEXP_ONLY_DIGITS}
              containerClassName="group flex items-center justify-center has-[:disabled]:opacity-40"
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
            <Button type="submit" processing={verifying}>
              Verify
            </Button>
          </Field>
        </form>
      </CardContent>
    </Card>
  )
}
