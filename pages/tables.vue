<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Mesas</h1>
        <p class="text-gray-600">
          Gerencie as mesas do seu restaurante e o status atual delas.
        </p>
      </div>
      <button @click="showAddTableModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Adicionar Mesa
      </button>
    </div>

    <!-- Table Status Summary -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <div class="w-6 h-6 bg-green-600 rounded"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Disponível</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ tablesStore.tableStatusCounts.available }}
            </p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-red-400 rounded-lg">
            <div class="w-6 h-6 bg-red-500 rounded"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Ocupado</p>
            <p class="text-2xl font-bold text-gray-900">
              {{ tablesStore.tableStatusCounts.occupied }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Grid -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
      >
        <div
          v-for="table in tablesStore.allTables"
          :key="table.id"
          class="relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md"
          :class="getTableStatusClass(table.status)"
          @click="selectTable(table)"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">
              Mesa {{ table.description }}
            </h3>
            <span
              class="px-3 py-1 text-xs font-medium rounded-full"
              :class="getStatusBadgeClass(table.status)"
            >
              {{ table.status }}
            </span>
          </div>

          <div class="flex gap-3">
            <button
              v-if="table.status == 'occupied'"
              @click="navigateToTable(table.id)"
              class="flex-1 text-xs py-2 px-3 bg-red-100 hover:bg-red-200 rounded font-medium transition-colors text-center"
            >
              Visualizar Mesa
            </button>
            <button
              v-if="table.status == 'available'"
              @click.stop="navigateToPOS(table.id)"
              class="flex-1 text-xs py-2 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded font-medium transition-colors text-center"
            >
              Iniciar Pedido
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Table Modal -->
    <div
      v-if="showAddTableModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Adicionar Mesa
          </h2>
          <form
            @submit.prevent="addTable"
            class="form-section"
          >
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Numero da Mesa</label
              >
              <input
                v-model="newTable.description"
                type="number"
                class="input-field"
                required
              />
            </div>

            <div class="flex gap-4 pt-6">
              <button
                type="button"
                @click="showAddTableModal = false"
                class="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="tablesStore.isLoading"
                class="flex-1 btn-primary"
              >
                <span v-if="tablesStore.isLoading">Adding...</span>
                <span v-else>Adicionar Mesa</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from "@heroicons/vue/24/outline";

const tablesStore = useTablesStore();

const showAddTableModal = ref(false);

const newTable = ref({
  description: "",
});

const getTableStatusClass = (status) => {
  const classes = {
    available: "border-green-400 bg-green-50",
    occupied: "border-red-400 bg-red-50",
  };
  return classes[status] || "border-gray-200 bg-gray-50";
};

const getStatusBadgeClass = (status) => {
  const classes = {
    available: "bg-green-100 text-green-800",
    occupied: "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const navigateToTable = async(tableId) => {
   tablesStore.selectTable(tableId).then(() => {
    navigateTo(`/table/${tableId}`);
   }).catch((error) => {
    console.error("Error navigating to table:", error);
  });
};

const addTable = async () => {
  tablesStore
    .addTable(newTable.value.description,
  )
    .then(() => {
      showAddTableModal.value = false;
      newTable.value = { description: "" };
    })
    .catch((error) => {
      console.error("Error adding table:", error);
    });
};

const selectTable = (table) => {
  console.log("Selected table:", table);
};

onMounted(async () => {
  await tablesStore.listar_mesas();
});
</script>