<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Informações do Restaurante</h1>
      <p class="text-gray-600">Gerencie as informações básicas e configurações do seu restaurante</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Restaurant Info Form -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Informações Básicas</h2>
          <form @submit.prevent="saveRestaurantInfo" class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Restaurante</label>
                <input v-model="restaurantForm.name" type="text" class="input-field" placeholder="Enter restaurant name">
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Endereço</label>
              <textarea v-model="restaurantForm.address" rows="3" class="input-field" placeholder="Enter full address"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Número de Telefone</label>
                <input v-model="restaurantForm.phone" type="tel" class="input-field" placeholder="+1 (555) 123-4567">
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="restaurantForm.email" type="email" class="input-field" placeholder="info@restaurant.com">
              </div>
            </div>

            <div class="flex justify-end pt-4">
              <button type="submit" :disabled="restaurantStore.isLoading" class="btn-primary">
                <CheckIcon class="w-4 h-4 mr-2" />
                <span v-if="restaurantStore.isLoading">Saving...</span>
                <span v-else>Salvar Mudanças</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Restaurant Stats -->
      <div class="space-y-6" v-if="false">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Estatísticas do Restaurante</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total de Mesas</span>
              <span class="font-semibold text-gray-900">{{ restaurantStore.restaurantStats.totalTables }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total de Produtos</span>
              <span class="font-semibold text-gray-900">{{ restaurantStore.restaurantStats.totalProducts }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total de Garçons</span>
              <span class="font-semibold text-gray-900">{{ restaurantStore.restaurantStats.totalWaiters }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total de Pedidos no Mês</span>
              <span class="font-semibold text-gray-900">{{ restaurantStore.restaurantStats.monthlyOrders.toLocaleString() }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'

const restaurantStore = useRestaurantStore()

const restaurantForm = ref({
  name: '',
  address: '',
  phone: '',
  email: ''
})

const saveRestaurantInfo = async () => {
  const result = await restaurantStore.updateRestaurantInfo(restaurantForm.value)
  
  if (result.success) {
    alert('Restaurant information saved successfully!')
  } else {
    alert('Failed to save restaurant information: ' + result.error)
  }
}

// Initialize form with current restaurant info
onMounted(() => {
  const info = restaurantStore.restaurantInfo
  restaurantForm.value = {
    name: info.name,
    address: info.address,
    phone: info.phone,
    email: info.email
  }
})
</script>