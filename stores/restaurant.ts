import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

import HttpRequest from '~/services/request'
const api = new HttpRequest()


interface RestaurantInfo {
  trade_name: string
  legal_name: string
  address: string
  contact_phone: string
  contact_email: string | null
  responsible_person: string
  tax_id: string | null
  created_at: string
  updated_at: string
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
      legal_name : '',
      trade_name: '',
      address: '',
      contact_phone: '',
      contact_email: null,
      responsible_person: '',
      tax_id: null,
      created_at: '',
      updated_at: ''
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
  },

  actions: {
    async fetchRestaurantInfo() {
      try {
          const res = await api.request('GET', `companies/${useAuthStore().user?.company_id}`)
          if (res.data && res.data.data) {
            this.info = {
              legal_name: res.data.data.legal_name || '',
              trade_name: res.data.data.trade_name || '',
              address: res.data.data.address || '',
              contact_phone: res.data.data.contact_phone || '',
              contact_email: res.data.data.contact_email || null,
              responsible_person: res.data.data.responsible_person || '',
              tax_id: res.data.data.tax_id || null,
              created_at: res.data.data.created_at || '',
              updated_at: res.data.data.updated_at || ''
            }
          }
      }
      catch (error) {
        console.error('Error fetching restaurant info:', error)
      }
    },
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
    },

    async clear_all_table(tableId: string) {
      this.isLoading = true
      try {
        const res = await api.request('DELETE', `company-orders/${useAuthStore().user?.company_id}/table/${tableId}`)
        
        if (res.data && res.data.success) {
          // Optionally, you can update the state or perform other actions
          return { success: true }
        } else {
          return { success: false, error: 'Failed to clear table' }
        }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

  }
})