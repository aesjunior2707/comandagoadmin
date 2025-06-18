<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Tables Management</h1>
        <p class="text-gray-600">Manage your restaurant tables and their current status</p>
      </div>
      <button @click="showAddTableModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Table
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
            <p class="text-sm font-medium text-gray-600 mb-1">Available</p>
            <p class="text-2xl font-bold text-gray-900">{{ availableTables }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <div class="w-6 h-6 bg-yellow-600 rounded"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Occupied</p>
            <p class="text-2xl font-bold text-gray-900">{{ occupiedTables }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-blue-100 rounded-lg">
            <div class="w-6 h-6 bg-blue-600 rounded"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Reserved</p>
            <p class="text-2xl font-bold text-gray-900">{{ reservedTables }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-red-100 rounded-lg">
            <div class="w-6 h-6 bg-red-600 rounded"></div>
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Out of Service</p>
            <p class="text-2xl font-bold text-gray-900">{{ outOfServiceTables }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Tables Grid -->
    <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div v-for="table in tables" :key="table.id" 
             class="relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md"
             :class="getTableStatusClass(table.status)"
             @click="selectTable(table)">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-lg font-semibold text-gray-900">Table {{ table.number }}</h3>
            <span class="px-3 py-1 text-xs font-medium rounded-full"
                  :class="getStatusBadgeClass(table.status)">
              {{ table.status }}
            </span>
          </div>
          
          <div class="space-y-3 text-sm text-gray-600 mb-6">
            <div class="flex justify-between">
              <span>Capacity:</span>
              <span class="font-medium">{{ table.capacity }} people</span>
            </div>
            <div class="flex justify-between">
              <span>Location:</span>
              <span class="font-medium">{{ table.location }}</span>
            </div>
            <div v-if="table.waiter" class="flex justify-between">
              <span>Waiter:</span>
              <span class="font-medium">{{ table.waiter }}</span>
            </div>
            <div v-if="table.currentOrder" class="flex justify-between">
              <span>Order:</span>
              <span class="font-medium">${{ table.currentOrder }}</span>
            </div>
          </div>

          <div class="flex gap-3">
            <button @click.stop="editTable(table)" class="flex-1 text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded font-medium transition-colors">
              Edit
            </button>
            <button @click.stop="changeTableStatus(table)" class="flex-1 text-xs py-2 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded font-medium transition-colors">
              Change Status
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Add Table Modal -->
    <div v-if="showAddTableModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Table</h2>
          <form @submit.prevent="addTable" class="form-section">
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Table Number</label>
              <input v-model="newTable.number" type="number" class="input-field" required>
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Capacity</label>
              <select v-model="newTable.capacity" class="input-field" required>
                <option value="">Select capacity</option>
                <option value="2">2 people</option>
                <option value="4">4 people</option>
                <option value="6">6 people</option>
                <option value="8">8 people</option>
                <option value="10">10 people</option>
              </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <select v-model="newTable.location" class="input-field" required>
                <option value="">Select location</option>
                <option value="Main Floor">Main Floor</option>
                <option value="Terrace">Terrace</option>
                <option value="Private Room">Private Room</option>
                <option value="Bar Area">Bar Area</option>
              </select>
            </div>
            <div class="flex gap-4 pt-6">
              <button type="button" @click="showAddTableModal = false" class="flex-1 btn-secondary">
                Cancel
              </button>
              <button type="submit" class="flex-1 btn-primary">
                Add Table
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { PlusIcon } from '@heroicons/vue/24/outline'

const showAddTableModal = ref(false)

const newTable = ref({
  number: '',
  capacity: '',
  location: ''
})

const tables = ref([
  { id: 1, number: 1, capacity: 4, location: 'Main Floor', status: 'available', waiter: null, currentOrder: null },
  { id: 2, number: 2, capacity: 2, location: 'Main Floor', status: 'occupied', waiter: 'John Doe', currentOrder: 85.50 },
  { id: 3, number: 3, capacity: 6, location: 'Terrace', status: 'available', waiter: null, currentOrder: null },
  { id: 4, number: 4, capacity: 4, location: 'Main Floor', status: 'reserved', waiter: 'Jane Smith', currentOrder: null },
  { id: 5, number: 5, capacity: 8, location: 'Private Room', status: 'occupied', waiter: 'Mike Johnson', currentOrder: 124.75 },
  { id: 6, number: 6, capacity: 2, location: 'Bar Area', status: 'available', waiter: null, currentOrder: null },
  { id: 7, number: 7, capacity: 4, location: 'Main Floor', status: 'out-of-service', waiter: null, currentOrder: null },
  { id: 8, number: 8, capacity: 6, location: 'Terrace', status: 'available', waiter: null, currentOrder: null }
])

const availableTables = computed(() => tables.value.filter(t => t.status === 'available').length)
const occupiedTables = computed(() => tables.value.filter(t => t.status === 'occupied').length)
const reservedTables = computed(() => tables.value.filter(t => t.status === 'reserved').length)
const outOfServiceTables = computed(() => tables.value.filter(t => t.status === 'out-of-service').length)

const getTableStatusClass = (status) => {
  const classes = {
    'available': 'border-green-200 bg-green-50',
    'occupied': 'border-yellow-200 bg-yellow-50',
    'reserved': 'border-blue-200 bg-blue-50',
    'out-of-service': 'border-red-200 bg-red-50'
  }
  return classes[status] || 'border-gray-200 bg-gray-50'
}

const getStatusBadgeClass = (status) => {
  const classes = {
    'available': 'bg-green-100 text-green-800',
    'occupied': 'bg-yellow-100 text-yellow-800',
    'reserved': 'bg-blue-100 text-blue-800',
    'out-of-service': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const addTable = () => {
  const table = {
    id: tables.value.length + 1,
    number: parseInt(newTable.value.number),
    capacity: parseInt(newTable.value.capacity),
    location: newTable.value.location,
    status: 'available',
    waiter: null,
    currentOrder: null
  }
  
  tables.value.push(table)
  showAddTableModal.value = false
  
  // Reset form
  newTable.value = {
    number: '',
    capacity: '',
    location: ''
  }
}

const selectTable = (table) => {
  console.log('Selected table:', table)
}

const editTable = (table) => {
  console.log('Edit table:', table)
}

const changeTableStatus = (table) => {
  const statuses = ['available', 'occupied', 'reserved', 'out-of-service']
  const currentIndex = statuses.indexOf(table.status)
  const nextIndex = (currentIndex + 1) % statuses.length
  table.status = statuses[nextIndex]
}
</script>