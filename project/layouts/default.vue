<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <Transition name="slide">
      <div 
        v-show="sidebarOpen || !isMobile"
        class="fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-strong transform transition-transform duration-300 ease-in-out lg:translate-x-0"
        :class="{ '-translate-x-full': !sidebarOpen && isMobile }"
      >
        <div class="flex flex-col h-full">
          <!-- Logo -->
          <div class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-sm">
            <BuildingStorefrontIcon class="h-8 w-8 text-white mr-3" />
            <h1 class="text-xl font-bold text-white">ComandaGo</h1>
          </div>
          
          <!-- User Info -->
          <div class="p-4 border-b border-gray-200 bg-gray-50">
            <div class="flex items-center">
              <img :src="user?.avatar" :alt="user?.name" class="h-10 w-10 rounded-full object-cover">
              <div class="ml-3">
                <p class="text-sm font-medium text-gray-900">{{ user?.name }}</p>
                <p class="text-xs text-gray-500">{{ user?.restaurant?.name }}</p>
              </div>
            </div>
          </div>
          
          <!-- Navigation -->
          <nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            <NuxtLink 
              v-for="item in navigation" 
              :key="item.name"
              :to="item.href" 
              class="nav-link group"
              :class="{ active: $route.path === item.href }"
              @click="closeSidebarOnMobile"
            >
              <component :is="item.icon" class="w-5 h-5 mr-3 transition-colors" />
              {{ item.name }}
              <span v-if="item.badge" class="ml-auto badge badge-info">{{ item.badge }}</span>
            </NuxtLink>
          </nav>

          <!-- Footer -->
          <div class="p-4 border-t border-gray-200">
            <button @click="logout" class="w-full nav-link text-red-600 hover:text-red-700 hover:bg-red-50">
              <ArrowRightOnRectangleIcon class="w-5 h-5 mr-3" />
              Sign out
            </button>
          </div>
        </div>
      </div>
    </Transition>

    <!-- Mobile overlay -->
    <Transition name="fade">
      <div 
        v-if="sidebarOpen && isMobile" 
        class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" 
        @click="closeSidebar"
      ></div>
    </Transition>

    <!-- Main content -->
    <div class="lg:pl-64 flex flex-col min-h-screen">
      <!-- Top Navigation Bar -->
      <header class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div class="flex items-center justify-between h-16 px-4 lg:px-6">
          <div class="flex items-center">
            <button 
              @click="toggleSidebar" 
              class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg lg:hidden transition-colors"
            >
              <Bars3Icon class="w-6 h-6" />
            </button>
            
            <!-- Breadcrumb -->
            <nav class="hidden sm:flex ml-4 lg:ml-0" aria-label="Breadcrumb">
              <ol class="flex items-center space-x-2">
                <li>
                  <div class="flex items-center">
                    <HomeIcon class="h-4 w-4 text-gray-400" />
                    <span class="ml-2 text-sm font-medium text-gray-500">{{ currentPageName }}</span>
                  </div>
                </li>
              </ol>
            </nav>
          </div>

          <!-- Right side actions -->
          <div class="flex items-center space-x-4">
            <!-- Search -->
            <div class="hidden md:block relative">
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MagnifyingGlassIcon class="h-4 w-4 text-gray-400" />
              </div>
              <input 
                type="text" 
                placeholder="Search..." 
                class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <!-- Notifications -->
            <div class="relative">
              <button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">
                <BellIcon class="w-6 h-6" />
                <span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </button>
            </div>

            <!-- User Menu -->
            <div class="relative" ref="userMenuRef">
              <button 
                @click="showUserMenu = !showUserMenu"
                class="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"
              >
                <img :src="user?.avatar" :alt="user?.name" class="h-8 w-8 rounded-full object-cover">
                <span class="hidden md:block font-medium text-gray-700">{{ user?.name }}</span>
                <ChevronDownIcon class="hidden md:block h-4 w-4 text-gray-400" />
              </button>

              <!-- Dropdown Menu -->
              <Transition name="fade">
                <div v-if="showUserMenu" class="dropdown-menu">
                  <a href="#" class="dropdown-item">
                    <UserIcon class="h-4 w-4 mr-3" />
                    Profile Settings
                  </a>
                  <a href="#" class="dropdown-item">
                    <CogIcon class="h-4 w-4 mr-3" />
                    Account Settings
                  </a>
                  <div class="border-t border-gray-100 my-1"></div>
                  <button @click="logout" class="dropdown-item text-red-600 w-full text-left">
                    <ArrowRightOnRectangleIcon class="h-4 w-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </Transition>
            </div>
          </div>
        </div>
      </header>

      <!-- Page content -->
      <main class="flex-1 p-6 lg:p-8">
        <Transition name="fade" mode="out-in">
          <slot />
        </Transition>
      </main>
    </div>
  </div>
</template>

<script setup>
import {
  HomeIcon,
  BuildingStorefrontIcon,
  TableCellsIcon,
  CubeIcon,
  TagIcon,
  UserGroupIcon,
  ClockIcon,
  Bars3Icon,
  BellIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  UserIcon,
  CogIcon,
  ArrowRightOnRectangleIcon,
  ChartBarIcon
} from '@heroicons/vue/24/outline'

const { user, logout } = useAuth()
const route = useRoute()

const sidebarOpen = ref(false)
const showUserMenu = ref(false)
const userMenuRef = ref(null)
const isMobile = ref(false)

const navigation = [
  { name: 'Dashboard', href: '/', icon: ChartBarIcon },
  { name: 'Informações do Restaurante', href: '/restaurant', icon: BuildingStorefrontIcon },
  { name: 'Mesas', href: '/tables', icon: TableCellsIcon, badge: '24' },
  { name: 'Produtos', href: '/products', icon: CubeIcon, badge: '156' },
  { name: 'Categorias', href: '/categories', icon: TagIcon },
  { name: 'Garçons', href: '/waiters', icon: UserGroupIcon, badge: '8' },
  { name: 'Histórico de Pedido', href: '/history', icon: ClockIcon }
]

const currentPageName = computed(() => {
  const currentNav = navigation.find(item => item.href === route.path)
  return currentNav?.name || 'Dashboard'
})

const toggleSidebar = () => {
  sidebarOpen.value = !sidebarOpen.value
}

const closeSidebar = () => {
  sidebarOpen.value = false
}

const closeSidebarOnMobile = () => {
  if (isMobile.value) {
    closeSidebar()
  }
}

const checkMobile = () => {
  isMobile.value = window.innerWidth < 1024
}

// Close user menu when clicking outside
onClickOutside(userMenuRef, () => {
  showUserMenu.value = false
})

// Handle responsive behavior
onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Close sidebar on route change (mobile)
watch(() => route.path, () => {
  closeSidebarOnMobile()
})
</script>