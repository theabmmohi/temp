import { CheckIcon, XIcon } from "lucide-react"
import { passwordRules } from "@util/password"
import { cn } from "cn"

export function PasswordRules({ password }: { password: string }) {
  return (
    <ul className="grid gap-1 text-sm" aria-live="polite">
      {passwordRules.map(({ id, label, test }) => {
        const passed = test(password)
        return (
          <li key={id} className={cn("flex items-center gap-2", password === "" ? "text-muted-foreground" : passed ? "text-green-600" : "text-destructive")}>
            {passed ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}
            {label}
          </li>
        )
      })}
    </ul>
  )
}
