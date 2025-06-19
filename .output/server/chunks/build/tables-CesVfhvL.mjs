import { d as defineStore } from './server.mjs';

const useTablesStore = defineStore("tables", {
  state: () => ({
    tables: [
      { id: 1, number: 1, capacity: 4, location: "Main Floor", status: "available", waiter: null, currentOrder: null },
      { id: 2, number: 2, capacity: 2, location: "Main Floor", status: "occupied", waiter: "John Doe", currentOrder: 85.5 },
      { id: 3, number: 3, capacity: 6, location: "Terrace", status: "available", waiter: null, currentOrder: null },
      { id: 4, number: 4, capacity: 4, location: "Main Floor", status: "reserved", waiter: "Jane Smith", currentOrder: null },
      { id: 5, number: 5, capacity: 8, location: "Private Room", status: "occupied", waiter: "Mike Johnson", currentOrder: 124.75 },
      { id: 6, number: 6, capacity: 2, location: "Bar Area", status: "available", waiter: null, currentOrder: null },
      { id: 7, number: 7, capacity: 4, location: "Main Floor", status: "out-of-service", waiter: null, currentOrder: null },
      { id: 8, number: 8, capacity: 6, location: "Terrace", status: "available", waiter: null, currentOrder: null }
    ],
    isLoading: false
  }),
  getters: {
    allTables: (state) => state.tables,
    availableTables: (state) => state.tables.filter((t) => t.status === "available"),
    occupiedTables: (state) => state.tables.filter((t) => t.status === "occupied"),
    reservedTables: (state) => state.tables.filter((t) => t.status === "reserved"),
    outOfServiceTables: (state) => state.tables.filter((t) => t.status === "out-of-service"),
    totalTables: (state) => state.tables.length,
    tableStatusCounts: (state) => ({
      available: state.tables.filter((t) => t.status === "available").length,
      occupied: state.tables.filter((t) => t.status === "occupied").length,
      reserved: state.tables.filter((t) => t.status === "reserved").length,
      outOfService: state.tables.filter((t) => t.status === "out-of-service").length
    }),
    getTableById: (state) => (id) => state.tables.find((t) => t.id === id)
  },
  actions: {
    async addTable(tableData) {
      this.isLoading = true;
      try {
        const newTable = {
          id: Math.max(...this.tables.map((t) => t.id)) + 1,
          ...tableData,
          status: "available",
          waiter: null,
          currentOrder: null
        };
        this.tables.push(newTable);
        return { success: true, table: newTable };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async updateTableStatus(tableId, status) {
      const table = this.tables.find((t) => t.id === tableId);
      if (table) {
        table.status = status;
        if (status === "available") {
          table.waiter = null;
          table.currentOrder = null;
        }
        return { success: true };
      }
      return { success: false, error: "Table not found" };
    },
    async assignWaiterToTable(tableId, waiterName) {
      const table = this.tables.find((t) => t.id === tableId);
      if (table) {
        table.waiter = waiterName;
        return { success: true };
      }
      return { success: false, error: "Table not found" };
    },
    async updateTableOrder(tableId, orderTotal) {
      const table = this.tables.find((t) => t.id === tableId);
      if (table) {
        table.currentOrder = orderTotal;
        return { success: true };
      }
      return { success: false, error: "Table not found" };
    }
  }
});

export { useTablesStore as u };
//# sourceMappingURL=tables-CesVfhvL.mjs.map
