<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Categories Management</h1>
        <p class="text-gray-600">Organize your menu items into categories</p>
      </div>
      <button @click="showAddCategoryModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Category
      </button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="category in categories" :key="category.id" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" :style="{ backgroundColor: category.color + '20', color: category.color }">
              {{ category.icon }}
            </div>
            <div>
              <h3 class="text-lg font-semibold text-gray-900">{{ category.name }}</h3>
              <p class="text-sm text-gray-600">{{ category.productCount }} items</p>
            </div>
          </div>
          <div class="flex gap-2">
            <button @click="editCategory(category)" class="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <PencilIcon class="w-4 h-4" />
            </button>
            <button @click="deleteCategory(category)" class="p-2 text-red-400 hover:text-red-600 transition-colors">
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <p class="text-gray-600 text-sm mb-6 leading-relaxed">{{ category.description }}</p>
        
        <div class="flex justify-between items-center text-sm mb-6">
          <span class="text-gray-500">Created: {{ formatDate(category.createdAt) }}</span>
          <span class="px-3 py-1 rounded-full text-xs font-medium"
                :class="category.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'">
            {{ category.isActive ? 'Active' : 'Inactive' }}
          </span>
        </div>

        <div class="pt-4 border-t border-gray-100">
          <div class="flex gap-3">
            <button @click="toggleCategoryStatus(category)" class="flex-1 text-sm py-2 px-3 rounded-lg font-medium transition-colors"
                    :class="category.isActive ? 'bg-red-100 hover:bg-red-200 text-red-700' : 'bg-green-100 hover:bg-green-200 text-green-700'">
              {{ category.isActive ? 'Deactivate' : 'Activate' }}
            </button>
            <button @click="viewCategoryProducts(category)" class="flex-1 btn-secondary text-sm">
              View Products
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div v-if="showAddCategoryModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Category</h2>
          <form @submit.prevent="addCategory" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label>
              <input v-model="newCategory.name" type="text" class="input-field" required>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="newCategory.description" rows="3" class="input-field" required></textarea>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label>
              <input v-model="newCategory.icon" type="text" class="input-field" placeholder="🍕" maxlength="2" required>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Color</label>
              <div class="flex gap-2 flex-wrap">
                <button v-for="color in availableColors" :key="color" type="button"
                        @click="newCategory.color = color"
                        class="w-8 h-8 rounded-full border-2 transition-all duration-200"
                        :style="{ backgroundColor: color }"
                        :class="newCategory.color === color ? 'border-gray-900 scale-110' : 'border-gray-300'">
                </button>
              </div>
            </div>
            
            <div class="flex items-center space-x-3">
              <input v-model="newCategory.isActive" type="checkbox" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500">
              <label class="text-sm text-gray-700">Active category</label>
            </div>
            
            <div class="flex gap-4 pt-6">
              <button type="button" @click="showAddCategoryModal = false" class="flex-1 btn-secondary">
                Cancel
              </button>
              <button type="submit" class="flex-1 btn-primary">
                Add Category
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline'

const showAddCategoryModal = ref(false)

const newCategory = ref({
  name: '',
  description: '',
  icon: '',
  color: '#059669',
  isActive: true
})

const availableColors = ref([
  '#059669', '#3B82F6', '#EF4444', '#F59E0B', '#8B5CF6', 
  '#EC4899', '#10B981', '#F97316', '#6366F1', '#84CC16'
])

const categories = ref([
  {
    id: 1,
    name: 'Pizza',
    description: 'Traditional and gourmet pizzas with various toppings',
    icon: '🍕',
    color: '#EF4444',
    productCount: 12,
    isActive: true,
    createdAt: new Date('2024-01-15')
  },
  {
    id: 2,
    name: 'Pasta',
    description: 'Fresh pasta dishes with authentic Italian sauces',
    icon: '🍝',
    color: '#F59E0B',
    productCount: 8,
    isActive: true,
    createdAt: new Date('2024-01-16')
  },
  {
    id: 3,
    name: 'Salads',
    description: 'Fresh and healthy salad options',
    icon: '🥗',
    color: '#10B981',
    productCount: 6,
    isActive: true,
    createdAt: new Date('2024-01-17')
  },
  {
    id: 4,
    name: 'Appetizers',
    description: 'Perfect starters to begin your meal',
    icon: '🥖',
    color: '#8B5CF6',
    productCount: 10,
    isActive: true,
    createdAt: new Date('2024-01-18')
  },
  {
    id: 5,
    name: 'Desserts',
    description: 'Sweet treats to end your meal perfectly',
    icon: '🍰',
    color: '#EC4899',
    productCount: 7,
    isActive: true,
    createdAt: new Date('2024-01-19')
  },
  {
    id: 6,
    name: 'Beverages',
    description: 'Refreshing drinks and specialty cocktails',
    icon: '🥤',
    color: '#3B82F6',
    productCount: 15,
    isActive: true,
    createdAt: new Date('2024-01-20')
  },
  {
    id: 7,
    name: 'Main Courses',
    description: 'Hearty main dishes and signature specialties',
    icon: '🍖',
    color: '#F97316',
    productCount: 14,
    isActive: false,
    createdAt: new Date('2024-01-21')
  }
])

const formatDate = (date) => {
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  })
}

const addCategory = () => {
  const category = {
    id: categories.value.length + 1,
    name: newCategory.value.name,
    description: newCategory.value.description,
    icon: newCategory.value.icon,
    color: newCategory.value.color,
    productCount: 0,
    isActive: newCategory.value.isActive,
    createdAt: new Date()
  }
  
  categories.value.push(category)
  showAddCategoryModal.value = false
  
  // Reset form
  newCategory.value = {
    name: '',
    description: '',
    icon: '',
    color: '#059669',
    isActive: true
  }
}

const editCategory = (category) => {
  console.log('Edit category:', category)
}

const deleteCategory = (category) => {
  if (confirm(`Are you sure you want to delete "${category.name}" category?`)) {
    const index = categories.value.findIndex(c => c.id === category.id)
    if (index > -1) {
      categories.value.splice(index, 1)
    }
  }
}

const toggleCategoryStatus = (category) => {
  category.isActive = !category.isActive
}

const viewCategoryProducts = (category) => {
  // Navigate to products page with category filter
  navigateTo(`/products?category=${encodeURIComponent(category.name)}`)
}
</script>