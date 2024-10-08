import { AuthTokenDto, UserDto } from '@/types/auth.types';
import { jwtDecode } from 'jwt-decode';
import { RANDOM_COLORS } from '@/constants/data';
import { ColumnFiltersState } from '@tanstack/react-table';
import moment from 'moment-hijri';
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
  type?: 'georgian' | 'hijri';
}

export function formatDate(
  dateString: string,
  options: FormatOptions = { format: 'full', type: 'hijri', includeTime: false }
): string {
  const { format, includeTime } = options;

  let dateFormat;
  if (options.type === 'georgian') {
    dateFormat = format === 'short' ? 'YYYY-M-D' : 'YYYY MMMM DD';
  } else {
    dateFormat = format === 'short' ? 'iYYYY-iM-iD' : 'iYYYY iMMMM iDD';
  }

  if (includeTime) {
    dateFormat += ' HH:mm';
  }

  return moment(dateString).format(dateFormat);
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

export function parseFilter(
  filters: Record<string, unknown>,
  options: {
    skipNull?: boolean;
    skipEmpty?: boolean;
    skipUndefined?: boolean;
    override: boolean;
  } = {
    skipNull: true,
    skipEmpty: true,
    skipUndefined: true,
    override: false
  }
) {
  // Convert the obj object to query string
  const query = Object.entries(filters)
    .map(([key, value]) => {
      // Skip null values
      if (options.skipNull && value === null) {
        return null;
      }

      // Skip empty values
      if (options.skipEmpty && value === '') {
        return null;
      }

      // Skip undefined values
      if (options.skipUndefined && value === undefined) {
        return null;
      }

      return `${key}=${value}`;
    })
    .filter((item) => !!item) // Remove null values
    .join('&');

  return query;
}

export function combineFilters(query1: string, query2: string) {
  if (query1 && query2) return `${query1}&${query2}`;
  if (query1 && !query2) return query1;

  return query2;
}

export function formatTableFilters(filters: ColumnFiltersState) {
  const formattedFilters: any = {};
  Object.entries(filters).forEach(([value, filter]) => {
    if (Array.isArray(filter.value)) {
      formattedFilters[filter.id] = filter.value.join(',');
    } else {
      formattedFilters[filter.id] = filter.value;
    }
  });
  return formattedFilters;
}
