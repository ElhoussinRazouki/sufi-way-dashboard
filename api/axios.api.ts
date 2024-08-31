"use client"

import { AuthTokenDto } from "@/types/auth.types"
import {
  getAuthTokenFromLocalStorage,
  removeAuthTokenFromLocalStorage,
  saveAuthTokenToLocalStorage,
} from "@/utils"
import axios from "axios"
import APIs from "."

const axiosApi = axios.create({
  // for production & development
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
})

// Add the access token to the request headers if it exists
axiosApi.interceptors.request.use(async (config) => {
  let authToken: AuthTokenDto | null = null
  try {
    authToken = getAuthTokenFromLocalStorage()

    if (authToken?.access) {
      config.headers["Authorization"] = `Bearer ${authToken.access}`
    }
  } catch (err) {
    authToken = null
  }

  return config
})

// Check if login is required
axiosApi.interceptors.response.use(
  (response) => {
    // Handle a successful response
    return response
  },
  async (error) => {
    // Handle an error response
    if (error.response.status === 401) {
      // try to refresh the token
      const refreshToken = getAuthTokenFromLocalStorage()?.refresh
      if (refreshToken) {
        try {
          const newAuthToken = await APIs.auth.refreshAuthToken(refreshToken)

          if (newAuthToken) {
            saveAuthTokenToLocalStorage(newAuthToken)
            // retry the request
            return axiosApi.request(error.config)
          }
        } catch (error) {
          console.error("Error refreshing token", error)
        }
      }
      // else remove the token and redirect to login
      removeAuthTokenFromLocalStorage()

      if (window.location.href.includes("/dashboard")) {
        // redirect to the login page with the current path as the "to" query param
        if (window.location.pathname !== "/sign-in") {
          window.location.href = `/sign-in?to=${window.location.pathname}`
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosApi
