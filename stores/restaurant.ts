import { defineStore } from 'pinia'

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
    isLoading: false
  }),

  getters: {
    restaurantInfo: (state) => state.info,
    restaurantStats: (state) => state.stats,
    isRestaurantOpen: (state) => {
      const now = new Date()
      const currentTime = now.getHours() * 100 + now.getMinutes()
      const openTime = parseInt(state.info.openingTime.replace(':', ''))
      const closeTime = parseInt(state.info.closingTime.replace(':', ''))
      return currentTime >= openTime && currentTime <= closeTime
    }
  },

  actions: {
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