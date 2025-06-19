import { d as defineStore, p as persistedState, n as navigateTo } from './server.mjs';

const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    isLoading: false
  }),
  getters: {
    isAuthenticated: (state) => !!state.user,
    currentUser: (state) => state.user,
    restaurantName: (state) => {
      var _a, _b;
      return ((_b = (_a = state.user) == null ? void 0 : _a.restaurant) == null ? void 0 : _b.name) || "";
    },
    userRole: (state) => {
      var _a;
      return ((_a = state.user) == null ? void 0 : _a.role) || "";
    }
  },
  actions: {
    async login(credentials) {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        this.user = {
          id: 1,
          name: "Restaurant Admin",
          email: credentials.email,
          role: "admin",
          avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
          restaurant: {
            name: "La Bella Vista",
            id: "rest_001"
          }
        };
        await navigateTo("/");
        return { success: true };
      } catch (error) {
        return {
          success: false,
          error: error.message || "Login failed"
        };
      } finally {
        this.isLoading = false;
      }
    },
    async logout() {
      this.user = null;
      await navigateTo("/login");
    },
    updateProfile(updates) {
      if (this.user) {
        this.user = { ...this.user, ...updates };
      }
    },
    // Initialize user from stored session (for SSR/hydration)
    initializeAuth() {
    }
  },
  persist: {
    storage: persistedState.localStorage,
    paths: ["user"]
  }
});

export { useAuthStore as u };
//# sourceMappingURL=auth-Rwvlx_hr.mjs.map
