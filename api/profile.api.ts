import { PasswordPayloadDto } from "@/types/profiel.types"
import axiosApi from "./axios.api"
import { UserPayloadDto } from "@/types/auth.types"


async function changePassword(payload: PasswordPayloadDto) {
const response = await axiosApi.post(`auth/user/change-password`, payload)
return response.data
}

async function updateUserData(userData: UserPayloadDto) {
const response = await axiosApi.patch(`auth/user`, userData)
return response.data
}

const profileApi = {
    changePassword,
    updateUserData
}

export default profileApi;