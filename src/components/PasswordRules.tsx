import { CheckIcon, XIcon } from "lucide-react"
import { passwordRules } from "@util/password"
import { cn } from "cn"

export function PasswordRules({ password }: { password: string }) {
  const results = passwordRules.map((rule) => rule.test(password))
  const passedCount = results.filter(Boolean).length

  if (passedCount === 0 || passedCount === passwordRules.length) return null

  return (
    <ul className="grid gap-1 text-sm" aria-live="polite">
      {passwordRules.map(({ id, label }, index) => {
        const passed = results[index]
        return (
          <li key={id} className={cn("flex items-center gap-2", passed ? "text-green-600" : "text-destructive")}>
            {passed ? <CheckIcon className="size-4" /> : <XIcon className="size-4" />}
            {label}
          </li>
        )
      })}
    </ul>
  )
}
