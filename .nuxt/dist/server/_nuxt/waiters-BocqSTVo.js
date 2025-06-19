import { d as defineStore } from "../server.mjs";
const useWaitersStore = defineStore("waiters", {
  state: () => ({
    waiters: [
      {
        id: 1,
        name: "John Doe",
        position: "Senior Waiter",
        phone: "+1 (555) 123-4567",
        email: "john.doe@restaurant.com",
        experience: 5,
        status: "on-duty",
        tablesServed: 8,
        rating: 4.8,
        avatar: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 2,
        name: "Jane Smith",
        position: "Waiter",
        phone: "+1 (555) 234-5678",
        email: "jane.smith@restaurant.com",
        experience: 3,
        status: "on-break",
        tablesServed: 5,
        rating: 4.6,
        avatar: "https://images.pexels.com/photos/1065084/pexels-photo-1065084.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 3,
        name: "Mike Johnson",
        position: "Head Waiter",
        phone: "+1 (555) 345-6789",
        email: "mike.johnson@restaurant.com",
        experience: 8,
        status: "on-duty",
        tablesServed: 12,
        rating: 4.9,
        avatar: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 4,
        name: "Sarah Wilson",
        position: "Waiter",
        phone: "+1 (555) 456-7890",
        email: "sarah.wilson@restaurant.com",
        experience: 2,
        status: "on-duty",
        tablesServed: 6,
        rating: 4.4,
        avatar: "https://images.pexels.com/photos/1036622/pexels-photo-1036622.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 5,
        name: "David Brown",
        position: "Sommelier",
        phone: "+1 (555) 567-8901",
        email: "david.brown@restaurant.com",
        experience: 12,
        status: "off-duty",
        tablesServed: 0,
        rating: 4.7,
        avatar: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=400"
      },
      {
        id: 6,
        name: "Lisa Garcia",
        position: "Waiter",
        phone: "+1 (555) 678-9012",
        email: "lisa.garcia@restaurant.com",
        experience: 4,
        status: "on-duty",
        tablesServed: 9,
        rating: 4.5,
        avatar: "https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=400"
      }
    ],
    isLoading: false
  }),
  getters: {
    allWaiters: (state) => state.waiters,
    onDutyWaiters: (state) => state.waiters.filter((w) => w.status === "on-duty"),
    onBreakWaiters: (state) => state.waiters.filter((w) => w.status === "on-break"),
    offDutyWaiters: (state) => state.waiters.filter((w) => w.status === "off-duty"),
    totalWaiters: (state) => state.waiters.length,
    topPerformingWaiters: (state) => [...state.waiters].filter((w) => w.status === "on-duty").sort((a, b) => b.tablesServed - a.tablesServed).slice(0, 3),
    getWaiterById: (state) => (id) => state.waiters.find((w) => w.id === id),
    waiterStatusCounts: (state) => ({
      onDuty: state.waiters.filter((w) => w.status === "on-duty").length,
      onBreak: state.waiters.filter((w) => w.status === "on-break").length,
      offDuty: state.waiters.filter((w) => w.status === "off-duty").length
    })
  },
  actions: {
    async addWaiter(waiterData) {
      this.isLoading = true;
      try {
        const newWaiter = {
          id: Math.max(...this.waiters.map((w) => w.id)) + 1,
          ...waiterData,
          status: "off-duty",
          tablesServed: 0,
          rating: 4
        };
        this.waiters.push(newWaiter);
        return { success: true, waiter: newWaiter };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async updateWaiterStatus(waiterId, status) {
      const waiter = this.waiters.find((w) => w.id === waiterId);
      if (waiter) {
        waiter.status = status;
        if (status === "off-duty") {
          waiter.tablesServed = 0;
        }
        return { success: true, waiter };
      }
      return { success: false, error: "Waiter not found" };
    },
    async updateWaiter(waiterId, updates) {
      this.isLoading = true;
      try {
        const waiterIndex = this.waiters.findIndex((w) => w.id === waiterId);
        if (waiterIndex !== -1) {
          this.waiters[waiterIndex] = { ...this.waiters[waiterIndex], ...updates };
          return { success: true, waiter: this.waiters[waiterIndex] };
        }
        return { success: false, error: "Waiter not found" };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async deleteWaiter(waiterId) {
      this.isLoading = true;
      try {
        const waiterIndex = this.waiters.findIndex((w) => w.id === waiterId);
        if (waiterIndex !== -1) {
          this.waiters.splice(waiterIndex, 1);
          return { success: true };
        }
        return { success: false, error: "Waiter not found" };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    incrementTablesServed(waiterId) {
      const waiter = this.waiters.find((w) => w.id === waiterId);
      if (waiter) {
        waiter.tablesServed++;
      }
    }
  }
});
export {
  useWaitersStore as u
};
//# sourceMappingURL=waiters-BocqSTVo.js.map
