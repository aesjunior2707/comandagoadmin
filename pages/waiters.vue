<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Garçons</h1>
        <p class="text-gray-600">
          Gerencie a equipe do seu restaurante e o desempenho deles.
        </p>
      </div>
      <button @click="showAddWaiterModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Adicionar Garçom
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
              Total de Garçons
            </p>
            <p class="text-2xl font-bold text-gray-900">{{ waitersStore.totalWaiters }}</p>
          </div>
        </div>
      </div>
      
      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">
              Em Serviço
            </p>
            <p class="text-2xl font-bold text-gray-900">{{ waitersStore.waiterStatusCounts.onDuty }}</p>
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
            :src="waiter.avatar"
            :alt="waiter.name"
            class="w-16 h-16 rounded-full object-cover"
          />
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">
              {{ waiter.name }}
            </h3>
            <p class="text-sm text-gray-600">{{ waiter.position }}</p>
            <span :class="getStatusBadgeClass(waiter.status)" class="badge mt-2">
              {{ waiter.status }}
            </span>
          </div>
        </div>

        <div class="space-y-3 mb-6">
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Phone:</span>
            <span class="font-medium">{{ waiter.phone }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Email:</span>
            <span class="font-medium">{{ waiter.email }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Experience:</span>
            <span class="font-medium">{{ waiter.experience }} years</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Tables Today:</span>
            <span class="font-medium">{{ waiter.tablesServed }}</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Rating:</span>
            <span class="font-medium">{{ waiter.rating }}/5</span>
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
          <button
            @click="changeWaiterStatus(waiter)"
            :class="getStatusButtonClass(waiter.status)"
            class="flex-1 text-sm py-2 px-3 rounded font-medium transition-colors"
          >
            {{ getStatusButtonText(waiter.status) }}
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

const getStatusBadgeClass = (status) => {
  const classes = {
    "on-duty": "bg-green-100 text-green-800",
    "on-break": "bg-yellow-100 text-yellow-800",
    "off-duty": "bg-red-100 text-red-800",
  };
  return classes[status] || "bg-gray-100 text-gray-800";
};

const getStatusButtonClass = (status) => {
  const classes = {
    "on-duty": "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    "on-break": "bg-green-100 hover:bg-green-200 text-green-700",
    "off-duty": "bg-green-100 hover:bg-green-200 text-green-700",
  };
  return classes[status] || "bg-gray-100 hover:bg-gray-200 text-gray-700";
};

const getStatusButtonText = (status) => {
  const texts = {
    "on-duty": "Break",
    "on-break": "Resume",
    "off-duty": "Clock In",
  };
  return texts[status] || "Change";
};

const addWaiter = async () => {
  const result = await waitersStore.addWaiter({
    name: `${newWaiter.value.firstName} ${newWaiter.value.lastName}`,
    position: newWaiter.value.position,
    phone: newWaiter.value.phone,
    email: newWaiter.value.email,
    experience: parseInt(newWaiter.value.experience),
    avatar: newWaiter.value.avatar || "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400",
  });

  if (result.success) {
    showAddWaiterModal.value = false;
    // Reset form
    newWaiter.value = {
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
      experience: "",
      avatar: "",
    };
  }
};

const editWaiter = (waiter) => {
  console.log("Edit waiter:", waiter);
};

const changeWaiterStatus = async (waiter) => {
  const statusFlow = {
    "off-duty": "on-duty",
    "on-duty": "on-break",
    "on-break": "on-duty",
  };
  const newStatus = statusFlow[waiter.status] || "off-duty";
  await waitersStore.updateWaiterStatus(waiter.id, newStatus);
};
</script>