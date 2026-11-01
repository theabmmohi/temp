import { supabase } from "@util/supabase"
import { useAuth } from "@util/auth"

supabase.auth.onAuthStateChange((event, session) => {
  console.log(event)
  console.log(session)

  const { setState } = useAuth
  switch (event) {
    case "USER_UPDATED":
    case "SIGNED_IN":
      setState({ user: session?.user ?? null })
      break
    case "SIGNED_OUT":
      setState({ user: null })
      break
    // case "INITIAL_SESSION":
    // case "PASSWORD_RECOVERY":
    // case "TOKEN_REFRESHED":
    // case "MFA_CHALLENGE_VERIFIED":
  }
})
