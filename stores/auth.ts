import { defineStore } from 'pinia'

interface User {
  id: number
  name: string
  email: string
  role: string
  avatar: string
  restaurant: {
    name: string
    id: string
  }
}

interface AuthState {
  user: User | null
  isLoading: boolean
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null,
    isLoading: false
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    restaurantName: (state) => state.user?.restaurant?.name || '',
    userRole: (state) => state.user?.role || ''
  },

  actions: {
    async login(credentials: { email: string; password: string }) {
      this.isLoading = true
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1500))
        
        // Mock authentication - in real app, this would be an API call
        this.user = {
          id: 1,
          name: 'Restaurant Admin',
          email: credentials.email,
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          restaurant: {
            name: 'La Bella Vista',
            id: 'rest_001'
          }
        }
        
        await navigateTo('/')
        return { success: true }
      } catch (error: any) {
        return { 
          success: false, 
          error: error.message || 'Login failed' 
        }
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      this.user = null
      await navigateTo('/login')
    },

    updateProfile(updates: Partial<User>) {
      if (this.user) {
        this.user = { ...this.user, ...updates }
      }
    },

    // Initialize user from stored session (for SSR/hydration)
    initializeAuth() {
      // In a real app, you might check localStorage or cookies here
      // For now, we'll keep it simple
    }
  },

  persist: {
    storage: persistedState.localStorage,
    paths: ['user']
  }
})