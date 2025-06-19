<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Produtos</h1>
        <p class="text-gray-600">Gerencie os itens do seu cardápio e catálogo de produtos.</p>
      </div>
      <button @click="showAddProductModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Adicionar Produto
      </button>
    </div>

    <!-- Filters -->
    <div class="card mb-8">
      <div class="flex flex-wrap gap-4">
        <div class="flex-1 min-w-64">
          <input v-model="searchQuery" type="text" placeholder="Search products..." class="input-field">
        </div>
        <div>
          <select v-model="selectedCategory" class="input-field">
            <option value="">All Categories</option>
            <option v-for="category in productsStore.productCategories" :key="category" :value="category">{{ category }}</option>
          </select>
        </div>
        <div>
          <select v-model="sortBy" class="input-field">
            <option value="name">Sort by Name</option>
            <option value="price">Sort by Price</option>
            <option value="category">Sort by Category</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="aspect-w-16 aspect-h-9 mb-6">
          <img :src="product.image" :alt="product.name" class="w-full h-48 object-cover rounded-lg">
        </div>
        
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
            <span class="text-lg font-bold text-emerald-600">${{ product.price }}</span>
          </div>
          
          <p class="text-gray-600 text-sm leading-relaxed">{{ product.description }}</p>
          
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{{ product.category }}</span>
            <span v-if="!product.isAvailable" class="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Unavailable</span>
          </div>
          
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button @click="editProduct(product)" class="flex-1 btn-secondary text-sm">
              <PencilIcon class="w-4 h-4 mr-2" />
              Edit
            </button>
            <button @click="toggleAvailability(product)" class="flex-1 btn-ghost text-sm" :class="product.isAvailable ? 'text-red-600' : 'text-green-600'">
              {{ product.isAvailable ? 'Disable' : 'Enable' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2>
          <form @submit.prevent="addProduct" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input v-model="newProduct.name" type="text" class="input-field" required>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="newProduct.description" rows="3" class="input-field" required></textarea>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Price</label>
                <input v-model="newProduct.price" type="number" step="0.01" class="input-field" required>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select v-model="newProduct.category" class="input-field" required>
                  <option value="">Select category</option>
                  <option v-for="category in productsStore.productCategories" :key="category" :value="category">{{ category }}</option>
                </select>
              </div>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
              <input v-model="newProduct.image" type="url" class="input-field" required>
            </div>
            
            <div class="flex items-center space-x-3">
              <input v-model="newProduct.isAvailable" type="checkbox" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
              <label class="text-sm text-gray-700">Available for order</label>
            </div>
            
            <div class="flex gap-4 pt-6">
              <button type="button" @click="showAddProductModal = false" class="flex-1 btn-secondary">
                Cancel
              </button>
              <button type="submit" :disabled="productsStore.isLoading" class="flex-1 btn-primary">
                <span v-if="productsStore.isLoading">Adding...</span>
                <span v-else>Add Product</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, PencilIcon } from '@heroicons/vue/24/outline'

const productsStore = useProductsStore()

const showAddProductModal = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')

const newProduct = ref({
  name: '',
  description: '',
  price: '',
  category: '',
  image: '',
  isAvailable: true
})

const filteredProducts = computed(() => {
  let filtered = productsStore.allProducts

  // Filter by search query
  if (searchQuery.value) {
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  }

  // Filter by category
  if (selectedCategory.value) {
    filtered = filtered.filter(product => product.category === selectedCategory.value)
  }

  // Sort products
  filtered.sort((a, b) => {
    switch (sortBy.value) {
      case 'price':
        return a.price - b.price
      case 'category':
        return a.category.localeCompare(b.category)
      default:
        return a.name.localeCompare(b.name)
    }
  })

  return filtered
})

const addProduct = async () => {
  const result = await productsStore.addProduct({
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: parseFloat(newProduct.value.price),
    category: newProduct.value.category,
    image: newProduct.value.image,
    isAvailable: newProduct.value.isAvailable
  })
  
  if (result.success) {
    showAddProductModal.value = false
    // Reset form
    newProduct.value = {
      name: '',
      description: '',
      price: '',
      category: '',
      image: '',
      isAvailable: true
    }
  }
}

const editProduct = (product) => {
  console.log('Edit product:', product)
}

const toggleAvailability = async (product) => {
  await productsStore.toggleProductAvailability(product.id)
}
</script>