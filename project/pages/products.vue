<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Products Management</h1>
        <p class="text-gray-600">Manage your menu items and product catalog</p>
      </div>
      <button @click="showAddProductModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Product
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
            <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
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
            <span v-if="product.isAvailable" class="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full font-medium">Available</span>
            <span v-else class="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Unavailable</span>
          </div>
          
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button @click="editProduct(product)" class="flex-1 btn-secondary text-sm">
              <PencilIcon class="w-4 h-4 mr-2" />
              Edit
            </button>
            <button @click="toggleAvailability(product)" class="flex-1 text-sm py-2 px-4 rounded-lg font-medium transition-colors"
                    :class="product.isAvailable ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-green-100 hover:bg-green-200 text-green-700'">
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
                  <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
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
              <button type="submit" class="flex-1 btn-primary">
                Add Product
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

const categories = ref(['Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Salads', 'Pasta', 'Pizza'])

const products = ref([
  {
    id: 1,
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 18.99,
    category: 'Pizza',
    image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  },
  {
    id: 2,
    name: 'Chicken Caesar Salad',
    description: 'Fresh romaine lettuce with grilled chicken, parmesan, and caesar dressing',
    price: 14.99,
    category: 'Salads',
    image: 'https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  },
  {
    id: 3,
    name: 'Spaghetti Carbonara',
    description: 'Traditional Italian pasta with eggs, cheese, pancetta, and black pepper',
    price: 16.99,
    category: 'Pasta',
    image: 'https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  },
  {
    id: 4,
    name: 'Chocolate Tiramisu',
    description: 'Rich Italian dessert with coffee-soaked ladyfingers and mascarpone',
    price: 8.99,
    category: 'Desserts',
    image: 'https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  },
  {
    id: 5,
    name: 'Bruschetta',
    description: 'Toasted bread topped with fresh tomatoes, garlic, and basil',
    price: 9.99,
    category: 'Appetizers',
    image: 'https://images.pexels.com/photos/8844885/pexels-photo-8844885.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: false
  },
  {
    id: 6,
    name: 'Grilled Salmon',
    description: 'Fresh Atlantic salmon with herbs and lemon butter sauce',
    price: 24.99,
    category: 'Main Courses',
    image: 'https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=400',
    isAvailable: true
  }
])

const filteredProducts = computed(() => {
  let filtered = products.value

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

const addProduct = () => {
  const product = {
    id: products.value.length + 1,
    name: newProduct.value.name,
    description: newProduct.value.description,
    price: parseFloat(newProduct.value.price),
    category: newProduct.value.category,
    image: newProduct.value.image,
    isAvailable: newProduct.value.isAvailable
  }
  
  products.value.push(product)
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

const editProduct = (product) => {
  console.log('Edit product:', product)
}

const toggleAvailability = (product) => {
  product.isAvailable = !product.isAvailable
}
</script>