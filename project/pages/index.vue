<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Bem-vindo de volta, {{ user?.name }}.  Veja o que está acontecendo no {{ user?.restaurant?.name }} hoje.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex space-x-3">
        <button class="btn-secondary">
          <ArrowPathIcon class="w-4 h-4 mr-2" />
          Refresh
        </button>
        <button class="btn-primary">
          <PlusIcon class="w-4 h-4 mr-2" />
          Quick Order
        </button>
      </div>
    </div>

    <!-- Key Metrics -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="stat-icon bg-emerald-100">
            <CurrencyDollarIcon class="w-6 h-6 text-emerald-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">Faturamento de Hoje</p>
            <div class="flex items-baseline space-x-2">
              <p class="text-2xl font-bold text-gray-900">R${{ stats.todayRevenue.toLocaleString() }}</p>
              <span class="text-sm font-medium text-emerald-600">+12.5%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="stat-icon bg-blue-100">
            <ReceiptPercentIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">Total de Pedidos de Hoje</p>
            <div class="flex items-baseline space-x-2">
              <p class="text-2xl font-bold text-gray-900">{{ stats.todayOrders }}</p>
              <span class="text-sm font-medium text-blue-600">+8.2%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="stat-icon bg-yellow-100">
            <TableCellsIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">Mesas Ocupadas</p>
            <div class="flex items-baseline space-x-2">
              <p class="text-2xl font-bold text-gray-900">{{ stats.occupiedTables }}/{{ stats.totalTables }}</p>
              <span class="text-sm font-medium text-yellow-600">{{ Math.round((stats.occupiedTables / stats.totalTables) * 100) }}%</span>
            </div>
          </div>
        </div>
      </div>

      <div class="stat-card">
        <div class="flex items-center space-x-4">
          <div class="stat-icon bg-purple-100">
            <UserGroupIcon class="w-6 h-6 text-purple-600" />
          </div>
          <div class="flex-1">
            <p class="text-sm font-medium text-gray-600 mb-1">Total de Garçons</p>
            <div class="flex items-baseline space-x-2">
              <p class="text-2xl font-bold text-gray-900">{{ stats.staffOnDuty }}</p>
              <span class="text-sm font-medium text-purple-600">Ativo</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Recent Orders -->
      <div class="lg:col-span-2">
        <div class="card">
          <div class="card-header">
            <div class="flex items-center justify-between">
              <h2 class="text-lg font-semibold text-gray-900">Pedidos Recentes</h2>
              <NuxtLink to="/history" class="text-sm font-medium text-emerald-600 hover:text-emerald-700">
                Ver Todos os Pedidos
              </NuxtLink>
            </div>
          </div>
          <div class="card-body">
            <div class="overflow-x-auto">
              <table class="data-table">
                <thead>
                  <tr>
                    <th>Order</th>
                    <th>Table</th>
                    <th>Items</th>
                    <th>Total</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in recentOrders" :key="order.id">
                    <td>
                      <div class="font-medium text-gray-900">#{{ order.id.toString().padStart(4, '0') }}</div>
                      <div class="text-sm text-gray-500">{{ formatTime(order.time) }}</div>
                    </td>
                    <td class="font-medium">Table {{ order.table }}</td>
                    <td class="text-gray-600">{{ order.items }} items</td>
                    <td class="font-semibold">R${{ order.total.toFixed(2) }}</td>
                    <td>
                      <span :class="getOrderStatusClass(order.status)" class="badge">
                        {{ order.status }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Sidebar -->
      <div class="space-y-6">
        <!-- Table Status -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Status da Mesas</h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Available</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tableStatus.available }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Occupied</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tableStatus.occupied }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Reserved</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tableStatus.reserved }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span class="text-sm text-gray-600">Out of Service</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tableStatus.outOfService }}</span>
              </div>
            </div>
          </div>
          <div class="card-footer">
            <NuxtLink to="/tables" class="btn-secondary w-full justify-center">
              Visualizar Mesas
            </NuxtLink>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Ações Rápidas</h3>
          </div>
          <div class="card-body">
            <div class="grid grid-cols-2 gap-4">
              <NuxtLink to="/products" class="btn-ghost p-4 flex flex-col items-center text-center space-y-2">
                <CubeIcon class="w-6 h-6 text-emerald-600" />
                <span class="text-xs font-medium">Adicionar Produto</span>
              </NuxtLink>
              <NuxtLink to="/waiters" class="btn-ghost p-4 flex flex-col items-center text-center space-y-2">
                <UserPlusIcon class="w-6 h-6 text-blue-600" />
                <span class="text-xs font-medium">Adicionar Garçom</span>
              </NuxtLink>
              <NuxtLink to="/tables" class="btn-ghost p-4 flex flex-col items-center text-center space-y-2">
                <TableCellsIcon class="w-6 h-6 text-yellow-600" />
                <span class="text-xs font-medium">Adicionar Mesa</span>
              </NuxtLink>
              <NuxtLink to="/categories" class="btn-ghost p-4 flex flex-col items-center text-center space-y-2">
                <TagIcon class="w-6 h-6 text-purple-600" />
                <span class="text-xs font-medium">Categorias</span>
              </NuxtLink>
            </div>
          </div>
        </div>

        <!-- Top Performing Staff -->
        <div class="card">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Melhores Desempenhos</h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div v-for="staff in topStaff" :key="staff.id" class="flex items-center space-x-3">
                <img :src="staff.avatar" :alt="staff.name" class="h-10 w-10 rounded-full object-cover">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ staff.name }}</p>
                  <p class="text-xs text-gray-500">{{ staff.orders }} orders today</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">${{ staff.sales }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  CurrencyDollarIcon,
  ReceiptPercentIcon,
  TableCellsIcon,
  UserGroupIcon,
  CubeIcon,
  UserPlusIcon,
  TagIcon,
  PlusIcon,
  ArrowPathIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth'
})

const { user } = useAuth()

// Sample data - in a real app, this would come from APIs
const stats = ref({
  todayRevenue: 4250,
  todayOrders: 87,
  totalTables: 24,
  occupiedTables: 18,
  staffOnDuty: 8
})

const recentOrders = ref([
  { id: 1045, table: 12, items: 3, total: 89.50, status: 'completed', time: new Date(Date.now() - 300000) },
  { id: 1044, table: 8, items: 5, total: 124.75, status: 'preparing', time: new Date(Date.now() - 600000) },
  { id: 1043, table: 15, items: 2, total: 45.30, status: 'completed', time: new Date(Date.now() - 900000) },
  { id: 1042, table: 3, items: 4, total: 78.90, status: 'served', time: new Date(Date.now() - 1200000) },
  { id: 1041, table: 21, items: 6, total: 156.25, status: 'completed', time: new Date(Date.now() - 1500000) }
])

const tableStatus = ref({
  available: 6,
  occupied: 15,
  reserved: 2,
  outOfService: 1
})

const topStaff = ref([
  { id: 1, name: 'Sarah Wilson', orders: 23, sales: 1250, avatar: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 2, name: 'Mike Johnson', orders: 19, sales: 980, avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { id: 3, name: 'John Doe', orders: 17, sales: 875, avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400' }
])

const formatTime = (date) => {
  return date.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  })
}

const getOrderStatusClass = (status) => {
  const classes = {
    'completed': 'badge-success',
    'preparing': 'badge-warning',
    'served': 'badge-info',
    'cancelled': 'badge-danger'
  }
  return classes[status] || 'badge-info'
}
</script>