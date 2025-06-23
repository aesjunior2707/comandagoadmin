import { defineStore } from 'pinia'
import { useTablesStore } from './tables'
import { useProductsStore } from './products'
import { useAuthStore } from './auth'

import HttpRequest from '~/services/request'
const api = new HttpRequest()

interface Order {
  table_id: string
  created_at: string
  product_description: string
  quantity: number
  total_price: number
  user_name : string

}

interface DashboardStats {
  todayRevenue: number
  todayOrders: number
  totalTables: number
  occupiedTables: number
  staffOnDuty: number
}

interface DashboardState {
  stats: DashboardStats
  recentOrders: Order[]
  isLoading: boolean
}

export const useDashboardStore = defineStore('dashboard', {
  state: (): DashboardState => ({
    stats: {
      todayRevenue: 0,
      todayOrders: 0,
      totalTables: 0,
      occupiedTables: 0,
      staffOnDuty: 0
    },
    recentOrders: [
    ]
    ,
    isLoading: false
  }),

  getters: {
    dashboardStats: (state) => state.stats,
    latestOrders: (state) => state.recentOrders.slice(0, 5),
    todayRevenue: (state) => state.stats.todayRevenue,
    occupancyRate: (state) => Math.round((state.stats.occupiedTables / state.stats.totalTables) * 100),
    completedOrdersToday: (state) => state.recentOrders
  },

  actions: {
    async fetchDashboardData() {
      this.isLoading = true
      try {
        useTablesStore().listar_mesas()
        useProductsStore().list_products()
        this.get_orders_company()

        const res = await api.request('GET', `dashboards/home-page?company_id=${useAuthStore().user?.company_id}`)
       
        this.stats.todayRevenue = res.data.total_amount
        this.stats.todayOrders = res.data.total_orders
        console.log('Stats updated:', this.stats)
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, you would fetch data from your API here
        // For now, we'll just update the timestamp of recent orders

        
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async refreshStats() {
      this.isLoading = true
      try {
        // Simulate API call to refresh stats
        await new Promise(resolve => setTimeout(resolve, 500))
        
      
        
        return { success: true }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    addNewOrder(order: Omit<Order, 'id'>) {
      const newOrder: Order = {
        id: Math.max(...this.recentOrders.map(o => o.id)) + 1,
        ...order
      }
      this.recentOrders.unshift(newOrder)
      
      // Keep only the latest 10 orders
      if (this.recentOrders.length > 10) {
        this.recentOrders = this.recentOrders.slice(0, 10)
      }
      
      // Update stats
      this.stats.todayOrders++
      if (order.status === 'completed') {
        this.stats.todayRevenue += order.total
      }
    },
    async get_orders_company() {
      try {
          const res = await api.request('GET', `company-orders/${useAuthStore().user?.company_id}`)
          this.recentOrders = []
          const orders = (res.data as { data: Order[] }).data; 
          
          orders?.forEach((order: Order) => {
            this.recentOrders.push({
              table_id: order.table_id,
              created_at: order.created_at,
              product_description: order.product_description,
              quantity: order.quantity,
              total_price: order.total_price,
              user_name : order.user_name
            })
          })
      }
      catch (error: any) {
        console.error('Error fetching company orders:', error)
        return { success: false, error: error.message }
      }
    }
  }
})