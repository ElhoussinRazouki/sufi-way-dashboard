import {
  AuthTokenDto,
  AuthTokenDtoSchema,
  ResponseDto,
  UserDto,
  UserDtoSchema,
} from "@/types/auth.types"

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
  // Validating Dto Data
  await UserDtoSchema.validate(response.data)
  return response.data
}

async function refreshAuthToken(refreshToken: string) {
  const req = await axiosApi.post<AuthTokenDto>("auth/refresh-token", { refreshToken: refreshToken })

  await AuthTokenDtoSchema.validate(req.data)
  return req.data ? req.data : null

}


const AuthApi = {
  authenticate,
  getUserData,
  refreshAuthToken,
}

export default AuthApi
