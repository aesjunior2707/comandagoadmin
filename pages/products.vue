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
          <input v-model="searchQuery" type="text" placeholder="Pesquisar Produtos..." class="input-field">
        </div>
        <div>
          <select v-model="selectedCategory" class="input-field">
            <option value="">Todas Categorias</option>
            <option v-for="category in productsStore.productCategories" :key="category.id" :value="category">{{ category.description }}</option>
          </select>
        </div>
        <div>
          <select v-model="sortBy" class="input-field">
            <option value="name">Ordernar Pelo Nome</option>
            <option value="price">Order Pelo Preço</option>
            <option value="category">Order Por Categoria</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Products Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="product in filteredProducts" :key="product.id" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="aspect-w-16 aspect-h-9 mb-6">
          <img :src="'https://thumb.ac-illust.com/b1/b170870007dfa419295d949814474ab2_t.jpeg'" :alt="product.name" class="w-full h-48 object-cover rounded-lg">
        </div>
        
        <div class="space-y-4">
          <div class="flex justify-between items-start">
            <h3 class="text-lg font-semibold text-gray-900">{{ product.description }}</h3>
            <span class="text-lg font-bold text-emerald-600">${{ product.price.toFixed(2) }}</span>
          </div>
           
          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">{{ product.category }}</span>
          </div>
          
          <div class="flex gap-3 pt-4 border-t border-gray-100">
            <button @click="editProduct(product)" class="flex-1 btn-secondary text-sm">
              <PencilIcon class="w-4 h-4 mr-2" />
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Adicionar Novo Produto</h2>
          <form @submit.prevent="addProduct" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Nome do Produto</label>
              <input v-model="newProduct.description" type="text" class="input-field" required>
            </div>
            
            
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Preço</label>
                <input v-model="newProduct.price" type="number" step="0.01" class="input-field" required>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Categoria</label>
                <select v-model="newProduct.category_id" class="input-field" required>
                  <option value="">Selecionar Categoria</option>
                  <option v-for="category in productsStore.productCategories" :key="category.id" :value="category.id">{{ category.description }}</option>
                </select>
              </div>
            </div>
          
            <div class="flex gap-4 pt-6">
              <button type="button" @click="showAddProductModal = false" class="flex-1 btn-secondary">
                Cancelar
              </button>
              <button type="submit" :disabled="productsStore.isLoading" class="flex-1 btn-primary">
                <span v-if="productsStore.isLoading">Adicionando...</span>
                <span v-else>Adicionar Produto</span>
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
import { onMounted } from 'vue'

const productsStore = useProductsStore()

const showAddProductModal = ref(false)
const searchQuery = ref('')
const selectedCategory = ref('')
const sortBy = ref('name')

const newProduct = ref({
  id: '',
  company_id: '',
  category_id: '',
  description: '',
  price: 0.0,
})

const filteredProducts = computed(() => {
    if (selectedCategory.value || searchQuery.value) {
      const filtered = productsStore.allProducts.filter(product => {
        const matchesCategory = selectedCategory.value ? product.category_id === selectedCategory.value.id : true;
        const matchesQuery = searchQuery.value ? product.description.toLowerCase().includes(searchQuery.value.toLowerCase()) : true;
        return matchesCategory && matchesQuery;
      });

      return filtered.sort((a, b) => {
        if (sortBy.value === 'name') {
          return a.description.localeCompare(b.description);
        } else if (sortBy.value === 'price') {
          return a.price - b.price;
        } else if (sortBy.value === 'category') {
          return a.category.localeCompare(b.category);
        }
        return 0;
      });
    } else {
      return productsStore.allProducts.sort((a, b) => {
        if (sortBy.value === 'name') {
          return a.description.localeCompare(b.description);
        } else if (sortBy.value === 'price') {
          return a.price - b.price;
        } else if (sortBy.value === 'category') {
          return a.category.localeCompare(b.category);
        }
        return 0;
      });
    }
})

const addProduct = async () => {
  newProduct.value.id = "PROD-" + Math.random().toString(36).substr(2, 9)
  newProduct.value.company_id = useAuthStore().user.company_id
 
  console.log('Adding product:', newProduct.value)
  const result = await productsStore.addProduct(newProduct.value)
  
  if (result.success) {
    showAddProductModal.value = false
    // Reset form
    newProduct.value = {
      id: '',
      company_id: '',
      category_id: '',
      description: '',
      price: 0.0,
    }
  }
}

const editProduct = (product) => {
  console.log('Edit product:', product)
}


onMounted(() => {
  productsStore.list_categories()
  productsStore.list_products()
  
})
</script>