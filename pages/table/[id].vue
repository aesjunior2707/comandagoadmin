<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between h-16 px-6">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/tables" class="text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon class="w-6 h-6" />
          </NuxtLink>
          <div>
            <h1 class="text-xl font-semibold text-gray-900">Mesa {{ tableInfo?.description }}</h1>
            <p class="text-sm text-gray-600">{{ orders.length }} {{ orders.length === 1 ? 'item' : 'itens' }} no pedido</p>
          </div>
        </div>
        <div class="flex items-center space-x-3">
          <span class="px-3 py-1 text-xs font-medium rounded-full"
                :class="tableInfo?.status === 'occupied' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'">
            {{ tableInfo?.status === 'occupied' ? 'Ocupada' : 'Disponível' }}
          </span>
          <NuxtLink :to="`/pos?table=${tableInfo?.id}`" class="btn-primary">
            <PlusIcon class="w-4 h-4 mr-2" />
            Adicionar Itens
          </NuxtLink>
        </div>
      </div>
    </header>

    <div class="max-w-7xl mx-auto p-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <!-- Current Orders -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm border border-gray-200">
            <div class="p-6 border-b border-gray-200">
              <div class="flex justify-between items-center">
                <h2 class="text-xl font-semibold text-gray-900">Itens do Pedido</h2>
                <button 
                  v-if="orders.length > 0"
                  @click="showRemoveAllModal = true" 
                  class="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Limpar Mesa
                </button>
              </div>
            </div>

            <div class="p-6">
              <!-- Empty State -->
              <div v-if="orders.length === 0" class="text-center py-12">
                <ShoppingCartIcon class="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 class="text-lg font-medium text-gray-900 mb-2">Nenhum item na mesa</h3>
                <p class="text-gray-600 mb-6">Esta mesa não possui itens no momento</p>
                <NuxtLink :to="`/pos?table=${tableInfo?.id}`" class="btn-primary">
                  <PlusIcon class="w-4 h-4 mr-2" />
                  Adicionar Primeiro Item
                </NuxtLink>
              </div>

              <!-- Order Items -->
              <div v-else class="space-y-4">
                <div
                  v-for="item in orders"
                  :key="item.id"
                  class="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors"
                >
                  <div class="flex items-center justify-between">
                    <div class="flex-1">
                      <h4 class="font-medium text-gray-900 mb-1">{{ item.product_description }}</h4>
                      <div class="flex items-center space-x-4 text-sm text-gray-600">
                        <span>Quantidade: {{ item.quantity }}</span>
                        <span>Preço unitário: R$ {{ Number(item.unit_price).toFixed(2) }}</span>
                        <span class="text-xs bg-gray-200 px-2 py-1 rounded">{{ formatTime(item.created_at) }}</span>
                      </div>
                    </div>
                    <div class="flex items-center space-x-4">
                      <span class="text-lg font-semibold text-gray-900">
                        R$ {{ Number(item.total_price).toFixed(2) }}
                      </span>
                      <button
                        @click="removeItem(item)"
                        class="text-red-500 hover:text-red-700 p-2 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <TrashIcon class="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <!-- Total Summary -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Resumo da Conta</h3>
            <div class="space-y-3">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Subtotal</span>
                <span class="font-medium">R$ {{ subtotal.toFixed(2) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Taxa de Serviço (10%)</span>
                <span class="font-medium">R$ {{ serviceCharge.toFixed(2) }}</span>
              </div>
              <div class="border-t border-gray-200 pt-3">
                <div class="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span class="text-emerald-600">R$ {{ total.toFixed(2) }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Actions -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Ações</h3>
            <div class="space-y-3">
              <NuxtLink :to="`/pos?table=${tableInfo?.id}`" class="w-full btn-primary justify-center">
                <PlusIcon class="w-4 h-4 mr-2" />
                Adicionar Mais Itens
              </NuxtLink>
              <button 
                @click="printBill" 
                :disabled="currentOrders.length === 0"
                class="w-full btn-secondary justify-center"
              >
                <PrinterIcon class="w-4 h-4 mr-2" />
                Imprimir Conta
              </button>
              <button 
                @click="showPaymentModal = true" 
                :disabled="currentOrders.length === 0"
                class="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
              >
                <CreditCardIcon class="w-4 h-4 mr-2" />
                Finalizar Conta
              </button>
            </div>
          </div>

          <!-- Table Info -->
          <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Informações da Mesa</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between">
                <span class="text-gray-600">Número da Mesa</span>
                <span class="font-medium">{{ tableInfo?.description }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Status</span>
                <span class="font-medium">{{ tableInfo?.status === 'occupied' ? 'Ocupada' : 'Disponível' }}</span>
              </div>
              <div class="flex justify-between">
                <span class="text-gray-600">Itens no Pedido</span>
                <span class="font-medium">{{ currentOrders.length }}</span>
              </div>
              <div v-if="currentOrders.length > 0" class="flex justify-between">
                <span class="text-gray-600">Primeiro Pedido</span>
                <span class="font-medium">{{ formatTime(firstOrderTime) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Payment Modal -->
    <div
      v-if="showPaymentModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCardIcon class="w-8 h-8 text-green-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Finalizar Conta</h3>
          <p class="text-gray-600">Mesa {{ tableInfo?.description }}</p>
        </div>

        <div class="bg-gray-50 rounded-lg p-4 mb-6">
          <div class="flex justify-between text-lg font-semibold">
            <span>Total a Pagar</span>
            <span class="text-green-600">R$ {{ total.toFixed(2) }}</span>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <label class="block text-sm font-medium text-gray-700">Forma de Pagamento</label>
          <select v-model="paymentMethod" class="input-field">
            <option value="cash">Dinheiro</option>
            <option value="card">Cartão</option>
            <option value="pix">PIX</option>
          </select>
        </div>

        <div class="flex gap-3">
          <button @click="showPaymentModal = false" class="flex-1 btn-secondary">
            Cancelar
          </button>
          <button @click="processPayment" :disabled="isProcessingPayment" class="flex-1 btn-primary">
            <span v-if="isProcessingPayment">Processando...</span>
            <span v-else>Confirmar Pagamento</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Remove All Items Modal -->
    <div
      v-if="showRemoveAllModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-6">
        <div class="text-center mb-6">
          <div class="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExclamationTriangleIcon class="w-8 h-8 text-red-600" />
          </div>
          <h3 class="text-xl font-semibold text-gray-900 mb-2">Limpar Mesa</h3>
          <p class="text-gray-600">Tem certeza que deseja remover todos os itens da Mesa {{ tableInfo?.description }}?</p>
        </div>

        <div class="flex gap-3">
          <button @click="showRemoveAllModal = false" class="flex-1 btn-secondary">
            Cancelar
          </button>
          <button @click="removeAllItems" class="flex-1 btn-danger">
            Sim, Limpar Mesa
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <div
      v-if="showSuccessModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full p-8 text-center">
        <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckIcon class="w-8 h-8 text-green-600" />
        </div>
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Pagamento Processado!</h3>
        <p class="text-gray-600 mb-6">A conta da Mesa {{ tableInfo?.description }} foi finalizada com sucesso</p>
        <div class="space-y-3">
          <button @click="goToTables" class="w-full btn-primary">
            Voltar às Mesas
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeftIcon,
  ShoppingCartIcon,
  PlusIcon,
  TrashIcon,
  PrinterIcon,
  CreditCardIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const route = useRoute()
const tableId = route.params.id

const tablesStore = useTablesStore();

// State
const tableInfo = ref(null)
const currentOrders = ref([])
const showPaymentModal = ref(false)
const showRemoveAllModal = ref(false)
const showSuccessModal = ref(false)
const paymentMethod = ref('cash')
const isProcessingPayment = ref(false)

const orders = computed(() => {
  return tablesStore.allOrders
})

// Computed
const subtotal = computed(() => {
  return currentOrders.value.reduce((sum, item) => sum + Number(item.total_price), 0)
})

const serviceCharge = computed(() => {
  return subtotal.value * 0.1 // 10% service charge
})

const total = computed(() => {
  return subtotal.value + serviceCharge.value
})

const firstOrderTime = computed(() => {
  if (currentOrders.value.length === 0) return null
  const times = currentOrders.value.map(order => new Date(order.created_at))
  return Math.min(...times)
})

// Methods
const formatTime = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString('pt-BR', { 
    hour: '2-digit', 
    minute: '2-digit'
  })
}

const removeItem = (item) => {
  const index = currentOrders.value.findIndex(order => order.id === item.id)
  if (index > -1) {
    currentOrders.value.splice(index, 1)
  }
}

const removeAllItems = () => {
  currentOrders.value = []
  showRemoveAllModal.value = false
  // Update table status to available if no items
  if (tableInfo.value) {
    tableInfo.value.status = 'available'
  }
}

const printBill = () => {
  console.log('Printing bill for table:', tableId)
  // Implement print functionality
}

const processPayment = async () => {
  isProcessingPayment.value = true
  
  try {
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Clear the table
    currentOrders.value = []
    if (tableInfo.value) {
      tableInfo.value.status = 'available'
    }
    
    showPaymentModal.value = false
    showSuccessModal.value = true
  } catch (error) {
    console.error('Payment processing error:', error)
  } finally {
    isProcessingPayment.value = false
  }
}

const goToTables = () => {
  navigateTo('/tables')
}

// Initialize data
onMounted(async () => {
  // Mock table info - replace with actual API call
  tableInfo.value = {
    id: tableId,
    description: tableId,
    status: 'occupied'
  }
})
</script>