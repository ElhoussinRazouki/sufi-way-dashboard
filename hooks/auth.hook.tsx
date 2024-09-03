import APIs from "@/api"
import { UserPayloadDto } from "@/types/auth.types"
import { getAuthTokenFromLocalStorage, getUserInfoFromJWT, removeAuthTokenFromLocalStorage, saveAuthTokenToLocalStorage } from "@/utils"
import { useSearchParams } from "next/navigation"
import { useCallback } from "react"

export const useAuth = () => {
  const searchParams = useSearchParams()

  // Authenticate the user
  const auth = useCallback(async (username: string, password: string) => {
    const authToken = await APIs.auth.authenticate(username, password)

    if (authToken) {
      // store the token in the local storage
      saveAuthTokenToLocalStorage(authToken)
    }

    return authToken
  }, [])

  // Logout the user
  const logout = useCallback(async () => {
    // clear the token from the local storage
    removeAuthTokenFromLocalStorage()
  }, [])

  // Redirect to the dashboard or to "to" URL id present
  const redirect = async () => {
    if (searchParams.has("to")) {
      return window.location.replace(searchParams.get("to") as string)
    }
    return window.location.replace("/dashboard")
  }

  return { auth, logout, redirect } as const
}

// Get the current logged in user
export function useUser() {

  // Get the user data
  const tokens = getAuthTokenFromLocalStorage()
  const user = getUserInfoFromJWT(tokens?.accessToken || "")
  const isAuthenticated: boolean = !!tokens

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const changePassword = useCallback(APIs.profile.changePassword, [])

  const updateUser = useCallback(
    async (userData: UserPayloadDto) => {
      await APIs.profile.updateUserData(userData)
    },
    [],
  )

  return {
    user,
    isAuthenticated,
    changePassword,
    updateUser,
  }
}
