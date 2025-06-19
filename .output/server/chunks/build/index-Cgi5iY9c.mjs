import { _ as __nuxt_component_0 } from './nuxt-link-GnlWUqLn.mjs';
import { mergeProps, unref, withCtx, createTextVNode, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrRenderAttr } from 'vue/server-renderer';
import { ArrowPathIcon, PlusIcon, CurrencyDollarIcon, ReceiptPercentIcon, TableCellsIcon, UserGroupIcon, CubeIcon, UserPlusIcon, TagIcon } from '@heroicons/vue/24/outline';
import { u as useAuthStore } from './auth-Rwvlx_hr.mjs';
import { d as defineStore } from './server.mjs';
import { u as useTablesStore } from './tables-CesVfhvL.mjs';
import { u as useWaitersStore } from './waiters-BocqSTVo.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';
import 'deep-pick-omit';

const useDashboardStore = defineStore("dashboard", {
  state: () => ({
    stats: {
      todayRevenue: 4250,
      todayOrders: 87,
      totalTables: 24,
      occupiedTables: 18,
      staffOnDuty: 8
    },
    recentOrders: [
      { id: 1045, table: 12, items: 3, total: 89.5, status: "completed", time: new Date(Date.now() - 3e5) },
      { id: 1044, table: 8, items: 5, total: 124.75, status: "preparing", time: new Date(Date.now() - 6e5) },
      { id: 1043, table: 15, items: 2, total: 45.3, status: "completed", time: new Date(Date.now() - 9e5) },
      { id: 1042, table: 3, items: 4, total: 78.9, status: "served", time: new Date(Date.now() - 12e5) },
      { id: 1041, table: 21, items: 6, total: 156.25, status: "completed", time: new Date(Date.now() - 15e5) }
    ],
    isLoading: false
  }),
  getters: {
    dashboardStats: (state) => state.stats,
    latestOrders: (state) => state.recentOrders.slice(0, 5),
    todayRevenue: (state) => state.stats.todayRevenue,
    occupancyRate: (state) => Math.round(state.stats.occupiedTables / state.stats.totalTables * 100),
    completedOrdersToday: (state) => state.recentOrders.filter((o) => o.status === "completed").length
  },
  actions: {
    async fetchDashboardData() {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        this.recentOrders = this.recentOrders.map((order) => ({
          ...order,
          time: new Date(Date.now() - Math.random() * 36e5)
          // Random time within last hour
        }));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async refreshStats() {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        this.stats.todayRevenue += Math.floor(Math.random() * 100);
        this.stats.todayOrders += Math.floor(Math.random() * 5);
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    addNewOrder(order) {
      const newOrder = {
        id: Math.max(...this.recentOrders.map((o) => o.id)) + 1,
        ...order
      };
      this.recentOrders.unshift(newOrder);
      if (this.recentOrders.length > 10) {
        this.recentOrders = this.recentOrders.slice(0, 10);
      }
      this.stats.todayOrders++;
      if (order.status === "completed") {
        this.stats.todayRevenue += order.total;
      }
    }
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const dashboardStore = useDashboardStore();
    const tablesStore = useTablesStore();
    const waitersStore = useWaitersStore();
    const formatTime = (date) => {
      return date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true
      });
    };
    const getOrderStatusClass = (status) => {
      const classes = {
        "completed": "badge-success",
        "preparing": "badge-warning",
        "served": "badge-info",
        "cancelled": "badge-danger"
      };
      return classes[status] || "badge-info";
    };
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-8" }, _attrs))}><div class="flex flex-col sm:flex-row sm:items-center sm:justify-between"><div><h1 class="text-3xl font-bold text-gray-900">Dashboard</h1><p class="mt-2 text-gray-600">Bem-vindo de volta, ${ssrInterpolate((_a = unref(authStore).user) == null ? void 0 : _a.name)}. Veja o que est\xE1 acontecendo no ${ssrInterpolate((_c = (_b = unref(authStore).user) == null ? void 0 : _b.restaurant) == null ? void 0 : _c.name)} hoje.</p></div><div class="mt-4 sm:mt-0 flex space-x-3"><button${ssrIncludeBooleanAttr(unref(dashboardStore).isLoading) ? " disabled" : ""} class="btn-secondary">`);
      _push(ssrRenderComponent(unref(ArrowPathIcon), {
        class: ["w-4 h-4 mr-2", { "animate-spin": unref(dashboardStore).isLoading }]
      }, null, _parent));
      _push(` Refresh </button><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Quick Order </button></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"><div class="stat-card"><div class="flex items-center space-x-4"><div class="stat-icon bg-emerald-100">`);
      _push(ssrRenderComponent(unref(CurrencyDollarIcon), { class: "w-6 h-6 text-emerald-600" }, null, _parent));
      _push(`</div><div class="flex-1"><p class="text-sm font-medium text-gray-600 mb-1">Faturamento de Hoje</p><div class="flex items-baseline space-x-2"><p class="text-2xl font-bold text-gray-900">R$${ssrInterpolate(unref(dashboardStore).todayRevenue.toLocaleString())}</p><span class="text-sm font-medium text-emerald-600">+12.5%</span></div></div></div></div><div class="stat-card"><div class="flex items-center space-x-4"><div class="stat-icon bg-blue-100">`);
      _push(ssrRenderComponent(unref(ReceiptPercentIcon), { class: "w-6 h-6 text-blue-600" }, null, _parent));
      _push(`</div><div class="flex-1"><p class="text-sm font-medium text-gray-600 mb-1">Total de Pedidos de Hoje</p><div class="flex items-baseline space-x-2"><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(dashboardStore).dashboardStats.todayOrders)}</p><span class="text-sm font-medium text-blue-600">+8.2%</span></div></div></div></div><div class="stat-card"><div class="flex items-center space-x-4"><div class="stat-icon bg-yellow-100">`);
      _push(ssrRenderComponent(unref(TableCellsIcon), { class: "w-6 h-6 text-yellow-600" }, null, _parent));
      _push(`</div><div class="flex-1"><p class="text-sm font-medium text-gray-600 mb-1">Mesas Ocupadas</p><div class="flex items-baseline space-x-2"><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.occupied)}/${ssrInterpolate(unref(tablesStore).tableStatusCounts.available + unref(tablesStore).tableStatusCounts.occupied)}</p><span class="text-sm font-medium text-yellow-600">${ssrInterpolate(Math.round(unref(tablesStore).tableStatusCounts.occupied / (unref(tablesStore).tableStatusCounts.available + unref(tablesStore).tableStatusCounts.occupied) * 100))}%</span></div></div></div></div><div class="stat-card"><div class="flex items-center space-x-4"><div class="stat-icon bg-purple-100">`);
      _push(ssrRenderComponent(unref(UserGroupIcon), { class: "w-6 h-6 text-purple-600" }, null, _parent));
      _push(`</div><div class="flex-1"><p class="text-sm font-medium text-gray-600 mb-1">Total de Gar\xE7ons</p><div class="flex items-baseline space-x-2"><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(waitersStore).waiterStatusCounts.onDuty)}</p><span class="text-sm font-medium text-purple-600">Ativo</span></div></div></div></div></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="card"><div class="card-header"><div class="flex items-center justify-between"><h2 class="text-lg font-semibold text-gray-900">Pedidos Recentes</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/history",
        class: "text-sm font-medium text-emerald-600 hover:text-emerald-700"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Ver Todos os Pedidos `);
          } else {
            return [
              createTextVNode(" Ver Todos os Pedidos ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card-body"><div class="overflow-x-auto"><table class="data-table"><thead><tr><th>Order</th><th>Table</th><th>Items</th><th>Total</th><th>Status</th></tr></thead><tbody class="bg-white divide-y divide-gray-200"><!--[-->`);
      ssrRenderList(unref(dashboardStore).latestOrders, (order) => {
        _push(`<tr><td><div class="font-medium text-gray-900">#${ssrInterpolate(order.id.toString().padStart(4, "0"))}</div><div class="text-sm text-gray-500">${ssrInterpolate(formatTime(order.time))}</div></td><td class="font-medium">Table ${ssrInterpolate(order.table)}</td><td class="text-gray-600">${ssrInterpolate(order.items)} items</td><td class="font-semibold">R$${ssrInterpolate(order.total.toFixed(2))}</td><td><span class="${ssrRenderClass([getOrderStatusClass(order.status), "badge"])}">${ssrInterpolate(order.status)}</span></td></tr>`);
      });
      _push(`<!--]--></tbody></table></div></div></div></div><div class="space-y-6"><div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gray-900">Status da Mesas</h3></div><div class="card-body"><div class="space-y-4"><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-3 h-3 bg-green-500 rounded-full"></div><span class="text-sm text-gray-600">Available</span></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.available)}</span></div><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-3 h-3 bg-yellow-500 rounded-full"></div><span class="text-sm text-gray-600">Occupied</span></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.occupied)}</span></div><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-3 h-3 bg-blue-500 rounded-full"></div><span class="text-sm text-gray-600">Reserved</span></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.reserved)}</span></div><div class="flex items-center justify-between"><div class="flex items-center space-x-3"><div class="w-3 h-3 bg-red-500 rounded-full"></div><span class="text-sm text-gray-600">Out of Service</span></div><span class="text-sm font-semibold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.outOfService)}</span></div></div></div><div class="card-footer">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tables",
        class: "btn-secondary w-full justify-center"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Visualizar Mesas `);
          } else {
            return [
              createTextVNode(" Visualizar Mesas ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div><div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gray-900">A\xE7\xF5es R\xE1pidas</h3></div><div class="card-body"><div class="grid grid-cols-2 gap-4">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/products",
        class: "btn-ghost p-4 flex flex-col items-center text-center space-y-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(CubeIcon), { class: "w-6 h-6 text-emerald-600" }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs font-medium"${_scopeId}>Adicionar Produto</span>`);
          } else {
            return [
              createVNode(unref(CubeIcon), { class: "w-6 h-6 text-emerald-600" }),
              createVNode("span", { class: "text-xs font-medium" }, "Adicionar Produto")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/waiters",
        class: "btn-ghost p-4 flex flex-col items-center text-center space-y-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(UserPlusIcon), { class: "w-6 h-6 text-blue-600" }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs font-medium"${_scopeId}>Adicionar Gar\xE7om</span>`);
          } else {
            return [
              createVNode(unref(UserPlusIcon), { class: "w-6 h-6 text-blue-600" }),
              createVNode("span", { class: "text-xs font-medium" }, "Adicionar Gar\xE7om")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/tables",
        class: "btn-ghost p-4 flex flex-col items-center text-center space-y-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TableCellsIcon), { class: "w-6 h-6 text-yellow-600" }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs font-medium"${_scopeId}>Adicionar Mesa</span>`);
          } else {
            return [
              createVNode(unref(TableCellsIcon), { class: "w-6 h-6 text-yellow-600" }),
              createVNode("span", { class: "text-xs font-medium" }, "Adicionar Mesa")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/categories",
        class: "btn-ghost p-4 flex flex-col items-center text-center space-y-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(TagIcon), { class: "w-6 h-6 text-purple-600" }, null, _parent2, _scopeId));
            _push2(`<span class="text-xs font-medium"${_scopeId}>Categorias</span>`);
          } else {
            return [
              createVNode(unref(TagIcon), { class: "w-6 h-6 text-purple-600" }),
              createVNode("span", { class: "text-xs font-medium" }, "Categorias")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></div><div class="card"><div class="card-header"><h3 class="text-lg font-semibold text-gray-900">Melhores Desempenhos</h3></div><div class="card-body"><div class="space-y-4"><!--[-->`);
      ssrRenderList(unref(waitersStore).topPerformingWaiters, (staff) => {
        _push(`<div class="flex items-center space-x-3"><img${ssrRenderAttr("src", staff.avatar)}${ssrRenderAttr("alt", staff.name)} class="h-10 w-10 rounded-full object-cover"><div class="flex-1 min-w-0"><p class="text-sm font-medium text-gray-900 truncate">${ssrInterpolate(staff.name)}</p><p class="text-xs text-gray-500">${ssrInterpolate(staff.tablesServed)} tables today</p></div><div class="text-right"><p class="text-sm font-semibold text-gray-900">${ssrInterpolate(staff.rating)}/5</p></div></div>`);
      });
      _push(`<!--]--></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Cgi5iY9c.mjs.map
