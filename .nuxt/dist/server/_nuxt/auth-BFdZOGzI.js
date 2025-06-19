import { a as defineNuxtRouteMiddleware, n as navigateTo } from "../server.mjs";
import { u as useAuthStore } from "./auth-Rwvlx_hr.js";
import "vue";
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
import "vue/server-renderer";
const auth = defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore();
  if (!authStore.isAuthenticated) {
    return navigateTo("/login");
  }
});
export {
  auth as default
};
//# sourceMappingURL=auth-BFdZOGzI.js.map
