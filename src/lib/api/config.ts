
// API base URL
export const API_BASE_URL = 'https://api.yourbackend.com';

// API endpoints
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
  },
  CONTENT: {
    GET_ALL: '/content',
    GET_BY_ID: (id: string) => `/content/${id}`,
    CREATE: '/content',
    UPDATE: (id: string) => `/content/${id}`,
    DELETE: (id: string) => `/content/${id}`,
    TOGGLE_STATUS: (id: string) => `/content/${id}/toggle-status`,
  },
  USERS: {
    GET_ALL: '/users',
    GET_BY_ID: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string | number) => `/users/${id}`,
    DELETE: (id: string | number) => `/users/${id}`,
    SUSPEND: (id: string | number) => `/users/${id}/suspend`,
    RESET_PASSWORD: (id: string | number) => `/users/${id}/reset-password`,
  },
  VOICE_MODELS: {
    GET_ALL: '/voice-models',
    GET_BY_ID: (id: string) => `/voice-models/${id}`,
    CREATE: '/voice-models',
    UPDATE: (id: string) => `/voice-models/${id}`,
    DELETE: (id: string) => `/voice-models/${id}`,
    TOGGLE_STATUS: (id: string) => `/voice-models/${id}/toggle-status`,
  },
  SPEAKING_CHALLENGES: {
    GET_ALL: '/speaking-challenges',
    GET_BY_ID: (id: number) => `/speaking-challenges/${id}`,
    CREATE: '/speaking-challenges',
    UPDATE: (id: number) => `/speaking-challenges/${id}`,
    DELETE: (id: number) => `/speaking-challenges/${id}`,
    TOGGLE_STATUS: (id: number) => `/speaking-challenges/${id}/toggle-status`,
  }
};