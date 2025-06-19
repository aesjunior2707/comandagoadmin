import { ref, computed, watch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { DocumentArrowDownIcon, ArrowPathIcon, CurrencyDollarIcon, ReceiptPercentIcon } from '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "history",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedDateRange = ref("today");
    const selectedTable = ref("");
    const selectedWaiter = ref("");
    const selectedStatus = ref("");
    const currentPage = ref(1);
    const itemsPerPage = ref(10);
    const orders = ref([
      {
        id: 1001,
        table: 5,
        waiter: "John Doe",
        items: [
          { name: "Margherita Pizza", quantity: 1, price: 18.99 },
          { name: "Caesar Salad", quantity: 1, price: 14.99 }
        ],
        total: 33.98,
        status: "completed",
        date: /* @__PURE__ */ new Date("2024-01-25T12:30:00"),
        paymentMethod: "Credit Card"
      },
      {
        id: 1002,
        table: 12,
        waiter: "Jane Smith",
        items: [
          { name: "Spaghetti Carbonara", quantity: 2, price: 16.99 },
          { name: "Tiramisu", quantity: 1, price: 8.99 }
        ],
        total: 42.97,
        status: "completed",
        date: /* @__PURE__ */ new Date("2024-01-25T13:15:00"),
        paymentMethod: "Cash"
      },
      {
        id: 1003,
        table: 3,
        waiter: "Mike Johnson",
        items: [
          { name: "Grilled Salmon", quantity: 1, price: 24.99 }
        ],
        total: 24.99,
        status: "cancelled",
        date: /* @__PURE__ */ new Date("2024-01-25T14:00:00"),
        paymentMethod: "Credit Card"
      },
      {
        id: 1004,
        table: 8,
        waiter: "Sarah Wilson",
        items: [
          { name: "Bruschetta", quantity: 2, price: 9.99 },
          { name: "Chicken Caesar Salad", quantity: 1, price: 14.99 }
        ],
        total: 34.97,
        status: "completed",
        date: /* @__PURE__ */ new Date("2024-01-25T15:30:00"),
        paymentMethod: "Credit Card"
      }
    ]);
    const availableTables = computed(() => [...new Set(orders.value.map((o) => o.table))].sort((a, b) => a - b));
    const availableWaiters = computed(() => [...new Set(orders.value.map((o) => o.waiter))].sort());
    const todayRevenue = computed(() => {
      return orders.value.filter((o) => o.status === "completed" && isToday(o.date)).reduce((sum, o) => sum + o.total, 0).toFixed(2);
    });
    const todayOrders = computed(() => {
      return orders.value.filter((o) => isToday(o.date)).length;
    });
    computed(() => 25);
    computed(() => 4.6);
    const filteredOrders = computed(() => {
      let filtered = orders.value;
      if (selectedTable.value) {
        filtered = filtered.filter((o) => o.table === parseInt(selectedTable.value));
      }
      if (selectedWaiter.value) {
        filtered = filtered.filter((o) => o.waiter === selectedWaiter.value);
      }
      if (selectedStatus.value) {
        filtered = filtered.filter((o) => o.status === selectedStatus.value);
      }
      if (selectedDateRange.value === "today") {
        filtered = filtered.filter((o) => isToday(o.date));
      }
      return filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    });
    const totalPages = computed(() => Math.ceil(filteredOrders.value.length / itemsPerPage.value));
    const paginatedOrders = computed(() => {
      const start = (currentPage.value - 1) * itemsPerPage.value;
      const end = start + itemsPerPage.value;
      return filteredOrders.value.slice(start, end);
    });
    const isToday = (date) => {
      const today = /* @__PURE__ */ new Date();
      return date.toDateString() === today.toDateString();
    };
    const formatDate = (date) => {
      return date.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
      });
    };
    const getStatusBadgeClass = (status) => {
      const classes = {
        "completed": "bg-green-100 text-green-800",
        "cancelled": "bg-red-100 text-red-800",
        "refunded": "bg-yellow-100 text-yellow-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    watch([selectedTable, selectedWaiter, selectedStatus, selectedDateRange], () => {
      currentPage.value = 1;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Hist\xF3rico de Mesas e Contas</h1><p class="text-gray-600">Ver hist\xF3rico de pedidos e gerenciar contas de clientes</p></div><div class="flex gap-3"><button class="btn-secondary">`);
      _push(ssrRenderComponent(unref(DocumentArrowDownIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Exportar </button><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(ArrowPathIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Atualizar </button></div></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-green-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-green-600" }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-gray-600 mb-1">Faturamento de Hoje</p><p class="text-2xl font-bold text-gray-900">R$${ssrInterpolate(unref(todayRevenue))}</p></div></div></div><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-blue-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(ReceiptPercentIcon), { class: "w-6 h-6 text-blue-600" }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-gray-600 mb-1">Pedidos de Hoje</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(todayOrders))}</p></div></div></div></div><div class="card mb-8"><div class="grid grid-cols-1 md:grid-cols-4 gap-4"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Per\xEDodo de Datas</label><select class="input-field"><option value="today"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDateRange)) ? ssrLooseContain(unref(selectedDateRange), "today") : ssrLooseEqual(unref(selectedDateRange), "today")) ? " selected" : ""}>Today</option><option value="week"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDateRange)) ? ssrLooseContain(unref(selectedDateRange), "week") : ssrLooseEqual(unref(selectedDateRange), "week")) ? " selected" : ""}>This Week</option><option value="month"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDateRange)) ? ssrLooseContain(unref(selectedDateRange), "month") : ssrLooseEqual(unref(selectedDateRange), "month")) ? " selected" : ""}>This Month</option><option value="custom"${ssrIncludeBooleanAttr(Array.isArray(unref(selectedDateRange)) ? ssrLooseContain(unref(selectedDateRange), "custom") : ssrLooseEqual(unref(selectedDateRange), "custom")) ? " selected" : ""}>Custom Range</option></select></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Mesas</label><select class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTable)) ? ssrLooseContain(unref(selectedTable), "") : ssrLooseEqual(unref(selectedTable), "")) ? " selected" : ""}>All Tables</option><!--[-->`);
      ssrRenderList(unref(availableTables), (table) => {
        _push(`<option${ssrRenderAttr("value", table)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedTable)) ? ssrLooseContain(unref(selectedTable), table) : ssrLooseEqual(unref(selectedTable), table)) ? " selected" : ""}>Table ${ssrInterpolate(table)}</option>`);
      });
      _push(`<!--]--></select></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Gar\xE7ons</label><select class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedWaiter)) ? ssrLooseContain(unref(selectedWaiter), "") : ssrLooseEqual(unref(selectedWaiter), "")) ? " selected" : ""}>All Waiters</option><!--[-->`);
      ssrRenderList(unref(availableWaiters), (waiter) => {
        _push(`<option${ssrRenderAttr("value", waiter)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedWaiter)) ? ssrLooseContain(unref(selectedWaiter), waiter) : ssrLooseEqual(unref(selectedWaiter), waiter)) ? " selected" : ""}>${ssrInterpolate(waiter)}</option>`);
      });
      _push(`<!--]--></select></div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden"><div class="p-6 border-b border-gray-200"><div class="flex justify-between items-center"><h2 class="text-xl font-semibold text-gray-900">Pedidos Recentes</h2><div class="flex items-center gap-2"><span class="text-sm text-gray-600">${ssrInterpolate(unref(filteredOrders).length)} orders</span></div></div></div><div class="overflow-x-auto"><table class="data-table"><thead><tr><th>Order #</th><th>Table</th><th>Waiter</th><th>Items</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(unref(paginatedOrders), (order) => {
        _push(`<tr><td class="font-medium"> #${ssrInterpolate(order.id.toString().padStart(4, "0"))}</td><td>Table ${ssrInterpolate(order.table)}</td><td>${ssrInterpolate(order.waiter)}</td><td>${ssrInterpolate(order.items.length)} items</td><td class="font-semibold">R$${ssrInterpolate(order.total.toFixed(2))}</td><td><span class="${ssrRenderClass([getStatusBadgeClass(order.status), "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"])}">${ssrInterpolate(order.status)}</span></td><td class="text-gray-500">${ssrInterpolate(formatDate(order.date))}</td><td><div class="flex gap-2"><button class="text-emerald-600 hover:text-emerald-900 text-sm font-medium"> View </button><button class="text-gray-600 hover:text-gray-900 text-sm font-medium"> Print </button></div></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div><div class="flex items-center justify-between p-6 border-t border-gray-200"><div class="text-sm text-gray-700"> Showing ${ssrInterpolate((unref(currentPage) - 1) * unref(itemsPerPage) + 1)} to ${ssrInterpolate(Math.min(unref(currentPage) * unref(itemsPerPage), unref(filteredOrders).length))} of ${ssrInterpolate(unref(filteredOrders).length)} results </div><div class="flex gap-2"><button${ssrIncludeBooleanAttr(unref(currentPage) === 1) ? " disabled" : ""} class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded font-medium"> Previous </button><button${ssrIncludeBooleanAttr(unref(currentPage) >= unref(totalPages)) ? " disabled" : ""} class="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 disabled:opacity-50 rounded font-medium"> Next </button></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/history.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=history-8jirHT6z.mjs.map
