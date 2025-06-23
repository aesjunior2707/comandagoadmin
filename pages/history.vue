<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Histórico de Mesas e Contas</h1>
        <p class="text-gray-600">Ver histórico de pedidos e gerenciar contas de clientes</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportData" class="btn-secondary">
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          Exportar
        </button>
        <button @click="refreshData" class="btn-primary">
          <ArrowPathIcon class="w-4 h-4 mr-2" />
          Atualizar
        </button>
      </div>
    </div>

    <!-- Summary Stats -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <CurrencyDollarIcon class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Faturamento de Hoje</p>
            <p class="text-2xl font-bold text-gray-900">R${{ todayRevenue }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <ReceiptPercentIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Pedidos de Hoje</p>
            <p class="text-2xl font-bold text-gray-900">{{ todayOrders }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Período de Datas</label>
          <select v-model="selectedDateRange" class="input-field">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Mesas</label>
          <select v-model="selectedTable" class="input-field">
            <option value="">All Tables</option>
            <option v-for="table in availableTables" :key="table" :value="table">Table {{ table }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Garçons</label>
          <select v-model="selectedWaiter" class="input-field">
            <option value="">All Waiters</option>
            <option v-for="waiter in availableWaiters" :key="waiter" :value="waiter">{{ waiter }}</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Orders History Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Histórico</h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ filteredOrders.length }} orders</span>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Data de Fechamento</th>
              <th>Garçom</th>
              <th>Total</th>
              <th>Tipo de Pagamento</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in orders" :key="order.id">
              <td class="font-medium">
                {{ order.table_id }}
              </td>
              <td>{{ order.created_at }}</td>
              <td>{{ order.user_name }}</td>
              <td  class="font-semibold">R$ {{ order.total_amount.toFixed(2) }}</td>
              <td>{{ order.payment_type }}</td>
              <td>
                <div class="flex gap-2">
                  <button @click="viewOrderDetails(order)" class="text-emerald-600 hover:text-emerald-900 text-sm font-medium">
                    View
                  </button>
                  <button @click="printReceipt(order)" class="text-gray-600 hover:text-gray-900 text-sm font-medium">
                    Print
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Pagination -->
      <div class="flex items-center justify-between p-6 border-t border-gray-200">
        <div class="text-sm text-gray-700">
          Showing {{ ((currentPage - 1) * itemsPerPage) + 1 }} to {{ Math.min(currentPage * itemsPerPage, filteredOrders.length) }} of {{ filteredOrders.length }} results
        </div>
        <div class="flex gap-2">
          <button @click="currentPage--" :disabled="currentPage === 1" 
                  class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded font-medium">
            Previous
          </button>
          <button @click="currentPage++" :disabled="currentPage >= totalPages" 
                  class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded font-medium">
            Next
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  DocumentArrowDownIcon, 
  ArrowPathIcon, 
  CurrencyDollarIcon, 
  ReceiptPercentIcon, 
  ClockIcon,
  StarIcon
} from '@heroicons/vue/24/outline'
import { onMounted } from 'vue'

import {useRestaurantStore} from '@/stores/restaurant'

definePageMeta({
  middleware: 'auth'
})

const selectedDateRange = ref('today')
const selectedTable = ref('')
const selectedWaiter = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample data
const orders = computed(() => useRestaurantStore().restaurantHistory)

const availableTables = computed(() => [...new Set(orders.value.map(o => o.table))].sort((a, b) => a - b))
const availableWaiters = computed(() => [...new Set(orders.value.map(o => o.waiter))].sort())

const todayRevenue = computed(() => {
  return orders.value
    .filter(o => o.status === 'completed' && isToday(o.date))
    .reduce((sum, o) => sum + o.total, 0)
    .toFixed(2)
})

const todayOrders = computed(() => {
  return 1
})



const filteredOrders = computed(() => {
  let filtered = orders.value

  // Filter by table
  if (selectedTable.value) {
    filtered = filtered.filter(o => o.table === parseInt(selectedTable.value))
  }

  // Filter by waiter
  if (selectedWaiter.value) {
    filtered = filtered.filter(o => o.waiter === selectedWaiter.value)
  }

  // Filter by status
  if (selectedStatus.value) {
    filtered = filtered.filter(o => o.status === selectedStatus.value)
  }

  // Filter by date range
  if (selectedDateRange.value === 'today') {
    filtered = filtered.filter(o => isToday(o.date))
  }

  return filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value))

const paginatedOrders = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value
  const end = start + itemsPerPage.value
  return filteredOrders.value.slice(start, end)
})

const isToday = (date) => {
  const today = new Date()
  return today
}

const formatDate = (date) => {
  return date.toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'completed': 'bg-green-100 text-green-800',
    'cancelled': 'bg-red-100 text-red-800',
    'refunded': 'bg-yellow-100 text-yellow-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const viewOrderDetails = (order) => {
  console.log('View order details:', order)
  // Show detailed modal or navigate to order details page
}

const printReceipt = (order) => {
  console.log('Print receipt for order:', order)
  // Implement receipt printing functionality
}

const exportData = () => {
  console.log('Export data')
  // Implement data export functionality
}

const refreshData = () => {
  console.log('Refresh data')
  // Implement data refresh functionality
}

// Reset pagination when filters change
watch([selectedTable, selectedWaiter, selectedStatus, selectedDateRange], () => {
  currentPage.value = 1
})

onMounted(async() => {
  console.log("Fetching restaurant history data...")
  await useRestaurantStore().list_history()
})
</script>