import * as Yup from "yup"

export type AuthPayloadDto = {
  username: string
  password: string
}

export type AccessToken = string
export type RefreshToken = string

export type ResponseDto<T> = {
  message?: string
  data?: T
}

export type AuthTokenDto = {
  refresh: RefreshToken
  access: AccessToken
}

export const AuthTokenDtoSchema = Yup.object().shape({
  refreshToken: Yup.string().required(),
  accessToken: Yup.string().required(),
})

// Note: the user is the employee
export type UserDto = {
  id: number
  userName: string
  email: string
  is_admin: string
  avatar: string
}

export const UserDtoSchema = Yup.object().shape({
  id: Yup.number().required(),
  userName: Yup.string().required(),
  email: Yup.string().nullable(),
  is_admin: Yup.boolean().required(),
  avatar: Yup.string().nullable(),
})

export type UserPayloadDto = Partial<
  Omit<
    UserDto,
    | "id"
    | "is_admin"
    | "email"
  >
>
