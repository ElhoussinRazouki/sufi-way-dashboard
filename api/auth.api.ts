import {
  AuthTokenDto,
  AuthTokenDtoSchema,
  ResponseDto,
  UserDto,
  UserDtoSchema,
} from "@/types/auth.types"
import { toast } from "react-toastify"
import * as Yup from "yup"
import axiosApi from "./axios.api"

async function authenticate(email: string, password: string) {
  const response = await axiosApi.post<ResponseDto<AuthTokenDto>>("auth/login", {
    email,
    password,
  })
  await AuthTokenDtoSchema.validate(response.data.data);
  return response.data.data as AuthTokenDto
}

async function getUserData() {
  const response = await axiosApi.get<UserDto>("auth/user")
  try {
    // Validating Dto Data
    await UserDtoSchema.validate(response.data)
    return response.data
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      toast.error("UserDto validation error!")
      console.error("UserDto validation error: ", error.errors)
      return null
    }
    throw error
  }
}

async function refreshAuthToken(refreshToken: string) {
  const req = await axiosApi.post<AuthTokenDto>("auth/refresh-token", { refreshToken: refreshToken })

  try {
    await AuthTokenDtoSchema.validate(req.data)
    return req.data ? req.data : null
  } catch (error) {
    if (error instanceof Yup.ValidationError) {
      toast.error("AuthTokenDto validation error!")
      console.error("AuthTokenDto validation error: ", error.errors)
      return null
    }
    throw error
  }
}


const AuthApi = {
  authenticate,
  getUserData,
  refreshAuthToken,
}

export default AuthApi
