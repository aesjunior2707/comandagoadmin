import { defineStore } from 'pinia'
import { useAuthStore } from './auth'

import HttpRequest from '~/services/request'
const api = new HttpRequest()


interface Colaborador {
  company_id: string
  created_at: string
  id: string
  name: string
  password: string
  updated_at: string
  user_type: string
  username: string
}

interface WaiterState {
  waiters: Colaborador[]
  isLoading: boolean
}

export const useWaitersStore = defineStore('waiters', {
  state: (): WaiterState => ({
    waiters: [
    ],
    isLoading: false
  }),

  getters: {
    allWaiters: (state) => state.waiters,
    onDutyWaiters: (state) => state.waiters,
    onBreakWaiters: (state) => state.waiters,
    offDutyWaiters: (state) => state.waiters,
    totalWaiters: (state) => state.waiters.length,
    topPerformingWaiters: (state) =>
      [...state.waiters]

        .slice(0, 3),
    getWaiterById: (state) => (id: number) => state.waiters,
    waiterStatusCounts: (state) => ({
      onDuty: state.waiters.length,
      onBreak: state.waiters.length,
      offDuty: state.waiters.length
    })
  },

  actions: {
    async list_users() {
      try {
        const res = await api.request('GET', `users/${useAuthStore().user?.company_id}`)

        res.data.data.forEach((user: Colaborador) => {
          const existingWaiter = this.waiters.find(w => w.id === user.id)
          if (!existingWaiter) {
            this.waiters.push({
              ...user
            })
          }
        })
      }
      
      catch (error: any) {
        console.error('Error fetching waiters:', error)
        return { success: false, error: error.message }
      }
    },



  }
})