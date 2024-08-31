import { AuthTokenDto, UserDto } from "@/types/auth.types"
import { jwtDecode } from "jwt-decode"

const AUTH_TOKEN_NAME = "auth" as const

export function saveAuthTokenToLocalStorage(token: AuthTokenDto) {
  localStorage.setItem(AUTH_TOKEN_NAME, JSON.stringify(token))
}

export function getAuthTokenFromLocalStorage(): AuthTokenDto | null {
  const token = localStorage.getItem(AUTH_TOKEN_NAME)
  return token ? JSON.parse(token) : null
}

export function removeAuthTokenFromLocalStorage() {
  localStorage.removeItem(AUTH_TOKEN_NAME)
}

export function getUserInfoFromJWT (token: string): UserDto | null {
  try {
    // Decode the token
    const decodedToken: any = jwtDecode(token);

    // Extract user info
    const userInfo: UserDto = {
      id: decodedToken.id,
      userName: decodedToken.username,  
      email: decodedToken.email, 
      is_admin: decodedToken.roles, 
      avatar: decodedToken.avatar,
    };

    return userInfo;
  } catch (error) {
    console.error('Invalid token:', error);
    return null; // Handle invalid or expired token
  }
};


export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })
}

export function getAvailableTimezones() {
  return ["UTC"].concat(Intl.supportedValuesOf("timeZone"))
}

export function getAvailableTimezonesOptionList() {
  return getAvailableTimezones()
    .filter((zone) => zone !== "Asia/Jerusalem")
    .map((zone) => ({
      label: zone,
      value: zone,
    }))
}

export const AVAILABLE_TIMEZONES_OPTIONS = getAvailableTimezonesOptionList()

// Helper function to parse the filter object as query string
export function parseSearchQuery(obj: Record<string, any>) {
  // Convert the obj object to query string
  const query = Object.entries(obj)
    .map(([key, value]) => {
      return `${key}=${value}`
    })
    .join("&")

  return query
}

// TODO: This function needs improvements for a better formatting
export function formatCurrency(
  amount: number,
  options: {
    locale?: string
    currency?: string
    minimumFractionDigits?: number
    maximumFractionDigits?: number
    [key: string]: any
  } = {},
): string {
  const {
    locale = "ar-MA",
    currency = "DHS",
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    ...restOptions
  } = options

  console.log(restOptions)

  return new Intl.NumberFormat(locale, {
    ...restOptions,
    minimumFractionDigits,
    maximumFractionDigits,
    style: "currency",
    currency: currency,
  }).format(amount)
}

// generate random colors

const colorVariants = [
  {
    name: "Slate",
    200: "rgb(226, 232, 240)",
    600: "rgb(71, 85, 105)",
  },
  {
    name: "Gray",
    200: "rgb(229, 231, 235)",
    600: "rgb(75, 85, 99)",
  },
  {
    name: "Zinc",
    200: "rgb(228, 228, 231)",
    600: "rgb(82, 82, 91)",
  },
  {
    name: "Neutral",
    200: "rgb(229, 229, 229)",
    600: "rgb(82, 82, 82)",
  },
  {
    name: "Stone",
    200: "rgb(231, 229, 228)",
    600: "rgb(87, 83, 78)",
  },
  {
    name: "Red",
    200: "rgb(254, 202, 202)",
    600: "rgb(220, 38, 38)",
  },
  {
    name: "Orange",
    200: "rgb(254, 215, 170)",
    600: "rgb(234, 88, 12)",
  },
  {
    name: "Amber",
    200: "rgb(253, 230, 138)",
    600: "rgb(217, 119, 6)",
  },
  {
    name: "Yellow",
    200: "rgb(254, 240, 138)",
    600: "rgb(202, 138, 4)",
  },
  {
    name: "Lime",
    200: "rgb(217, 249, 157)",
    600: "rgb(101, 163, 13)",
  },
  {
    name: "Green",
    200: "rgb(187, 247, 208)",
    600: "rgb(22, 163, 74)",
  },
  {
    name: "Emerald",
    200: "rgb(167, 243, 208)",
    600: "rgb(5, 150, 105)",
  },
  {
    name: "Teal",
    200: "rgb(153, 246, 228)",
    600: "rgb(13, 148, 136)",
  },
  {
    name: "Cyan",
    200: "rgb(165, 243, 252)",
    600: "rgb(8, 145, 178)",
  },
  {
    name: "Sky",
    200: "rgb(186, 230, 253)",
    600: "rgb(2, 132, 199)",
  },
  {
    name: "Blue",
    200: "rgb(191, 219, 254)",
    600: "rgb(37, 99, 235)",
  },
  {
    name: "Indigo",
    200: "rgb(199, 210, 254)",
    600: "rgb(79, 70, 229)",
  },
  {
    name: "Violet",
    200: "rgb(221, 214, 254)",
    600: "rgb(124, 58, 237)",
  },
  {
    name: "Purple",
    200: "rgb(233, 213, 255)",
    600: "rgb(147, 51, 234)",
  },
  {
    name: "Fuchsia",
    200: "rgb(245, 208, 254)",
    600: "rgb(192, 38, 211)",
  },
  {
    name: "Pink",
    200: "rgb(251, 207, 232)",
    600: "rgb(219, 39, 119)",
  },
  {
    name: "Rose",
    200: "rgb(254, 205, 211)",
    600: "rgb(225, 29, 72)",
  },
]

export function generateColorsFromString(str: string) {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  // Convert hash to a positive number
  hash = Math.abs(hash)

  // Get the index from the hash
  const colorIndex = hash % colorVariants.length

  return {
    vibrantColor: colorVariants[colorIndex][600],
    shinyColor: colorVariants[colorIndex][200],
  }
}
