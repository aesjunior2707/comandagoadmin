import { ref, mergeProps, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrRenderClass, ssrInterpolate, ssrRenderDynamicModel, ssrIncludeBooleanAttr, ssrLooseContain } from "vue/server-renderer";
import { BuildingStorefrontIcon, EyeIcon, EyeSlashIcon, ExclamationTriangleIcon, InformationCircleIcon } from "@heroicons/vue/24/outline";
import "/home/project/node_modules/hookable/dist/index.mjs";
import { u as useAuthStore } from "./auth-Rwvlx_hr.js";
import "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
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
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const authStore = useAuthStore();
    const form = ref({
      email: "",
      password: "",
      rememberMe: false
    });
    const errors = ref({});
    const loginError = ref("");
    const showPassword = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8" }, _attrs))}><div class="max-w-md w-full space-y-8"><div class="text-center"><div class="mx-auto h-16 w-16 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg">`);
      _push(ssrRenderComponent(unref(BuildingStorefrontIcon), { class: "h-8 w-8 text-white" }, null, _parent));
      _push(`</div><h2 class="mt-6 text-3xl font-bold text-gray-900">Bem vindo de Volta</h2><p class="mt-2 text-sm text-gray-600">Faça login na sua conta de Administrador ComandaGo</p></div><div class="card"><div class="card-body"><form class="space-y-6"><div><label for="email" class="block text-sm font-medium text-gray-700 mb-2"> Endereço de e-mail / Usuário </label><input id="email"${ssrRenderAttr("value", unref(form).email)} type="email" autocomplete="email" required class="${ssrRenderClass([{ "input-error": unref(errors).email }, "input-field"])}" placeholder="admin@comandago.com">`);
      if (unref(errors).email) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(unref(errors).email)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div><label for="password" class="block text-sm font-medium text-gray-700 mb-2"> Senha </label><div class="relative"><input id="password"${ssrRenderDynamicModel(unref(showPassword) ? "text" : "password", unref(form).password, null)}${ssrRenderAttr("type", unref(showPassword) ? "text" : "password")} autocomplete="current-password" required class="${ssrRenderClass([{ "input-error": unref(errors).password }, "input-field pr-10"])}" placeholder="Digite sua senha"><button type="button" class="absolute inset-y-0 right-0 pr-3 flex items-center">`);
      if (!unref(showPassword)) {
        _push(ssrRenderComponent(unref(EyeIcon), { class: "h-5 w-5 text-gray-400 hover:text-gray-600" }, null, _parent));
      } else {
        _push(ssrRenderComponent(unref(EyeSlashIcon), { class: "h-5 w-5 text-gray-400 hover:text-gray-600" }, null, _parent));
      }
      _push(`</button></div>`);
      if (unref(errors).password) {
        _push(`<p class="mt-1 text-sm text-red-600">${ssrInterpolate(unref(errors).password)}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="flex items-center justify-between"><div class="flex items-center"><input id="remember-me"${ssrIncludeBooleanAttr(Array.isArray(unref(form).rememberMe) ? ssrLooseContain(unref(form).rememberMe, null) : unref(form).rememberMe) ? " checked" : ""} type="checkbox" class="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"><label for="remember-me" class="ml-2 block text-sm text-gray-700"> Remember me </label></div><div class="text-sm"><a href="#" class="font-medium text-emerald-600 hover:text-emerald-500 transition-colors"> Forgot your password? </a></div></div>`);
      if (unref(loginError)) {
        _push(`<div class="bg-red-50 border border-red-200 rounded-lg p-4"><div class="flex">`);
        _push(ssrRenderComponent(unref(ExclamationTriangleIcon), { class: "h-5 w-5 text-red-400" }, null, _parent));
        _push(`<div class="ml-3"><p class="text-sm text-red-800">${ssrInterpolate(unref(loginError))}</p></div></div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<button type="submit"${ssrIncludeBooleanAttr(unref(authStore).isLoading) ? " disabled" : ""} class="w-full btn-primary py-3 text-base font-semibold">`);
      if (unref(authStore).isLoading) {
        _push(`<div class="flex items-center justify-center"><div class="loading-spinner mr-2"></div> Signing in... </div>`);
      } else {
        _push(`<span>Sign in</span>`);
      }
      _push(`</button></form></div></div><div class="bg-blue-50 border border-blue-200 rounded-lg p-4"><div class="flex">`);
      _push(ssrRenderComponent(unref(InformationCircleIcon), { class: "h-5 w-5 text-blue-400 mt-0.5" }, null, _parent));
      _push(`<div class="ml-3"><h3 class="text-sm font-medium text-blue-800">Demo Credentials</h3><div class="mt-2 text-sm text-blue-700"><p><strong>Email:</strong> admin@comandago.com</p><p><strong>Password:</strong> admin123</p></div></div></div></div><div class="text-center"><p class="text-xs text-gray-500"> © 2025 ComandaGo Admin. Professional Restaurant Management System. </p></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=login-C7co-Vuo.js.map
