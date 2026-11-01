export const passwordRules = [
  { id: "length", label: "At least 8 characters", test: (p: string) => p.length >= 8 },
  { id: "lower", label: "One lowercase letter", test: (p: string) => /[a-z]/.test(p) },
  { id: "upper", label: "One uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
  // { id: "symbol", label: "One symbol", test: (p: string) => /[^A-Za-z0-9]/.test(p) }
  { id: "digit", label: "One number", test: (p: string) => /\d/.test(p) }
]

export const isPasswordValid = (password: string) => passwordRules.every((rule) => rule.test(password))
