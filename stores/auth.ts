import { defineStore } from 'pinia'

interface User {
  id: number
  name: string,
  company_id : string,
  email: string
  role: string
  avatar: string
  restaurant: {
    name: string
    id: string
  }
}

import HttpRequest from "../services/request"

const api = new HttpRequest()

interface AuthState {
  user: User | null
  isLoading: boolean
}

interface LoginResponse {
  id: number
  name_user: string
  company_id: string
  restaurant: {
    trade_name: string
    id: string
  }
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
    async login(credentials: { username: string; password: string }) {
      this.isLoading = true

      try {
        const res = await api.request('POST', 'auth/login', credentials)
        console.log('Login successful:', res.data)



        const data = res.data as LoginResponse

        if (res.status !== 200) {
          console.error('Login failed:', res)
          return {
            success: false,
            id: data.id,
            name: data.name_user,
          }
        }

          const typedData = res.data as LoginResponse
     
          this.user = {
            id: typedData.id,
            name: typedData.name_user,
            company_id: typedData.company_id,
            email: '', 
            role: 'admin',
            avatar: 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg',
            restaurant: {
              name: typedData.restaurant.trade_name,
              id: typedData.restaurant.id
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