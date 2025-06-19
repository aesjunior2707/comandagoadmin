import { defineStore } from 'pinia'

import HttpRequest from '~/services/request'

import { useAuthStore } from './auth'

const api = new HttpRequest()

interface Table {
  id: string
  description: string
  status:string
  company_id: string
}

interface TableState {
  tables: Table[]
  isLoading: boolean
}

export const useTablesStore = defineStore('tables', {
  state: (): TableState => ({
    tables: [
     
    ],
    isLoading: false
  }),

  getters: {
    allTables: (state) => state.tables,
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
    async addTable(description : string) {
      this.isLoading = true
      try {
        const content  = {
          'id': description,
          'description' : description,
          'status': 'available',
          'company_id': useAuthStore().user?.company_id
        }
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