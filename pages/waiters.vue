<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão da Sua Equipe</h1>
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
            <p class="text-2xl font-bold text-gray-900">{{ waitersStore.totalWaiters }}</p>
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
            Add New Waiter
          </h2>
          <form @submit.prevent="addWaiter" class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >First Name</label
                >
                <input
                  v-model="newWaiter.firstName"
                  type="text"
                  class="input-field"
                  required
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Last Name</label
                >
                <input
                  v-model="newWaiter.lastName"
                  type="text"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Position</label
              >
              <select v-model="newWaiter.position" class="input-field" required>
                <option value="">Select position</option>
                <option value="Waiter">Waiter</option>
                <option value="Senior Waiter">Senior Waiter</option>
                <option value="Head Waiter">Head Waiter</option>
                <option value="Sommelier">Sommelier</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Phone</label
                >
                <input
                  v-model="newWaiter.phone"
                  type="tel"
                  class="input-field"
                  required
                />
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2"
                  >Experience (years)</label
                >
                <input
                  v-model="newWaiter.experience"
                  type="number"
                  min="0"
                  class="input-field"
                  required
                />
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Email</label
              >
              <input
                v-model="newWaiter.email"
                type="email"
                class="input-field"
                required
              />
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2"
                >Avatar URL</label
              >
              <input
                v-model="newWaiter.avatar"
                type="url"
                class="input-field"
              />
            </div>

            <div class="flex gap-4 pt-6">
              <button
                type="button"
                @click="showAddWaiterModal = false"
                class="flex-1 btn-secondary"
              >
                Cancel
              </button>
              <button type="submit" :disabled="waitersStore.isLoading" class="flex-1 btn-primary">
                <span v-if="waitersStore.isLoading">Adding...</span>
                <span v-else>Add Waiter</span>
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
import { onMounted } from "vue";

const waitersStore = useWaitersStore()

const showAddWaiterModal = ref(false);

const newWaiter = ref({
  firstName: "",
  lastName: "",
  position: "",
  phone: "",
  email: "",
  experience: "",
  avatar: "",
});


const editWaiter = (waiter) => {
  console.log("Edit waiter:", waiter);
};


onMounted(async () => {
  await waitersStore.list_users();
});
</script>