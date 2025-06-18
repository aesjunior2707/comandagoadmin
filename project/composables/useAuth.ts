export const useAuth = () => {
  const user = useState('auth.user', () => null)
  const isAuthenticated = computed(() => !!user.value)
  const isLoading = useState('auth.loading', () => false)

  const login = async (credentials: { email: string; password: string }) => {
    isLoading.value = true
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Mock authentication - in real app, this would be an API call
      if (credentials.email === 'admin@comandago.com' && credentials.password === 'admin123') {
        user.value = {
          id: 1,
          name: 'Restaurant Admin',
          email: credentials.email,
          role: 'admin',
          avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400',
          restaurant: {
            name: 'La Bella Vista',
            id: 'rest_001'
          }
        }
        
        await navigateTo('/')
        return { success: true }
      } else {
        throw new Error('Invalid credentials')
      }
    } catch (error) {
      return { 
        success: false, 
        error: error.message || 'Login failed' 
      }
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    user.value = null
    await navigateTo('/login')
  }

  const updateProfile = (updates: Partial<typeof user.value>) => {
    if (user.value) {
      user.value = { ...user.value, ...updates }
    }
  }

  return {
    user: readonly(user),
    isAuthenticated,
    isLoading: readonly(isLoading),
    login,
    logout,
    updateProfile
  }
}