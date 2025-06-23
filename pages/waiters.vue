<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">
          Gestão da Sua Equipe
        </h1>
        <p class="text-gray-600">
          Gerencie a equipe do seu restaurante e o desempenho deles.
        </p>
      </div>
      <button @click="showAddWaiterModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Adicionar Colaborador
      </button>
    </div>

    <!-- Staff Statistics -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <UsersIcon class="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">
              Total de Colaboradores
            </p>
            <p class="text-2xl font-bold text-gray-900">
              {{ waitersStore.totalWaiters }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <!-- Waiters Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="waiter in waitersStore.allWaiters"
        :key="waiter.id"
        class="card hover:shadow-lg transition-shadow duration-200"
      >
        <div class="flex items-center mb-6 space-x-4">
          <img
            :src="'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small_2x/Basic_Ui__28186_29.jpg'"
            :alt="waiter.name"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ waiter.name }}
            </h3>
          </div>
        </div>

        <div class="flex gap-3 pt-4 border-t border-gray-100">
          <button
            @click="editWaiter(waiter)"
            class="flex-1 btn-secondary text-sm"
          >
            <PencilIcon class="w-4 h-4 mr-2" />
            Editar
          </button>
        </div>
      </div>
    </div>

    <!-- Add Waiter Modal -->
    <div
      v-if="showAddWaiterModal"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
    >
      <div
        class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto"
      >
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">
            Adicionar Novo Colaborador
          </h2>
          <form @submit.prevent="addWaiter" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Nome do Colaborador</label
              >
              <input
                v-model="newWaiter.name"
                type="text"
                class="input-field"
                required
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Tipo do Colaborador</label
              >
              <select v-model="newWaiter.user_type" class="input-field" required>
                <option value="">Selecione o Tipo do Colaborador</option>
                <option value="A">Administrador</option>
                <option value="G">Garçom</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Usuario</label
                >
                <input
                  v-model="newWaiter.username"
                  type="tel"
                  class="input-field"
                  required
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Senha</label
                >
                <input
                  v-model="newWaiter.password"
                  type="password"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div class="flex gap-4 pt-6">
              <button
                type="button"
                @click="showAddWaiterModal = false"
                class="flex-1 btn-secondary"
              >
                Cancelar
              </button>
              <button
                type="submit"
                :disabled="waitersStore.isLoading"
                class="flex-1 btn-primary"
              >
                <span v-if="waitersStore.isLoading">Adicionando...</span>
                <span v-else>Adicionar Colaborador</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PlusIcon,
  PencilIcon,
  UsersIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  StarIcon,
} from "@heroicons/vue/24/outline";
import { rand } from "@vueuse/core";
import { onMounted } from "vue";

const waitersStore = useWaitersStore();

const authStore = useAuthStore()
const showAddWaiterModal = ref(false);

const newWaiter = ref({
  id : "",
  name: "",
  company_id : "",
  username: "",
  password: "",
  user_type : "A"
});

const addWaiter = async () => {
  try {
    newWaiter.value.id = "USR-" + Math.random().toString(36).substr(2, 9),

    newWaiter.value.company_id = authStore.user.company_id;
    
    await waitersStore.add_waiter(newWaiter.value);
    
    showAddWaiterModal.value = false;
    
    newWaiter.value = {
      name: "",
      username: "",
      password: "",
      user_type : "A"
    };

    await waitersStore.list_users();
  } catch (error) {
    console.error("Error adding waiter:", error);
  }
};

onMounted(async () => {
  await waitersStore.list_users();
});
</script>