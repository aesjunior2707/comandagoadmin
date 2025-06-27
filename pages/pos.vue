<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <header class="bg-white border-b border-gray-200 shadow-sm">
      <div class="flex items-center justify-between h-16 px-6">
        <div class="flex items-center space-x-4">
          <NuxtLink to="/" class="text-gray-600 hover:text-gray-900">
            <ArrowLeftIcon class="w-6 h-6" />
          </NuxtLink>
          <h1 class="text-xl font-semibold text-gray-900">Novo Pedido</h1>
        </div>
        <div class="flex items-center space-x-4">
          <span class="text-sm text-gray-600">Mesa: {{ selectedTable?.description || 'Selecionar Mesa' }}</span>
          <button @click="showTableSelector = true" class="btn-secondary">
            <TableCellsIcon class="w-4 h-4 mr-2" />
            {{ selectedTable ? 'Trocar Mesa' : 'Selecionar Mesa' }}
          </button>
        </div>
      </div>
    </header>

    <div class="flex h-[calc(100vh-4rem)]">
      <!-- Left Side - Products -->
      <div class="flex-1 flex flex-col">
        <!-- Categories Filter -->
        <div class="bg-white border-b border-gray-200 p-4">
          <div class="flex space-x-2 overflow-x-auto">
            <button
              @click="selectedCategory = null"
              class="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors"
              :class="selectedCategory === null ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              Todos
            </button>
            <button
              v-for="category in productsStore.productCategories"
              :key="category.id"
              @click="selectedCategory = category"
              class="px-4 py-2 text-sm font-medium rounded-lg whitespace-nowrap transition-colors"
              :class="selectedCategory?.id === category.id ? 'bg-emerald-100 text-emerald-800' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'"
            >
              {{ category.description }}
            </button>
          </div>
        </div>

        <!-- Products Grid -->
        <div class="flex-1 p-6 overflow-y-auto">
          <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            <div
              v-for="product in filteredProducts"
              :key="product.id"
              @click="addToOrder(product)"
              class="bg-white rounded-lg border border-gray-200 p-4 cursor-pointer hover:shadow-md hover:border-emerald-300 transition-all duration-200"
            >
              <div class="aspect-square bg-gray-100 rounded-lg mb-3 flex items-center justify-center">
                <CubeIcon class="w-8 h-8 text-gray-400" />
              </div>
              <h3 class="font-medium text-gray-900 text-sm mb-1 line-clamp-2">{{ product.description }}</h3>
              <p class="text-lg font-bold text-emerald-600">R$ {{ Number(product.price).toFixed(2) }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Right Side - Order Summary -->
      <div class="w-96 bg-white border-l border-gray-200 flex flex-col">
        <!-- Order Header -->
        <div class="p-6 border-b border-gray-200">
          <h2 class="text-lg font-semibold text-gray-900 mb-2">Resumo do Pedido</h2>
          <p class="text-sm text-gray-600">
            {{ orderItems.length }} {{ orderItems.length === 1 ? 'item' : 'itens' }}
          </p>
        </div>

        <!-- Order Items -->
        <div class="flex-1 overflow-y-auto">
          <div v-if="orderItems.length === 0" class="p-6 text-center">
            <ShoppingCartIcon class="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p class="text-gray-500">Nenhum item adicionado</p>
            <p class="text-sm text-gray-400">Selecione produtos para adicionar ao pedido</p>
          </div>
          
          <div v-else class="p-4 space-y-3">
            <div
              v-for="item in orderItems"
              :key="item.id"
              class="bg-gray-50 rounded-lg p-4"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900 text-sm">{{ item.description }}</h4>
                <button @click="removeFromOrder(item.id)" class="text-red-500 hover:text-red-700">
                  <XMarkIcon class="w-4 h-4" />
                </button>
              </div>
              
              <div class="flex items-center justify-between">
                <div class="flex items-center space-x-2">
                  <button
                    @click="decreaseQuantity(item.id)"
                    class="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 flex items-center justify-center"
                  >
                    <MinusIcon class="w-4 h-4" />
                  </button>
                  <span class="w-8 text-center font-medium">{{ item.quantity }}</span>
                  <button
                    @click="increaseQuantity(item.id)"
                    class="w-8 h-8 rounded-full bg-emerald-100 hover:bg-emerald-200 text-emerald-600 flex items-center justify-center"
                  >
                    <PlusIcon class="w-4 h-4" />
                  </button>
                </div>
                <span class="font-semibold text-gray-900">R$ {{ (Number(item.price) * item.quantity).toFixed(2) }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Order Total and Actions -->
        <div class="border-t border-gray-200 p-6 space-y-4">
          <div class="space-y-2">
            <div class="flex justify-between text-sm">
              <span class="text-gray-600">Subtotal</span>
              <span class="font-medium">R$ {{ subtotal.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between text-lg font-semibold">
              <span>Total</span>
              <span class="text-emerald-600">R$ {{ total.toFixed(2) }}</span>
            </div>
          </div>

          <div class="space-y-3">
            <button
              @click="clearOrder"
              :disabled="orderItems.length === 0"
              class="w-full btn-secondary"
            >
              Limpar Pedido
            </button>
            <button
              @click="sendOrder"
              :disabled="orderItems.length === 0 || !selectedTable || isLoading"
              class="w-full btn-primary"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="loading-spinner mr-2"></div>
                Enviando...
              </div>
              <span v-else>Enviar Pedido</span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Table Selector Modal -->
    <div
      v-if="showTableSelector"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div class="p-6 border-b border-gray-200">
          <div class="flex justify-between items-center">
            <h2 class="text-xl font-semibold text-gray-900">Selecionar Mesa</h2>
            <button @click="showTableSelector = false" class="text-gray-400 hover:text-gray-600">
              <XMarkIcon class="w-6 h-6" />
            </button>
          </div>
        </div>
        
        <div class="p-6 overflow-y-auto max-h-96">
          <div class="grid grid-cols-3 md:grid-cols-4 gap-4">
            <button
              v-for="table in availableTables"
              :key="table.id"
              @click="selectTable(table)"
              class="p-4 border-2 rounded-lg text-center hover:border-emerald-300 hover:bg-emerald-50 transition-colors"
              :class="selectedTable?.id === table.id ? 'border-emerald-500 bg-emerald-50' : 'border-gray-200'"
            >
              <TableCellsIcon class="w-8 h-8 mx-auto mb-2 text-gray-600" />
              <span class="font-medium">Mesa {{ table.description }}</span>
            </button>
          </div>
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
        <h3 class="text-xl font-semibold text-gray-900 mb-2">Pedido Enviado!</h3>
        <p class="text-gray-600 mb-6">O pedido foi enviado com sucesso para a Mesa {{ selectedTable?.description }}</p>
        <div class="space-y-3">
          <button @click="startNewOrder" class="w-full btn-primary">
            Novo Pedido
          </button>
          <button @click="goToDashboard" class="w-full btn-secondary">
            Voltar ao Dashboard
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  ArrowLeftIcon,
  TableCellsIcon,
  CubeIcon,
  ShoppingCartIcon,
  XMarkIcon,
  PlusIcon,
  MinusIcon,
  CheckIcon
} from '@heroicons/vue/24/outline'

definePageMeta({
  middleware: 'auth',
  layout: false
})

const productsStore = useProductsStore()
const tablesStore = useTablesStore()

// State
const selectedCategory = ref(null)
const selectedTable = ref(null)
const orderItems = ref([])
const showTableSelector = ref(false)
const showSuccessModal = ref(false)
const isLoading = ref(false)

// Computed
const filteredProducts = computed(() => {
  if (!selectedCategory.value) {
    return productsStore.allProducts
  }
  return productsStore.allProducts.filter(p => p.category_id === selectedCategory.value.id)
})

const availableTables = computed(() => {
  return tablesStore.availableTables
})

const subtotal = computed(() => {
  return orderItems.value.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0)
})

const total = computed(() => {
  return subtotal.value // Add tax calculation here if needed
})

// Methods
const addToOrder = (product) => {
  const existingItem = orderItems.value.find(item => item.id === product.id)
  
  if (existingItem) {
    existingItem.quantity += 1
  } else {
    orderItems.value.push({
      id: product.id,
      description: product.description,
      price: product.price,
      quantity: 1,
      category_id: product.category_id
    })
  }
}

const removeFromOrder = (productId) => {
  const index = orderItems.value.findIndex(item => item.id === productId)
  if (index > -1) {
    orderItems.value.splice(index, 1)
  }
}

const increaseQuantity = (productId) => {
  const item = orderItems.value.find(item => item.id === productId)
  if (item) {
    item.quantity += 1
  }
}

const decreaseQuantity = (productId) => {
  const item = orderItems.value.find(item => item.id === productId)
  if (item && item.quantity > 1) {
    item.quantity -= 1
  } else if (item && item.quantity === 1) {
    removeFromOrder(productId)
  }
}

const selectTable = (table) => {
  selectedTable.value = table
  showTableSelector.value = false
}

const clearOrder = () => {
  orderItems.value = []
}

const sendOrder = async () => {
  if (!selectedTable.value || orderItems.value.length === 0) return
  
  isLoading.value = true
  
  try {
    // Simulate API call to send order
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    // Here you would make the actual API call to send the order
    console.log('Sending order:', {
      table: selectedTable.value,
      items: orderItems.value,
      total: total.value
    })
    
    showSuccessModal.value = true
  } catch (error) {
    console.error('Error sending order:', error)
    // Handle error (show error message)
  } finally {
    isLoading.value = false
  }
}

const startNewOrder = () => {
  orderItems.value = []
  selectedTable.value = null
  showSuccessModal.value = false
}

const goToDashboard = () => {
  navigateTo('/')
}

// Initialize data
onMounted(async () => {
  await Promise.all([
    productsStore.list_products(),
    productsStore.list_categories(),
    tablesStore.listar_mesas()
  ])
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>