import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { PlusIcon } from "@heroicons/vue/24/outline";
import { u as useTablesStore } from "./tables-CesVfhvL.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "/home/project/node_modules/hookable/dist/index.mjs";
import "/home/project/node_modules/unctx/dist/index.mjs";
import "/home/project/node_modules/h3/dist/index.mjs";
import "vue-router";
import "/home/project/node_modules/radix3/dist/index.mjs";
import "/home/project/node_modules/defu/dist/defu.mjs";
import "/home/project/node_modules/ufo/dist/index.mjs";
import "/home/project/node_modules/klona/dist/index.mjs";
import "/home/project/node_modules/destr/dist/index.mjs";
import "deep-pick-omit";
import "/home/project/node_modules/nuxt/node_modules/cookie-es/dist/index.mjs";
import "/home/project/node_modules/ohash/dist/index.mjs";
const _sfc_main = {
  __name: "tables",
  __ssrInlineRender: true,
  setup(__props) {
    const tablesStore = useTablesStore();
    const showAddTableModal = ref(false);
    const newTable = ref({
      number: "",
      capacity: "",
      location: ""
    });
    const getTableStatusClass = (status) => {
      const classes = {
        "available": "border-green-200 bg-green-50",
        "occupied": "border-yellow-200 bg-yellow-50",
        "reserved": "border-blue-200 bg-blue-50",
        "out-of-service": "border-red-200 bg-red-50"
      };
      return classes[status] || "border-gray-200 bg-gray-50";
    };
    const getStatusBadgeClass = (status) => {
      const classes = {
        "available": "bg-green-100 text-green-800",
        "occupied": "bg-yellow-100 text-yellow-800",
        "reserved": "bg-blue-100 text-blue-800",
        "out-of-service": "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Mesas</h1><p class="text-gray-600">Gerencie as mesas do seu restaurante e o status atual delas.</p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Adicionar Mesa </button></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-green-100 rounded-lg"><div class="w-6 h-6 bg-green-600 rounded"></div></div><div><p class="text-sm font-medium text-gray-600 mb-1">Disponível</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.available)}</p></div></div></div><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-yellow-100 rounded-lg"><div class="w-6 h-6 bg-yellow-600 rounded"></div></div><div><p class="text-sm font-medium text-gray-600 mb-1">Ocupado</p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(tablesStore).tableStatusCounts.occupied)}</p></div></div></div></div><div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6"><div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"><!--[-->`);
      ssrRenderList(unref(tablesStore).allTables, (table) => {
        _push(`<div class="${ssrRenderClass([getTableStatusClass(table.status), "relative p-6 rounded-lg border-2 cursor-pointer transition-all duration-200 hover:shadow-md"])}"><div class="flex items-center justify-between mb-4"><h3 class="text-lg font-semibold text-gray-900">Table ${ssrInterpolate(table.number)}</h3><span class="${ssrRenderClass([getStatusBadgeClass(table.status), "px-3 py-1 text-xs font-medium rounded-full"])}">${ssrInterpolate(table.status)}</span></div><div class="space-y-3 text-sm text-gray-600 mb-6"><div class="flex justify-between"><span>Capacity:</span><span class="font-medium">${ssrInterpolate(table.capacity)} people</span></div><div class="flex justify-between"><span>Location:</span><span class="font-medium">${ssrInterpolate(table.location)}</span></div>`);
        if (table.waiter) {
          _push(`<div class="flex justify-between"><span>Waiter:</span><span class="font-medium">${ssrInterpolate(table.waiter)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        if (table.currentOrder) {
          _push(`<div class="flex justify-between"><span>Order:</span><span class="font-medium">$${ssrInterpolate(table.currentOrder)}</span></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-3"><button class="flex-1 text-xs py-2 px-3 bg-gray-100 hover:bg-gray-200 rounded font-medium transition-colors"> Edit </button><button class="flex-1 text-xs py-2 px-3 bg-emerald-100 hover:bg-emerald-200 text-emerald-700 rounded font-medium transition-colors"> Change Status </button></div></div>`);
      });
      _push(`<!--]--></div></div>`);
      if (unref(showAddTableModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-md w-full"><div class="p-8"><h2 class="text-xl font-semibold text-gray-900 mb-6">Adicionar Mesa</h2><form class="form-section"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Table Number</label><input${ssrRenderAttr("value", unref(newTable).number)} type="number" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Capacity</label><select class="input-field" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "") : ssrLooseEqual(unref(newTable).capacity, "")) ? " selected" : ""}>Select capacity</option><option value="2"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "2") : ssrLooseEqual(unref(newTable).capacity, "2")) ? " selected" : ""}>2 people</option><option value="4"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "4") : ssrLooseEqual(unref(newTable).capacity, "4")) ? " selected" : ""}>4 people</option><option value="6"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "6") : ssrLooseEqual(unref(newTable).capacity, "6")) ? " selected" : ""}>6 people</option><option value="8"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "8") : ssrLooseEqual(unref(newTable).capacity, "8")) ? " selected" : ""}>8 people</option><option value="10"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).capacity) ? ssrLooseContain(unref(newTable).capacity, "10") : ssrLooseEqual(unref(newTable).capacity, "10")) ? " selected" : ""}>10 people</option></select></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Location</label><select class="input-field" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).location) ? ssrLooseContain(unref(newTable).location, "") : ssrLooseEqual(unref(newTable).location, "")) ? " selected" : ""}>Select location</option><option value="Main Floor"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).location) ? ssrLooseContain(unref(newTable).location, "Main Floor") : ssrLooseEqual(unref(newTable).location, "Main Floor")) ? " selected" : ""}>Main Floor</option><option value="Terrace"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).location) ? ssrLooseContain(unref(newTable).location, "Terrace") : ssrLooseEqual(unref(newTable).location, "Terrace")) ? " selected" : ""}>Terrace</option><option value="Private Room"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).location) ? ssrLooseContain(unref(newTable).location, "Private Room") : ssrLooseEqual(unref(newTable).location, "Private Room")) ? " selected" : ""}>Private Room</option><option value="Bar Area"${ssrIncludeBooleanAttr(Array.isArray(unref(newTable).location) ? ssrLooseContain(unref(newTable).location, "Bar Area") : ssrLooseEqual(unref(newTable).location, "Bar Area")) ? " selected" : ""}>Bar Area</option></select></div><div class="flex gap-4 pt-6"><button type="button" class="flex-1 btn-secondary"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(tablesStore).isLoading) ? " disabled" : ""} class="flex-1 btn-primary">`);
        if (unref(tablesStore).isLoading) {
          _push(`<span>Adding...</span>`);
        } else {
          _push(`<span>Add Table</span>`);
        }
        _push(`</button></div></form></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/tables.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=tables-D-MANlL0.js.map
