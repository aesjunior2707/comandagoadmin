<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Table History & Accounts</h1>
        <p class="text-gray-600">View order history and manage customer accounts</p>
      </div>
      <div class="flex gap-3">
        <button @click="exportData" class="btn-secondary">
          <DocumentArrowDownIcon class="w-4 h-4 mr-2" />
          Export
        </button>
        <button @click="refreshData" class="btn-primary">
          <ArrowPathIcon class="w-4 h-4 mr-2" />
          Refresh
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
            <p class="text-sm font-medium text-gray-600 mb-1">Today's Revenue</p>
            <p class="text-2xl font-bold text-gray-900">${{ todayRevenue }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <ReceiptPercentIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Orders Today</p>
            <p class="text-2xl font-bold text-gray-900">{{ todayOrders }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Avg Order Time</p>
            <p class="text-2xl font-bold text-gray-900">{{ avgOrderTime }}min</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-purple-100 rounded-lg">
            <StarIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Avg Rating</p>
            <p class="text-2xl font-bold text-gray-900">{{ avgRating }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Filters -->
    <div class="card mb-8">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
          <select v-model="selectedDateRange" class="input-field">
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="custom">Custom Range</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Table</label>
          <select v-model="selectedTable" class="input-field">
            <option value="">All Tables</option>
            <option v-for="table in availableTables" :key="table" :value="table">Table {{ table }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Waiter</label>
          <select v-model="selectedWaiter" class="input-field">
            <option value="">All Waiters</option>
            <option v-for="waiter in availableWaiters" :key="waiter" :value="waiter">{{ waiter }}</option>
          </select>
        </div>
        <div class="form-group">
          <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
          <select v-model="selectedStatus" class="input-field">
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
            <option value="refunded">Refunded</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Orders History Table -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div class="p-6 border-b border-gray-200">
        <div class="flex justify-between items-center">
          <h2 class="text-xl font-semibold text-gray-900">Recent Orders</h2>
          <div class="flex items-center gap-2">
            <span class="text-sm text-gray-600">{{ filteredOrders.length }} orders</span>
          </div>
        </div>
      </div>

      <div class="overflow-x-auto">
        <table class="data-table">
          <thead>
            <tr>
              <th>Order #</th>
              <th>Table</th>
              <th>Waiter</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody class="bg-white divide-y divide-gray-200">
            <tr v-for="order in paginatedOrders" :key="order.id">
              <td class="font-medium">
                #{{ order.id.toString().padStart(4, '0') }}
              </td>
              <td>Table {{ order.table }}</td>
              <td>{{ order.waiter }}</td>
              <td>{{ order.items.length }} items</td>
              <td class="font-semibold">${{ order.total.toFixed(2) }}</td>
              <td>
                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                      :class="getStatusBadgeClass(order.status)">
                  {{ order.status }}
                </span>
              </td>
              <td class="text-gray-500">{{ formatDate(order.date) }}</td>
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

const selectedDateRange = ref('today')
const selectedTable = ref('')
const selectedWaiter = ref('')
const selectedStatus = ref('')
const currentPage = ref(1)
const itemsPerPage = ref(10)

// Sample data
const orders = ref([
  {
    id: 1001,
    table: 5,
    waiter: 'John Doe',
    items: [
      { name: 'Margherita Pizza', quantity: 1, price: 18.99 },
      { name: 'Caesar Salad', quantity: 1, price: 14.99 }
    ],
    total: 33.98,
    status: 'completed',
    date: new Date('2024-01-25T12:30:00'),
    paymentMethod: 'Credit Card'
  },
  {
    id: 1002,
    table: 12,
    waiter: 'Jane Smith',
    items: [
      { name: 'Spaghetti Carbonara', quantity: 2, price: 16.99 },
      { name: 'Tiramisu', quantity: 1, price: 8.99 }
    ],
    total: 42.97,
    status: 'completed',
    date: new Date('2024-01-25T13:15:00'),
    paymentMethod: 'Cash'
  },
  {
    id: 1003,
    table: 3,
    waiter: 'Mike Johnson',
    items: [
      { name: 'Grilled Salmon', quantity: 1, price: 24.99 }
    ],
    total: 24.99,
    status: 'cancelled',
    date: new Date('2024-01-25T14:00:00'),
    paymentMethod: 'Credit Card'
  },
  {
    id: 1004,
    table: 8,
    waiter: 'Sarah Wilson',
    items: [
      { name: 'Bruschetta', quantity: 2, price: 9.99 },
      { name: 'Chicken Caesar Salad', quantity: 1, price: 14.99 }
    ],
    total: 34.97,
    status: 'completed',
    date: new Date('2024-01-25T15:30:00'),
    paymentMethod: 'Credit Card'
  }
])

const availableTables = computed(() => [...new Set(orders.value.map(o => o.table))].sort((a, b) => a - b))
const availableWaiters = computed(() => [...new Set(orders.value.map(o => o.waiter))].sort())

const todayRevenue = computed(() => {
  return orders.value
    .filter(o => o.status === 'completed' && isToday(o.date))
    .reduce((sum, o) => sum + o.total, 0)
    .toFixed(2)
})

const todayOrders = computed(() => {
  return orders.value.filter(o => isToday(o.date)).length
})

const avgOrderTime = computed(() => 25) // Placeholder
const avgRating = computed(() => 4.6) // Placeholder

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
  return date.toDateString() === today.toDateString()
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
</script>