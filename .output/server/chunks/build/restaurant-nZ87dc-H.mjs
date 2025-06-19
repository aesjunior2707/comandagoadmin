import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderComponent } from 'vue/server-renderer';
import { CheckIcon } from '@heroicons/vue/24/outline';
import { d as defineStore } from './server.mjs';
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

const useRestaurantStore = defineStore("restaurant", {
  state: () => ({
    info: {
      name: "La Bella Vista",
      cuisineType: "italian",
      address: "123 Main Street, Downtown\nCity, State 12345",
      phone: "+1 (555) 123-4567",
      email: "info@labellavista.com",
      openingTime: "09:00",
      closingTime: "22:00",
      description: "Authentic Italian cuisine in the heart of downtown. Fresh ingredients, traditional recipes, and warm hospitality."
    },
    stats: {
      totalTables: 24,
      totalProducts: 156,
      totalWaiters: 8,
      monthlyOrders: 1245
    },
    isLoading: false
  }),
  getters: {
    restaurantInfo: (state) => state.info,
    restaurantStats: (state) => state.stats,
    isRestaurantOpen: (state) => {
      const now = /* @__PURE__ */ new Date();
      const currentTime = now.getHours() * 100 + now.getMinutes();
      const openTime = parseInt(state.info.openingTime.replace(":", ""));
      const closeTime = parseInt(state.info.closingTime.replace(":", ""));
      return currentTime >= openTime && currentTime <= closeTime;
    }
  },
  actions: {
    async updateRestaurantInfo(updates) {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 1e3));
        this.info = { ...this.info, ...updates };
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async fetchRestaurantStats() {
      this.isLoading = true;
      try {
        await new Promise((resolve) => setTimeout(resolve, 500));
        return { success: true };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    }
  }
});
const _sfc_main = {
  __name: "restaurant",
  __ssrInlineRender: true,
  setup(__props) {
    const restaurantStore = useRestaurantStore();
    const restaurantForm = ref({
      name: "",
      address: "",
      phone: "",
      email: ""
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="mb-8"><h1 class="text-3xl font-bold text-gray-900 mb-2">Informa\xE7\xF5es do Restaurante</h1><p class="text-gray-600">Gerencie as informa\xE7\xF5es b\xE1sicas e configura\xE7\xF5es do seu restaurante</p></div><div class="grid grid-cols-1 lg:grid-cols-3 gap-8"><div class="lg:col-span-2"><div class="card"><h2 class="text-xl font-semibold text-gray-900 mb-6">Informa\xE7\xF5es B\xE1sicas</h2><form class="form-section"><div class="form-row"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Nome do Restaurante</label><input${ssrRenderAttr("value", unref(restaurantForm).name)} type="text" class="input-field" placeholder="Enter restaurant name"></div></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Endere\xE7o</label><textarea rows="3" class="input-field" placeholder="Enter full address">${ssrInterpolate(unref(restaurantForm).address)}</textarea></div><div class="form-row"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">N\xFAmero de Telefone</label><input${ssrRenderAttr("value", unref(restaurantForm).phone)} type="tel" class="input-field" placeholder="+1 (555) 123-4567"></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Email</label><input${ssrRenderAttr("value", unref(restaurantForm).email)} type="email" class="input-field" placeholder="info@restaurant.com"></div></div><div class="flex justify-end pt-4"><button type="submit"${ssrIncludeBooleanAttr(unref(restaurantStore).isLoading) ? " disabled" : ""} class="btn-primary">`);
      _push(ssrRenderComponent(unref(CheckIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      if (unref(restaurantStore).isLoading) {
        _push(`<span>Saving...</span>`);
      } else {
        _push(`<span>Save Changes</span>`);
      }
      _push(`</button></div></form></div></div><div class="space-y-6"><div class="card"><h3 class="text-lg font-semibold text-gray-900 mb-6">Estat\xEDsticas do Restaurante</h3><div class="space-y-4"><div class="flex justify-between items-center"><span class="text-gray-600">Total de Mesas</span><span class="font-semibold text-gray-900">${ssrInterpolate(unref(restaurantStore).restaurantStats.totalTables)}</span></div><div class="flex justify-between items-center"><span class="text-gray-600">Total de Produtos</span><span class="font-semibold text-gray-900">${ssrInterpolate(unref(restaurantStore).restaurantStats.totalProducts)}</span></div><div class="flex justify-between items-center"><span class="text-gray-600">Total de Gar\xE7ons</span><span class="font-semibold text-gray-900">${ssrInterpolate(unref(restaurantStore).restaurantStats.totalWaiters)}</span></div><div class="flex justify-between items-center"><span class="text-gray-600">Total de Pedidos no M\xEAs</span><span class="font-semibold text-gray-900">${ssrInterpolate(unref(restaurantStore).restaurantStats.monthlyOrders.toLocaleString())}</span></div></div></div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/restaurant.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=restaurant-nZ87dc-H.mjs.map
