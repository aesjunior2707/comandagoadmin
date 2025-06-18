<template>
  <div class="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8">
      <!-- Logo and Header -->
      <div class="text-center">
        <div class="mx-auto h-16 w-16 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">
          <BuildingStorefrontIcon class="h-8 w-8 text-white" />
        </div>
        <h2 class="mt-6 text-3xl font-bold text-gray-900">Welcome back</h2>
        <p class="mt-2 text-sm text-gray-600">Sign in to your ComandaGo Admin account</p>
      </div>

      <!-- Login Form -->
      <div class="card">
        <div class="card-body">
          <form @submit.prevent="handleLogin" class="space-y-6">
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                v-model="form.email"
                type="email"
                autocomplete="email"
                required
                class="input-field"
                :class="{ 'input-error': errors.email }"
                placeholder="admin@comandago.com"
              />
              <p v-if="errors.email" class="mt-1 text-sm text-red-600">{{ errors.email }}</p>
            </div>

            <div>
              <label for="password" class="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div class="relative">
                <input
                  id="password"
                  v-model="form.password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="current-password"
                  required
                  class="input-field pr-10"
                  :class="{ 'input-error': errors.password }"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  @click="showPassword = !showPassword"
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  <EyeSlashIcon v-else class="h-5 w-5 text-gray-400 hover:text-gray-600" />
                </button>
              </div>
              <p v-if="errors.password" class="mt-1 text-sm text-red-600">{{ errors.password }}</p>
            </div>

            <div class="flex items-center justify-between">
              <div class="flex items-center">
                <input
                  id="remember-me"
                  v-model="form.rememberMe"
                  type="checkbox"
                  class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label for="remember-me" class="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>

              <div class="text-sm">
                <a href="#" class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors">
                  Forgot your password?
                </a>
              </div>
            </div>

            <div v-if="loginError" class="bg-red-50 border border-red-200 rounded-lg p-4">
              <div class="flex">
                <ExclamationTriangleIcon class="h-5 w-5 text-red-400" />
                <div class="ml-3">
                  <p class="text-sm text-red-800">{{ loginError }}</p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              :disabled="isLoading"
              class="w-full btn-primary py-3 text-base font-semibold"
            >
              <div v-if="isLoading" class="flex items-center justify-center">
                <div class="loading-spinner mr-2"></div>
                Signing in...
              </div>
              <span v-else>Sign in</span>
            </button>
          </form>
        </div>
      </div>

      <!-- Demo Credentials -->
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div class="flex">
          <InformationCircleIcon class="h-5 w-5 text-blue-400 mt-0.5" />
          <div class="ml-3">
            <h3 class="text-sm font-medium text-blue-800">Demo Credentials</h3>
            <div class="mt-2 text-sm text-blue-700">
              <p><strong>Email:</strong> admin@comandago.com</p>
              <p><strong>Password:</strong> admin123</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="text-center">
        <p class="text-xs text-gray-500">
          © 2024 ComandaGo Admin. Professional Restaurant Management System.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { 
  BuildingStorefrontIcon, 
  EyeIcon, 
  EyeSlashIcon, 
  ExclamationTriangleIcon,
  InformationCircleIcon 
} from '@heroicons/vue/24/outline'

definePageMeta({
  layout: false
})

const { login, isLoading } = useAuth()

const form = ref({
  email: '',
  password: '',
  rememberMe: false
})

const errors = ref({})
const loginError = ref('')
const showPassword = ref(false)

const validateLoginForm = () => {
  errors.value = {}
  
  if (!form.value.email) {
    errors.value.email = 'Email is required'
  } else if (!/\S+@\S+\.\S+/.test(form.value.email)) {
    errors.value.email = 'Please enter a valid email address'
  }
  
  if (!form.value.password) {
    errors.value.password = 'Password is required'
  } else if (form.value.password.length < 6) {
    errors.value.password = 'Password must be at least 6 characters'
  }
  
  return Object.keys(errors.value).length === 0
}

const handleLogin = async () => {
  loginError.value = ''
  
  if (!validateLoginForm()) {
    return
  }
  
  const result = await login({
    email: form.value.email,
    password: form.value.password
  })
  
  if (!result.success) {
    loginError.value = result.error
  }
}

// Auto-fill demo credentials for easier testing
onMounted(() => {
  form.value.email = 'admin@comandago.com'
  form.value.password = 'admin123'
})
</script>