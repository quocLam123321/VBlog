let ApiRoots = 'http://localhost:8017' // Default API root

if (import.meta.env.VITE_BUILD_MODE === 'dev') {
  ApiRoots = 'http://localhost:8017'
} else if (import.meta.env.VITE_BUILD_MODE === 'production') {
  ApiRoots = 'https://api.vblog.xyz' // Placeholder or fallback
}

export const API_ENDPOINT = ApiRoots
export const DEFAULT_PAGE = 1
export const DEFAULT_ITEMS_PER_PAGE = 12

export const CARD_MEMBER_ACTIONS = {
  ADD: 'ADD',
  REMOVE: 'REMOVE'
}

export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}
