import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

import HttpRequest from '~/services/request'
const api = new HttpRequest()


interface RestaurantInfo {
  name: string
  cuisineType: string
  address: string
  phone: string
  email: string
  openingTime: string
  closingTime: string
  description: string
}

interface RestaurantStats {
  totalTables: number
  totalProducts: number
  totalWaiters: number
  monthlyOrders: number
}

interface RestaurantState {
  info: RestaurantInfo
  stats: RestaurantStats
  isLoading: boolean
  history: History[]
}

interface History {
  table_id  : string
  total_amount: number
  payment_type: string
  company_id: string
  created_at: string
  id: string
  user_name: string
}

export const useRestaurantStore = defineStore('restaurant', {
  state: (): RestaurantState => ({
    info: {
      name: 'La Bella Vista',
      cuisineType: 'italian',
      address: '123 Main Street, Downtown\nCity, State 12345',
      phone: '+1 (555) 123-4567',
      email: 'info@labellavista.com',
      openingTime: '09:00',
      closingTime: '22:00',
      description: 'Authentic Italian cuisine in the heart of downtown. Fresh ingredients, traditional recipes, and warm hospitality.'
    },
    stats: {
      totalTables: 24,
      totalProducts: 156,
      totalWaiters: 8,
      monthlyOrders: 1245
    },
    isLoading: false,
    history: [],
  }),

  getters: {
    restaurantInfo: (state) => state.info,
    restaurantStats: (state) => state.stats,
    restaurantHistory: (state) => state.history,
    isRestaurantOpen: (state) => {
      const now = new Date()
      const currentTime = now.getHours() * 100 + now.getMinutes()
      const openTime = parseInt(state.info.openingTime.replace(':', ''))
      const closeTime = parseInt(state.info.closingTime.replace(':', ''))
      return currentTime >= openTime && currentTime <= closeTime
    }
  },

  actions: {
    async list_history() {
      try {
        const res = await api.request('GET', `company-salesrecords/${useAuthStore().user?.company_id}`)
        
        this.history = []
        
        if (res.data.data && Array.isArray(res.data.data)) {
          this.history = res.data.data.map((item: any) => ({
            table_id: item.table_id,
            total_amount: item.total_amount,
            payment_type: item.payment_type,
            company_id: item.company_id,
            created_at: item.created_at,
            id: item.id,
            user_name: item.user_name
          }))

          console.log('History fetched successfully:', this.history)
        } else {
          console.warn('Unexpected data format:', res.data)
          this.history = []
        }
      }
      catch (error) {
        console.error('Error fetching history:', error)
        return []
      }
    },
    async updateRestaurantInfo(updates: Partial<RestaurantInfo>) {
      this.isLoading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        this.info = { ...this.info, ...updates }
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async fetchRestaurantStats() {
      this.isLoading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500))
        // In real app, this would fetch from API
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    }
  }
})