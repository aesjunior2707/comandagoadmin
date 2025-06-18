<template>
  <div>
    <!-- Header -->
    <div class="mb-8">
      <h1 class="text-3xl font-bold text-gray-900 mb-2">Restaurant Information</h1>
      <p class="text-gray-600">Manage your restaurant's basic information and settings</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <!-- Restaurant Info Form -->
      <div class="lg:col-span-2">
        <div class="card">
          <h2 class="text-xl font-semibold text-gray-900 mb-6">Basic Information</h2>
          <form @submit.prevent="saveRestaurantInfo" class="form-section">
            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Restaurant Name</label>
                <input v-model="restaurantInfo.name" type="text" class="input-field" placeholder="Enter restaurant name">
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Cuisine Type</label>
                <select v-model="restaurantInfo.cuisineType" class="input-field">
                  <option value="">Select cuisine type</option>
                  <option value="italian">Italian</option>
                  <option value="mexican">Mexican</option>
                  <option value="asian">Asian</option>
                  <option value="american">American</option>
                  <option value="international">International</option>
                </select>
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Address</label>
              <textarea v-model="restaurantInfo.address" rows="3" class="input-field" placeholder="Enter full address"></textarea>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                <input v-model="restaurantInfo.phone" type="tel" class="input-field" placeholder="+1 (555) 123-4567">
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input v-model="restaurantInfo.email" type="email" class="input-field" placeholder="info@restaurant.com">
              </div>
            </div>

            <div class="form-row">
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Opening Time</label>
                <input v-model="restaurantInfo.openingTime" type="time" class="input-field">
              </div>
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-2">Closing Time</label>
                <input v-model="restaurantInfo.closingTime" type="time" class="input-field">
              </div>
            </div>

            <div class="form-group">
              <label class="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea v-model="restaurantInfo.description" rows="4" class="input-field" placeholder="Brief description of your restaurant"></textarea>
            </div>

            <div class="flex justify-end pt-4">
              <button type="submit" class="btn-primary">
                <CheckIcon class="w-4 h-4 mr-2" />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      <!-- Restaurant Stats -->
      <div class="space-y-6">
        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Restaurant Stats</h3>
          <div class="space-y-4">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total Tables</span>
              <span class="font-semibold text-gray-900">24</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Menu Items</span>
              <span class="font-semibold text-gray-900">156</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Staff Members</span>
              <span class="font-semibold text-gray-900">8</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">This Month Orders</span>
              <span class="font-semibold text-gray-900">1,245</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-lg font-semibold text-gray-900 mb-6">Operating Hours</h3>
          <div class="space-y-3">
            <div v-for="day in operatingHours" :key="day.day" class="flex justify-between items-center">
              <span class="text-gray-600">{{ day.day }}</span>
              <span class="font-medium text-gray-900">{{ day.hours }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { CheckIcon } from '@heroicons/vue/24/outline'

const restaurantInfo = ref({
  name: 'La Bella Vista',
  cuisineType: 'italian',
  address: '123 Main Street, Downtown\nCity, State 12345',
  phone: '+1 (555) 123-4567',
  email: 'info@labellavista.com',
  openingTime: '09:00',
  closingTime: '22:00',
  description: 'Authentic Italian cuisine in the heart of downtown. Fresh ingredients, traditional recipes, and warm hospitality.'
})

const operatingHours = ref([
  { day: 'Monday', hours: '9:00 AM - 10:00 PM' },
  { day: 'Tuesday', hours: '9:00 AM - 10:00 PM' },
  { day: 'Wednesday', hours: '9:00 AM - 10:00 PM' },
  { day: 'Thursday', hours: '9:00 AM - 10:00 PM' },
  { day: 'Friday', hours: '9:00 AM - 11:00 PM' },
  { day: 'Saturday', hours: '9:00 AM - 11:00 PM' },
  { day: 'Sunday', hours: '10:00 AM - 9:00 PM' }
])

const saveRestaurantInfo = () => {
  // In a real app, this would save to a database
  console.log('Saving restaurant info:', restaurantInfo.value)
  // Show success message
  alert('Restaurant information saved successfully!')
}
</script>