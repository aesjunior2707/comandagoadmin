<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Gestão de Categorias
        </h1>
        <p class="text-gray-600">
          Organize os itens do seu cardápio em categorias.
        </p>
      </div>
      <button @click="showAddCategoryModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Adicionar Categoria
      </button>
    </div>

    <!-- Categories Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="category in categories"
        :key="category.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex items-center justify-between mb-6">
          <div class="flex items-center space-x-4">
            <div>
              <h3 class="text-lg font-semibold text-gray-900">
                {{ category.description }}
              </h3>
            </div>
          </div>
        </div>

       

        <div class="pt-4 border-t border-gray-100">
          <div class="flex gap-3">
            <button
              @click="viewCategoryProducts(category)"
              class="flex-1 btn-secondary text-sm"
            >
              Produtos
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Category Modal -->
    <div
      v-if="showAddCategoryModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Adicionar Nova Categoria
          </h2>
          <form @submit.prevent="addCategory" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nome da Categoria</label
              >
              <input
                v-model="newCategory.description"
                type="text"
                class="input-field"
                required
              />
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Impressora Padrão</label
              >
              <select v-model="newCategory.printer_id" class="input-field" required>
                <option value="">Selecione a Impressora Padrão</option>
                <option v-for="printer in printers" :key="printer.id" :value="printer.id">{{printer.description}}</option>
              </select>
            </div>
            <div class="flex gap-4 pt-6">
              <button
                type="button"
                @click="showAddCategoryModal = false"
                class="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button type="submit" class="flex-1 btn-primary">
                Adicionar Categoria
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon, PencilIcon, TrashIcon } from "@heroicons/vue/24/outline";
import { computed, onMounted } from "vue";

import { useProductsStore } from "~/stores/products";
const authStore = useAuthStore()

const restaurantStore = useRestaurantStore();

definePageMeta({
  middleware: "auth",
});

const showAddCategoryModal = ref(false);

const newCategory = ref({
  id: null,
  company_id: null,
  description: "",
  printer_id: null,
});


const categories = computed(() => useProductsStore().allCategories);


const printers = computed(() => useProductsStore().allPrinters);

const addCategory = () => {
  const category =  {
    'id': "CAT-" + Math.random().toString(36).substr(2, 9),
    'company_id': authStore.user.company_id,
    'description': newCategory.value.description,
    'printer_id': newCategory.value.printer_id,
  }

  useProductsStore().add_category(category).then(() => {
    newCategory.value = {
      id: null,
      company_id: null,
      description: "",
      printer_id: null,
    };

    useProductsStore().list_categories();
    
    showAddCategoryModal.value = false;
  }).catch((error) => {
    console.error("Error adding category:", error);
  });
};

const editCategory = (category) => {
  console.log("Edit category:", category);
};

const deleteCategory = (category) => {
  if (confirm(`Are you sure you want to delete "${category.name}" category?`)) {
    const index = categories.value.findIndex((c) => c.id === category.id);
    if (index > -1) {
      categories.value.splice(index, 1);
    }
  }
};

const toggleCategoryStatus = (category) => {
  category.isActive = !category.isActive;
};

const viewCategoryProducts = (category) => {
  // Navigate to products page with category filter
  navigateTo(`/products?category=${encodeURIComponent(category.name)}`);
};

onMounted(async () => {
  await useProductsStore().list_printers();
  await useProductsStore().list_categories();

});
</script>