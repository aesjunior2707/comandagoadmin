import { _ as __nuxt_component_0 } from './nuxt-link-GnlWUqLn.mjs';
import { ref, computed, watch, mergeProps, unref, withCtx, createVNode, resolveDynamicComponent, createBlock, createTextVNode, createCommentVNode, openBlock, toDisplayString, getCurrentScope, onScopeDispose, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderClass, ssrRenderComponent, ssrRenderAttr, ssrInterpolate, ssrRenderList, ssrRenderVNode, ssrRenderSlotInner } from 'vue/server-renderer';
import { ChartBarIcon, BuildingStorefrontIcon, TableCellsIcon, CubeIcon, TagIcon, UserGroupIcon, ClockIcon, ArrowRightOnRectangleIcon, Bars3Icon, HomeIcon, MagnifyingGlassIcon, BellIcon, ChevronDownIcon, UserIcon, CogIcon } from '@heroicons/vue/24/outline';
import { u as useAuthStore } from './auth-Rwvlx_hr.mjs';
import { u as useTablesStore } from './tables-CesVfhvL.mjs';
import { u as useProductsStore } from './products-BXZrwD-H.mjs';
import { u as useWaitersStore } from './waiters-BocqSTVo.mjs';
import { u as useRoute } from './server.mjs';
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

function tryOnScopeDispose(fn) {
  if (getCurrentScope()) {
    onScopeDispose(fn);
    return true;
  }
  return false;
}
function toValue(r) {
  return typeof r === "function" ? r() : unref(r);
}
typeof WorkerGlobalScope !== "undefined" && globalThis instanceof WorkerGlobalScope;
const toString = Object.prototype.toString;
const isObject = (val) => toString.call(val) === "[object Object]";
const noop = () => {
};
function unrefElement(elRef) {
  var _a;
  const plain = toValue(elRef);
  return (_a = plain == null ? void 0 : plain.$el) != null ? _a : plain;
}
const defaultWindow = void 0;
function useEventListener(...args) {
  let target;
  let events2;
  let listeners;
  let options;
  if (typeof args[0] === "string" || Array.isArray(args[0])) {
    [events2, listeners, options] = args;
    target = defaultWindow;
  } else {
    [target, events2, listeners, options] = args;
  }
  if (!target)
    return noop;
  if (!Array.isArray(events2))
    events2 = [events2];
  if (!Array.isArray(listeners))
    listeners = [listeners];
  const cleanups = [];
  const cleanup = () => {
    cleanups.forEach((fn) => fn());
    cleanups.length = 0;
  };
  const register = (el, event, listener, options2) => {
    el.addEventListener(event, listener, options2);
    return () => el.removeEventListener(event, listener, options2);
  };
  const stopWatch = watch(
    () => [unrefElement(target), toValue(options)],
    ([el, options2]) => {
      cleanup();
      if (!el)
        return;
      const optionsClone = isObject(options2) ? { ...options2 } : options2;
      cleanups.push(
        ...events2.flatMap((event) => {
          return listeners.map((listener) => register(el, event, listener, optionsClone));
        })
      );
    },
    { immediate: true, flush: "post" }
  );
  const stop = () => {
    stopWatch();
    cleanup();
  };
  tryOnScopeDispose(stop);
  return stop;
}
function onClickOutside(target, handler, options = {}) {
  const { window: window2 = defaultWindow, ignore = [], capture = true, detectIframe = false } = options;
  if (!window2)
    return noop;
  let shouldListen = true;
  const shouldIgnore = (event) => {
    return ignore.some((target2) => {
      if (typeof target2 === "string") {
        return Array.from(window2.document.querySelectorAll(target2)).some((el) => el === event.target || event.composedPath().includes(el));
      } else {
        const el = unrefElement(target2);
        return el && (event.target === el || event.composedPath().includes(el));
      }
    });
  };
  const listener = (event) => {
    const el = unrefElement(target);
    if (!el || el === event.target || event.composedPath().includes(el))
      return;
    if (event.detail === 0)
      shouldListen = !shouldIgnore(event);
    if (!shouldListen) {
      shouldListen = true;
      return;
    }
    handler(event);
  };
  const cleanup = [
    useEventListener(window2, "click", listener, { passive: true, capture }),
    useEventListener(window2, "pointerdown", (e) => {
      const el = unrefElement(target);
      shouldListen = !shouldIgnore(e) && !!(el && !e.composedPath().includes(el));
    }, { passive: true }),
    detectIframe && useEventListener(window2, "blur", (event) => {
      setTimeout(() => {
        var _a;
        const el = unrefElement(target);
        if (((_a = window2.document.activeElement) == null ? void 0 : _a.tagName) === "IFRAME" && !(el == null ? void 0 : el.contains(window2.document.activeElement))) {
          handler(event);
        }
      }, 0);
    })
  ].filter(Boolean);
  const stop = () => cleanup.forEach((fn) => fn());
  return stop;
}
const _sfc_main = {
  __name: "default",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const tablesStore = useTablesStore();
    const productsStore = useProductsStore();
    const waitersStore = useWaitersStore();
    const route = useRoute();
    const sidebarOpen = ref(false);
    const showUserMenu = ref(false);
    const userMenuRef = ref(null);
    const isMobile = ref(false);
    const navigation = computed(() => [
      { name: "Dashboard", href: "/", icon: ChartBarIcon },
      { name: "Informa\xE7\xF5es do Restaurante", href: "/restaurant", icon: BuildingStorefrontIcon },
      { name: "Mesas", href: "/tables", icon: TableCellsIcon, badge: tablesStore.totalTables.toString() },
      { name: "Produtos", href: "/products", icon: CubeIcon, badge: productsStore.totalProducts.toString() },
      { name: "Categorias", href: "/categories", icon: TagIcon },
      { name: "Gar\xE7ons", href: "/waiters", icon: UserGroupIcon, badge: waitersStore.totalWaiters.toString() },
      { name: "Hist\xF3rico de Pedido", href: "/history", icon: ClockIcon }
    ]);
    const currentPageName = computed(() => {
      const currentNav = navigation.value.find((item) => item.href === route.path);
      return (currentNav == null ? void 0 : currentNav.name) || "Dashboard";
    });
    const closeSidebar = () => {
      sidebarOpen.value = false;
    };
    const closeSidebarOnMobile = () => {
      if (isMobile.value) {
        closeSidebar();
      }
    };
    onClickOutside(userMenuRef, () => {
      showUserMenu.value = false;
    });
    watch(() => route.path, () => {
      closeSidebarOnMobile();
    });
    return (_ctx, _push, _parent, _attrs) => {
      var _a, _b, _c, _d, _e, _f, _g, _h;
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gray-50" }, _attrs))}><div style="${ssrRenderStyle(unref(sidebarOpen) || !unref(isMobile) ? null : { display: "none" })}" class="${ssrRenderClass([{ "-translate-x-full": !unref(sidebarOpen) && unref(isMobile) }, "fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-strong transform transition-transform duration-300 ease-in-out lg:translate-x-0"])}"><div class="flex flex-col h-full"><div class="flex items-center justify-center h-16 px-4 bg-gradient-to-r from-emerald-600 to-emerald-700 shadow-sm">`);
      _push(ssrRenderComponent(unref(BuildingStorefrontIcon), { class: "h-8 w-8 text-white mr-3" }, null, _parent));
      _push(`<h1 class="text-xl font-bold text-white">ComandaGo</h1></div><div class="p-4 border-b border-gray-200 bg-gray-50"><div class="flex items-center"><img${ssrRenderAttr("src", (_a = unref(authStore).user) == null ? void 0 : _a.avatar)}${ssrRenderAttr("alt", (_b = unref(authStore).user) == null ? void 0 : _b.name)} class="h-10 w-10 rounded-full object-cover"><div class="ml-3"><p class="text-sm font-medium text-gray-900">${ssrInterpolate((_c = unref(authStore).user) == null ? void 0 : _c.name)}</p><p class="text-xs text-gray-500">${ssrInterpolate((_e = (_d = unref(authStore).user) == null ? void 0 : _d.restaurant) == null ? void 0 : _e.name)}</p></div></div></div><nav class="flex-1 px-4 py-6 space-y-1 overflow-y-auto"><!--[-->`);
      ssrRenderList(unref(navigation), (item) => {
        _push(ssrRenderComponent(_component_NuxtLink, {
          key: item.name,
          to: item.href,
          class: ["nav-link group", { active: _ctx.$route.path === item.href }],
          onClick: closeSidebarOnMobile
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              ssrRenderVNode(_push2, createVNode(resolveDynamicComponent(item.icon), { class: "w-5 h-5 mr-3 transition-colors" }, null), _parent2, _scopeId);
              _push2(` ${ssrInterpolate(item.name)} `);
              if (item.badge) {
                _push2(`<span class="ml-auto badge badge-info"${_scopeId}>${ssrInterpolate(item.badge)}</span>`);
              } else {
                _push2(`<!---->`);
              }
            } else {
              return [
                (openBlock(), createBlock(resolveDynamicComponent(item.icon), { class: "w-5 h-5 mr-3 transition-colors" })),
                createTextVNode(" " + toDisplayString(item.name) + " ", 1),
                item.badge ? (openBlock(), createBlock("span", {
                  key: 0,
                  class: "ml-auto badge badge-info"
                }, toDisplayString(item.badge), 1)) : createCommentVNode("", true)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></nav><div class="p-4 border-t border-gray-200"><button class="w-full nav-link text-red-600 hover:text-red-700 hover:bg-red-50">`);
      _push(ssrRenderComponent(unref(ArrowRightOnRectangleIcon), { class: "w-5 h-5 mr-3" }, null, _parent));
      _push(` Sign out </button></div></div></div>`);
      if (unref(sidebarOpen) && unref(isMobile)) {
        _push(`<div class="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="lg:pl-64 flex flex-col min-h-screen"><header class="sticky top-0 z-30 bg-white border-b border-gray-200 shadow-sm"><div class="flex items-center justify-between h-16 px-4 lg:px-6"><div class="flex items-center"><button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg lg:hidden transition-colors">`);
      _push(ssrRenderComponent(unref(Bars3Icon), { class: "w-6 h-6" }, null, _parent));
      _push(`</button><nav class="hidden sm:flex ml-4 lg:ml-0" aria-label="Breadcrumb"><ol class="flex items-center space-x-2"><li><div class="flex items-center">`);
      _push(ssrRenderComponent(unref(HomeIcon), { class: "h-4 w-4 text-gray-400" }, null, _parent));
      _push(`<span class="ml-2 text-sm font-medium text-gray-500">${ssrInterpolate(unref(currentPageName))}</span></div></li></ol></nav></div><div class="flex items-center space-x-4"><div class="hidden md:block relative"><div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">`);
      _push(ssrRenderComponent(unref(MagnifyingGlassIcon), { class: "h-4 w-4 text-gray-400" }, null, _parent));
      _push(`</div><input type="text" placeholder="Search..." class="block w-64 pl-10 pr-3 py-2 border border-gray-300 rounded-lg text-sm placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"></div><div class="relative"><button class="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors relative">`);
      _push(ssrRenderComponent(unref(BellIcon), { class: "w-6 h-6" }, null, _parent));
      _push(`<span class="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span></button></div><div class="relative"><button class="flex items-center space-x-3 p-2 text-sm rounded-lg hover:bg-gray-100 transition-colors"><img${ssrRenderAttr("src", (_f = unref(authStore).user) == null ? void 0 : _f.avatar)}${ssrRenderAttr("alt", (_g = unref(authStore).user) == null ? void 0 : _g.name)} class="h-8 w-8 rounded-full object-cover"><span class="hidden md:block font-medium text-gray-700">${ssrInterpolate((_h = unref(authStore).user) == null ? void 0 : _h.name)}</span>`);
      _push(ssrRenderComponent(unref(ChevronDownIcon), { class: "hidden md:block h-4 w-4 text-gray-400" }, null, _parent));
      _push(`</button>`);
      if (unref(showUserMenu)) {
        _push(`<div class="dropdown-menu"><a href="#" class="dropdown-item">`);
        _push(ssrRenderComponent(unref(UserIcon), { class: "h-4 w-4 mr-3" }, null, _parent));
        _push(` Profile Settings </a><a href="#" class="dropdown-item">`);
        _push(ssrRenderComponent(unref(CogIcon), { class: "h-4 w-4 mr-3" }, null, _parent));
        _push(` Account Settings </a><div class="border-t border-gray-100 my-1"></div><button class="dropdown-item text-red-600 w-full text-left">`);
        _push(ssrRenderComponent(unref(ArrowRightOnRectangleIcon), { class: "h-4 w-4 mr-3" }, null, _parent));
        _push(` Sign out </button></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></header><main class="flex-1 p-6 lg:p-8">`);
      ssrRenderSlotInner(_ctx.$slots, "default", {}, null, _push, _parent, null, true);
      _push(`</main></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/default.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=default-D0Vqu4QZ.mjs.map
