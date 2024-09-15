import { AuthTokenDto, UserDto } from '@/types/auth.types';
import { jwtDecode } from 'jwt-decode';
import dayjs from 'dayjs';
import { RANDOM_COLORS } from '@/constants/data';

const AUTH_TOKEN_NAME = 'auth' as const;

export function saveAuthTokenToLocalStorage(token: AuthTokenDto) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(AUTH_TOKEN_NAME, JSON.stringify(token));
  }
}

export function getAuthTokenFromLocalStorage(): AuthTokenDto | undefined {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem(AUTH_TOKEN_NAME);
    return token ? JSON.parse(token) : null;
  }
}

export function removeAuthTokenFromLocalStorage() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_TOKEN_NAME);
  }
}

export function getUserInfoFromJWT(token: string): UserDto | null {
  try {
    // Decode the token
    const decodedToken: any = decodeToken(token);

    // Extract user info
    const userInfo: UserDto = {
      id: decodedToken.id,
      userName: decodedToken.userName,
      email: decodedToken.email,
      is_admin: decodedToken.roles,
      avatar: decodedToken.avatar
    };

    return userInfo;
  } catch (error) {
    return null; // Handle invalid or expired token
  }
}

export function wait(milliseconds: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, milliseconds);
  });
}

export function getAvailableTimezones() {
  return ['UTC'].concat(Intl.supportedValuesOf('timeZone'));
}

function decodeToken(token: string) {
  try {
    const decoded = jwtDecode(token);
    return decoded;
  } catch (error) {
    return null;
  }
}

export function getAvailableTimezonesOptionList() {
  return getAvailableTimezones()
    .filter((zone) => zone !== 'Asia/Jerusalem')
    .map((zone) => ({
      label: zone,
      value: zone
    }));
}

export const AVAILABLE_TIMEZONES_OPTIONS = getAvailableTimezonesOptionList();

// Helper function to parse the filter object as query string
export function parseSearchQuery(obj: Record<string, any>) {
  // Convert the obj object to query string
  const query = Object.entries(obj)
    .map(([key, value]) => {
      return `${key}=${value}`;
    })
    .join('&');

  return query;
}

// TODO: This function needs improvements for a better formatting
export function formatCurrency(
  amount: number,
  options: {
    locale?: string;
    currency?: string;
    minimumFractionDigits?: number;
    maximumFractionDigits?: number;
    [key: string]: any;
  } = {}
): string {
  const {
    locale = 'ar-MA',
    currency = 'DHS',
    minimumFractionDigits = 0,
    maximumFractionDigits = 2,
    ...restOptions
  } = options;

  return new Intl.NumberFormat(locale, {
    ...restOptions,
    minimumFractionDigits,
    maximumFractionDigits,
    style: 'currency',
    currency: currency
  }).format(amount);
}

// generate random colors
export function generateColorsFromString(str: string, intensity: number = 1) {
  // Ensure intensity is within the 1-10 range
  const adjustedIntensity = Math.min(Math.max(intensity, 1), 10);

  // Use the string length and intensity to create a base value
  const baseValue = str.length * adjustedIntensity;

  // Combine the base value with a unique seed from the string content
  const uniqueSeed = str
    .split('')
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  // Calculate the final index
  const colorIndex = (baseValue + uniqueSeed) % RANDOM_COLORS.length;

  return {
    vibrantColor: RANDOM_COLORS[colorIndex][600],
    shinyColor: RANDOM_COLORS[colorIndex][200]
  };
}
// date format
interface FormatOptions {
  format?: 'full' | 'short';
  includeTime?: boolean;
}

export function formatDate(
  dateString: string,
  options: FormatOptions = { format: 'full' }
): string {
  const { format, includeTime } = options;

  let dateFormat = format === 'short' ? 'DD MMM YYYY' : 'DD MMMM YYYY';

  if (includeTime) {
    dateFormat += ' HH:mm';
  }

  return dayjs(dateString).format(dateFormat);
}

// debounce function
export function debounce(func: Function, delay: number) {
  let timer: NodeJS.Timeout;
  return function (...args: any[]) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func(...args);
    }, delay);
  };
}
