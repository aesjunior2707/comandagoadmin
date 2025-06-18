<template>
  <div>
    <!-- Header -->
    <div class="flex justify-between items-center mb-8">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Waiters Management</h1>
        <p class="text-gray-600">Manage your restaurant staff and their performance</p>
      </div>
      <button @click="showAddWaiterModal = true" class="btn-primary">
        <PlusIcon class="w-4 h-4 mr-2" />
        Add Waiter
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
            <p class="text-sm font-medium text-gray-600 mb-1">Total Staff</p>
            <p class="text-2xl font-bold text-gray-900">{{ totalWaiters }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-green-100 rounded-lg">
            <CheckCircleIcon class="w-6 h-6 text-green-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">On Duty</p>
            <p class="text-2xl font-bold text-gray-900">{{ onDutyWaiters }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-yellow-100 rounded-lg">
            <ClockIcon class="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">On Break</p>
            <p class="text-2xl font-bold text-gray-900">{{ onBreakWaiters }}</p>
          </div>
        </div>
      </div>

      <div class="card">
        <div class="flex items-center space-x-4">
          <div class="p-3 bg-red-100 rounded-lg">
            <XCircleIcon class="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-600 mb-1">Off Duty</p>
            <p class="text-2xl font-bold text-gray-900">{{ offDutyWaiters }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Waiters Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="waiter in waiters" :key="waiter.id" class="card hover:shadow-lg transition-shadow duration-200">
        <div class="flex items-center mb-6 space-x-4">
          <img :src="waiter.avatar" :alt="waiter.name" class="w-16 h-16 rounded-full object-cover">
          <div class="flex-1">
            <h3 class="text-lg font-semibold text-gray-900">{{ waiter.name }}</h3>
            <p class="text-gray-600 mb-2">{{ waiter.position }}</p>
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  :class="getStatusBadgeClass(waiter.status)">
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
            <span class="text-gray-600">Tables Served:</span>
            <span class="font-medium">{{ waiter.tablesServed }} today</span>
          </div>
          <div class="flex justify-between text-sm">
            <span class="text-gray-600">Rating:</span>
            <div class="flex items-center space-x-1">
              <div class="flex text-yellow-400">
                <StarIcon v-for="i in 5" :key="i" 
                         :class="i <= waiter.rating ? 'text-yellow-400' : 'text-gray-300'"
                         class="w-4 h-4" />
              </div>
              <span class="text-gray-600">({{ waiter.rating }})</span>
            </div>
          </div>
        </div>

        <div class="flex gap-3 pt-4 border-t border-gray-100">
          <button @click="editWaiter(waiter)" class="flex-1 btn-secondary text-sm">
            <PencilIcon class="w-4 h-4 mr-2" />
            Edit
          </button>
          <button @click="changeWaiterStatus(waiter)" class="flex-1 text-sm py-2 px-3 rounded-lg font-medium transition-colors"
                  :class="getStatusButtonClass(waiter.status)">
            {{ getStatusButtonText(waiter.status) }}
          </button>
        </div>
      </div>
    </div>

    <!-- Add Waiter Modal -->
    <div v-if="showAddWaiterModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto">
        <div class="p-8">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Waiter</h2>
          <form @submit.prevent="addWaiter" class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                <input v-model="newWaiter.firstName" type="text" class="input-field" required>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                <input v-model="newWaiter.lastName" type="text" class="input-field" required>
              </div>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Position</label>
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
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                <input v-model="newWaiter.phone" type="tel" class="input-field" required>
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label>
                <input v-model="newWaiter.experience" type="number" min="0" class="input-field" required>
              </div>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input v-model="newWaiter.email" type="email" class="input-field" required>
            </div>
            
            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label>
              <input v-model="newWaiter.avatar" type="url" class="input-field">
            </div>
            
            <div class="flex gap-4 pt-6">
              <button type="button" @click="showAddWaiterModal = false" class="flex-1 btn-secondary">
                Cancel
              </button>
              <button type="submit" class="flex-1 btn-primary">
                Add Waiter
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
  StarIcon
} from '@heroicons/vue/24/outline'

const showAddWaiterModal = ref(false)

const newWaiter = ref({
  firstName: '',
  lastName: '',
  position: '',
  phone: '',
  email: '',
  experience: '',
  avatar: ''
})

const waiters = ref([
  {
    id: 1,
    name: 'John Doe',
    position: 'Senior Waiter',
    phone: '+1 (555) 123-4567',
    email: 'john.doe@restaurant.com',
    experience: 5,
    status: 'on-duty',
    tablesServed: 8,
    rating: 4.8,
    avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    name: 'Jane Smith',
    position: 'Waiter',
    phone: '+1 (555) 234-5678',
    email: 'jane.smith@restaurant.com',
    experience: 3,
    status: 'on-break',
    tablesServed: 5,
    rating: 4.6,
    avatar: 'https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    name: 'Mike Johnson',
    position: 'Head Waiter',
    phone: '+1 (555) 345-6789',
    email: 'mike.johnson@restaurant.com',
    experience: 8,
    status: 'on-duty',
    tablesServed: 12,
    rating: 4.9,
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    name: 'Sarah Wilson',
    position: 'Waiter',
    phone: '+1 (555) 456-7890',
    email: 'sarah.wilson@restaurant.com',
    experience: 2,
    status: 'on-duty',
    tablesServed: 6,
    rating: 4.4,
    avatar: 'https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    name: 'David Brown',
    position: 'Sommelier',
    phone: '+1 (555) 567-8901',
    email: 'david.brown@restaurant.com',
    experience: 12,
    status: 'off-duty',
    tablesServed: 0,
    rating: 4.7,
    avatar: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    name: 'Lisa Garcia',
    position: 'Waiter',
    phone: '+1 (555) 678-9012',
    email: 'lisa.garcia@restaurant.com',
    experience: 4,
    status: 'on-duty',
    tablesServed: 9,
    rating: 4.5,
    avatar: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
])

const totalWaiters = computed(() => waiters.value.length)
const onDutyWaiters = computed(() => waiters.value.filter(w => w.status === 'on-duty').length)
const onBreakWaiters = computed(() => waiters.value.filter(w => w.status === 'on-break').length)
const offDutyWaiters = computed(() => waiters.value.filter(w => w.status === 'off-duty').length)

const getStatusBadgeClass = (status) => {
  const classes = {
    'on-duty': 'bg-green-100 text-green-800',
    'on-break': 'bg-yellow-100 text-yellow-800',
    'off-duty': 'bg-red-100 text-red-800'
  }
  return classes[status] || 'bg-gray-100 text-gray-800'
}

const getStatusButtonClass = (status) => {
  const classes = {
    'on-duty': 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700',
    'on-break': 'bg-green-100 hover:bg-green-200 text-green-700',
    'off-duty': 'bg-green-100 hover:bg-green-200 text-green-700'
  }
  return classes[status] || 'bg-gray-100 hover:bg-gray-200 text-gray-700'
}

const getStatusButtonText = (status) => {
  const texts = {
    'on-duty': 'Break',
    'on-break': 'Resume',
    'off-duty': 'Clock In'
  }
  return texts[status] || 'Change'
}

const addWaiter = () => {
  const waiter = {
    id: waiters.value.length + 1,
    name: `${newWaiter.value.firstName} ${newWaiter.value.lastName}`,
    position: newWaiter.value.position,
    phone: newWaiter.value.phone,
    email: newWaiter.value.email,
    experience: parseInt(newWaiter.value.experience),
    status: 'off-duty',
    tablesServed: 0,
    rating: 4.0,
    avatar: newWaiter.value.avatar || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=400'
  }
  
  waiters.value.push(waiter)
  showAddWaiterModal.value = false
  
  // Reset form
  newWaiter.value = {
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    email: '',
    experience: '',
    avatar: ''
  }
}

const editWaiter = (waiter) => {
  console.log('Edit waiter:', waiter)
}

const changeWaiterStatus = (waiter) => {
  const statusFlow = {
    'off-duty': 'on-duty',
    'on-duty': 'on-break',
    'on-break': 'on-duty'
  }
  waiter.status = statusFlow[waiter.status] || 'off-duty'
}
</script>