import { defineStore } from 'pinia'

import HttpRequest from '~/services/request'

import { useAuthStore } from './auth'

const api = new HttpRequest()

interface Table {
  id: string
  description: string
  status: string
  company_id: string
}

interface TableState {
  tables: Table[],
  ItemsConfirmed: Order[],
  isLoading: boolean;
}

export interface Order {
  company_id: string
  created_at: string
  id: string
  note: string
  product_description: string
  product_id: string
  quantity: number
  status: string,
  table_id: string
  total_price: number
  unit_price: number
  updated_at: string
  user_id: string
  user_name: string
}

export const useTablesStore = defineStore('tables', {
  state: (): TableState => ({
    tables: [

    ],
    ItemsConfirmed: [],
    isLoading: false
  }),

  getters: {
    allTables: (state) => state.tables,
    allOrders: (state) => state.ItemsConfirmed,
    availableTables: (state) => state.tables.filter(t => t.status === 'available'),
    occupiedTables: (state) => state.tables.filter(t => t.status === 'occupied'),
    reservedTables: (state) => state.tables.filter(t => t.status === 'reserved'),
    outOfServiceTables: (state) => state.tables.filter(t => t.status === 'out-of-service'),
    totalTables: (state) => state.tables.length,
    tableStatusCounts: (state) => ({
      available: state.tables.filter(t => t.status === 'available').length,
      occupied: state.tables.filter(t => t.status === 'occupied').length,
      reserved: state.tables.filter(t => t.status === 'reserved').length,
      outOfService: state.tables.filter(t => t.status === 'out-of-service').length
    }),
    getTableById: (state) => (id: number) => state.tables.find(t => t.id === id)
  },

  actions: {
    async selectTable(mesaId: string) {
      try {
        this.ItemsConfirmed = []
        
        const res = await api.request('GET', `company-orders/${useAuthStore().user?.company_id}?table=${mesaId}`)

        const responseData = res.data as { data: Order[] };
        responseData.data.forEach(order => {
          this.ItemsConfirmed.push({
            id: order.id,
            company_id: order.company_id,
            created_at: order.created_at,
            note: order.note,
            product_description: order.product_description,
            product_id: order.product_id,
            quantity: order.quantity,
            status: order.status,
            table_id: order.table_id,
            total_price: order.total_price,
            unit_price: order.unit_price,
            updated_at: order.updated_at,
            user_id: order.user_id,
            user_name: order.user_name
          })
        })

        console.log('Orders fetched for table:', mesaId, this.ItemsConfirmed)
      }
      catch (error) {
        console.error('Error fetching orders for table:', error)
      }
    },
    async addTable(description: String) {
      this.isLoading = true
      try {
        const content = {
          'id': String(description),
          'description': String(description),
          'status': 'available',
          'company_id': useAuthStore().user?.company_id
        }

        console.log('Adding table with content:', content)
        const res = await api.request('POST', 'company-tables/', content)
        console.log('Table added successfully:', res.data)

        this.listar_mesas()
        return true
      } catch (error: any) {
        console.log('Error adding table:', error)
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },


    async listar_mesas() {
      try {
        const res = await api.request('GET', `company-tables/${useAuthStore().user?.company_id}`)

        this.tables = []

        const tables = (res.data as { data: Table[] }).data; // Explicitly cast res.data to the expected structure

        tables?.forEach((table: Table) => {
          this.tables.push({
            id: table.id,
            description: table.description,
            status: table.status,
            company_id: table.company_id
          })
        })
      }
      catch (error: any) {
        console.error('Error listing tables:', error)
        return { success: false, error: error.message }
      }
    }
  }
})