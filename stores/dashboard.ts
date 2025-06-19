import { defineStore } from 'pinia'

interface Order {
  id: number
  table: number
  items: number
  total: number
  status: 'completed' | 'preparing' | 'served' | 'cancelled'
  time: Date
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
      todayRevenue: 4250,
      todayOrders: 87,
      totalTables: 24,
      occupiedTables: 18,
      staffOnDuty: 8
    },
    recentOrders: [
      { id: 1045, table: 12, items: 3, total: 89.50, status: 'completed', time: new Date(Date.now() - 300000) },
      { id: 1044, table: 8, items: 5, total: 124.75, status: 'preparing', time: new Date(Date.now() - 600000) },
      { id: 1043, table: 15, items: 2, total: 45.30, status: 'completed', time: new Date(Date.now() - 900000) },
      { id: 1042, table: 3, items: 4, total: 78.90, status: 'served', time: new Date(Date.now() - 1200000) },
      { id: 1041, table: 21, items: 6, total: 156.25, status: 'completed', time: new Date(Date.now() - 1500000) }
    ],
    isLoading: false
  }),

  getters: {
    dashboardStats: (state) => state.stats,
    latestOrders: (state) => state.recentOrders.slice(0, 5),
    todayRevenue: (state) => state.stats.todayRevenue,
    occupancyRate: (state) => Math.round((state.stats.occupiedTables / state.stats.totalTables) * 100),
    completedOrdersToday: (state) => state.recentOrders.filter(o => o.status === 'completed').length
  },

  actions: {
    async fetchDashboardData() {
      this.isLoading = true
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        // In a real app, you would fetch data from your API here
        // For now, we'll just update the timestamp of recent orders
        this.recentOrders = this.recentOrders.map(order => ({
          ...order,
          time: new Date(Date.now() - Math.random() * 3600000) // Random time within last hour
        }))
        
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
        
        // Update stats with some random variation
        this.stats.todayRevenue += Math.floor(Math.random() * 100)
        this.stats.todayOrders += Math.floor(Math.random() * 5)
        
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
    }
  }
})