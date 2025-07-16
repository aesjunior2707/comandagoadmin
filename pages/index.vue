<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="flex flex-col sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p class="mt-2 text-gray-600">Bem-vindo de volta, {{ authStore.user?.name }}.  Veja o que está acontecendo no {{ authStore.user?.restaurant?.name }} hoje.</p>
      </div>
      <div class="mt-4 sm:mt-0 flex space-x-3">
        <button @click="refreshDashboard" :disabled="dashboardStore.isLoading" class="btn-secondary">
          <ArrowPathIcon class="w-4 h-4 mr-2" :class="{ 'animate-spin': dashboardStore.isLoading }" />
          Atualizar
        </button>
        <NuxtLink to="/pos" class="btn-primary">
          <PlusIcon class="w-4 h-4 mr-2" />
          Novo Pedido
        </NuxtLink>
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
              <p class="text-2xl font-bold text-gray-900">R${{ dashboardStore.todayRevenue.toFixed(2) }}</p>
              
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
              <p class="text-2xl font-bold text-gray-900">{{ dashboardStore.dashboardStats.todayOrders }}</p>
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
              <p class="text-2xl font-bold text-gray-900">{{ tablesStore.tableStatusCounts.occupied }}/{{ tablesStore.tableStatusCounts.available + tablesStore.tableStatusCounts.occupied }}</p>
              <span class="text-sm font-medium text-yellow-600">{{ Math.round((tablesStore.tableStatusCounts.occupied / (tablesStore.tableStatusCounts.available + tablesStore.tableStatusCounts.occupied)) * 100) }}%</span>
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
            <p class="text-sm font-medium text-gray-600 mb-1">Total de Colaboradores</p>
            <div class="flex items-baseline space-x-2">
              <p class="text-2xl font-bold text-gray-900">{{ waitersStore.waiterStatusCounts.onDuty }}</p>
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
                    <th>Mesa</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Total</th>
                    <th>Garçom</th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="order in dashboardStore.latestOrders" :key="order.table_id">
                    <td>
                      <div class="font-medium text-gray-900">#{{ order.table_id}}</div>
                      <div class="text-sm text-gray-500">{{ order.created_at }}</div>
                    </td>
                    <td class="font-medium">{{ order.product_description }}</td>
                    <td class="text-gray-600 text-center">{{ order.quantity }}</td>
                    <td class="font-semibold">R${{ order.total_price.toFixed(2) }}</td>
                    <td class="font-medium text-start">{{ order.user_name }}</td>
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
                  <span class="text-sm text-gray-600">Disponível</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tablesStore.tableStatusCounts.available }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-3">
                  <div class="w-3 h-3 bg-red-400 rounded-full"></div>
                  <span class="text-sm text-gray-600">Ocupadas</span>
                </div>
                <span class="text-sm font-semibold text-gray-900">{{ tablesStore.tableStatusCounts.occupied }}</span>
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
                <span class="text-xs font-medium">Adicionar Colaborador</span>
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
        <div class="card" v-if="false">
          <div class="card-header">
            <h3 class="text-lg font-semibold text-gray-900">Melhores Desempenhos</h3>
          </div>
          <div class="card-body">
            <div class="space-y-4">
              <div v-for="staff in waitersStore.topPerformingWaiters" :key="staff.id" class="flex items-center space-x-3">
                <img :src="staff.avatar" :alt="staff.name" class="h-10 w-10 rounded-full object-cover">
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate">{{ staff.name }}</p>
                  <p class="text-xs text-gray-500">{{ staff.tablesServed }} tables today</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">{{ staff.rating }}/5</p>
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

const authStore = useAuthStore()
const dashboardStore = useDashboardStore()
const tablesStore = useTablesStore()
const waitersStore = useWaitersStore()

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

const refreshDashboard = async () => {
  await dashboardStore.fetchDashboardData()
}

// Initialize dashboard data on mount
onMounted(() => {
  dashboardStore.fetchDashboardData()
})
</script>