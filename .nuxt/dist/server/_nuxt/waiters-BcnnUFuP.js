import { ref, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual } from "vue/server-renderer";
import { PlusIcon, UsersIcon, CheckCircleIcon, PencilIcon } from "@heroicons/vue/24/outline";
import { u as useWaitersStore } from "./waiters-BocqSTVo.js";
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
  __name: "waiters",
  __ssrInlineRender: true,
  setup(__props) {
    const waitersStore = useWaitersStore();
    const showAddWaiterModal = ref(false);
    const newWaiter = ref({
      firstName: "",
      lastName: "",
      position: "",
      phone: "",
      email: "",
      experience: "",
      avatar: ""
    });
    const getStatusBadgeClass = (status) => {
      const classes = {
        "on-duty": "bg-green-100 text-green-800",
        "on-break": "bg-yellow-100 text-yellow-800",
        "off-duty": "bg-red-100 text-red-800"
      };
      return classes[status] || "bg-gray-100 text-gray-800";
    };
    const getStatusButtonClass = (status) => {
      const classes = {
        "on-duty": "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
        "on-break": "bg-green-100 hover:bg-green-200 text-green-700",
        "off-duty": "bg-green-100 hover:bg-green-200 text-green-700"
      };
      return classes[status] || "bg-gray-100 hover:bg-gray-200 text-gray-700";
    };
    const getStatusButtonText = (status) => {
      const texts = {
        "on-duty": "Break",
        "on-break": "Resume",
        "off-duty": "Clock In"
      };
      return texts[status] || "Change";
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Garçons</h1><p class="text-gray-600"> Gerencie a equipe do seu restaurante e o desempenho deles. </p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Adicionar Garçom </button></div><div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-blue-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(UsersIcon), { class: "w-6 h-6 text-blue-600" }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-gray-600 mb-1"> Total de Garçons </p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(waitersStore).totalWaiters)}</p></div></div></div><div class="card"><div class="flex items-center space-x-4"><div class="p-3 bg-green-100 rounded-lg">`);
      _push(ssrRenderComponent(unref(CheckCircleIcon), { class: "w-6 h-6 text-green-600" }, null, _parent));
      _push(`</div><div><p class="text-sm font-medium text-gray-600 mb-1"> Em Serviço </p><p class="text-2xl font-bold text-gray-900">${ssrInterpolate(unref(waitersStore).waiterStatusCounts.onDuty)}</p></div></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(waitersStore).allWaiters, (waiter) => {
        _push(`<div class="card hover:shadow-lg transition-shadow duration-200"><div class="flex items-center mb-6 space-x-4"><img${ssrRenderAttr("src", waiter.avatar)}${ssrRenderAttr("alt", waiter.name)} class="w-16 h-16 rounded-full object-cover"><div class="flex-1"><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(waiter.name)}</h3><p class="text-sm text-gray-600">${ssrInterpolate(waiter.position)}</p><span class="${ssrRenderClass([getStatusBadgeClass(waiter.status), "badge mt-2"])}">${ssrInterpolate(waiter.status)}</span></div></div><div class="space-y-3 mb-6"><div class="flex justify-between text-sm"><span class="text-gray-600">Phone:</span><span class="font-medium">${ssrInterpolate(waiter.phone)}</span></div><div class="flex justify-between text-sm"><span class="text-gray-600">Email:</span><span class="font-medium">${ssrInterpolate(waiter.email)}</span></div><div class="flex justify-between text-sm"><span class="text-gray-600">Experience:</span><span class="font-medium">${ssrInterpolate(waiter.experience)} years</span></div><div class="flex justify-between text-sm"><span class="text-gray-600">Tables Today:</span><span class="font-medium">${ssrInterpolate(waiter.tablesServed)}</span></div><div class="flex justify-between text-sm"><span class="text-gray-600">Rating:</span><span class="font-medium">${ssrInterpolate(waiter.rating)}/5</span></div></div><div class="flex gap-3 pt-4 border-t border-gray-100"><button class="flex-1 btn-secondary text-sm">`);
        _push(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
        _push(` Editar </button><button class="${ssrRenderClass([getStatusButtonClass(waiter.status), "flex-1 text-sm py-2 px-3 rounded font-medium transition-colors"])}">${ssrInterpolate(getStatusButtonText(waiter.status))}</button></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(showAddWaiterModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto"><div class="p-8"><h2 class="text-xl font-semibold text-gray-900 mb-6"> Add New Waiter </h2><form class="form-section"><div class="form-row"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">First Name</label><input${ssrRenderAttr("value", unref(newWaiter).firstName)} type="text" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label><input${ssrRenderAttr("value", unref(newWaiter).lastName)} type="text" class="input-field" required></div></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Position</label><select class="input-field" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newWaiter).position) ? ssrLooseContain(unref(newWaiter).position, "") : ssrLooseEqual(unref(newWaiter).position, "")) ? " selected" : ""}>Select position</option><option value="Waiter"${ssrIncludeBooleanAttr(Array.isArray(unref(newWaiter).position) ? ssrLooseContain(unref(newWaiter).position, "Waiter") : ssrLooseEqual(unref(newWaiter).position, "Waiter")) ? " selected" : ""}>Waiter</option><option value="Senior Waiter"${ssrIncludeBooleanAttr(Array.isArray(unref(newWaiter).position) ? ssrLooseContain(unref(newWaiter).position, "Senior Waiter") : ssrLooseEqual(unref(newWaiter).position, "Senior Waiter")) ? " selected" : ""}>Senior Waiter</option><option value="Head Waiter"${ssrIncludeBooleanAttr(Array.isArray(unref(newWaiter).position) ? ssrLooseContain(unref(newWaiter).position, "Head Waiter") : ssrLooseEqual(unref(newWaiter).position, "Head Waiter")) ? " selected" : ""}>Head Waiter</option><option value="Sommelier"${ssrIncludeBooleanAttr(Array.isArray(unref(newWaiter).position) ? ssrLooseContain(unref(newWaiter).position, "Sommelier") : ssrLooseEqual(unref(newWaiter).position, "Sommelier")) ? " selected" : ""}>Sommelier</option></select></div><div class="form-row"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Phone</label><input${ssrRenderAttr("value", unref(newWaiter).phone)} type="tel" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Experience (years)</label><input${ssrRenderAttr("value", unref(newWaiter).experience)} type="number" min="0" class="input-field" required></div></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Email</label><input${ssrRenderAttr("value", unref(newWaiter).email)} type="email" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Avatar URL</label><input${ssrRenderAttr("value", unref(newWaiter).avatar)} type="url" class="input-field"></div><div class="flex gap-4 pt-6"><button type="button" class="flex-1 btn-secondary"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(waitersStore).isLoading) ? " disabled" : ""} class="flex-1 btn-primary">`);
        if (unref(waitersStore).isLoading) {
          _push(`<span>Adding...</span>`);
        } else {
          _push(`<span>Add Waiter</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/waiters.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=waiters-BcnnUFuP.js.map
