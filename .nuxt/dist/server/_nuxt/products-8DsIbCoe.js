import { ref, computed, unref, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseContain, ssrLooseEqual, ssrRenderList, ssrInterpolate, ssrRenderClass } from "vue/server-renderer";
import { PlusIcon, PencilIcon } from "@heroicons/vue/24/outline";
import { u as useProductsStore } from "./products-BXZrwD-H.js";
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
  __name: "products",
  __ssrInlineRender: true,
  setup(__props) {
    const productsStore = useProductsStore();
    const showAddProductModal = ref(false);
    const searchQuery = ref("");
    const selectedCategory = ref("");
    const sortBy = ref("name");
    const newProduct = ref({
      name: "",
      description: "",
      price: "",
      category: "",
      image: "",
      isAvailable: true
    });
    const filteredProducts = computed(() => {
      let filtered = productsStore.allProducts;
      if (searchQuery.value) {
        filtered = filtered.filter(
          (product) => product.name.toLowerCase().includes(searchQuery.value.toLowerCase()) || product.description.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
      }
      if (selectedCategory.value) {
        filtered = filtered.filter((product) => product.category === selectedCategory.value);
      }
      filtered.sort((a, b) => {
        switch (sortBy.value) {
          case "price":
            return a.price - b.price;
          case "category":
            return a.category.localeCompare(b.category);
          default:
            return a.name.localeCompare(b.name);
        }
      });
      return filtered;
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Gestão de Produtos</h1><p class="text-gray-600">Gerencie os itens do seu cardápio e catálogo de produtos.</p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Adicionar Produto </button></div><div class="card mb-8"><div class="flex flex-wrap gap-4"><div class="flex-1 min-w-64"><input${ssrRenderAttr("value", unref(searchQuery))} type="text" placeholder="Search products..." class="input-field"></div><div><select class="input-field"><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), "") : ssrLooseEqual(unref(selectedCategory), "")) ? " selected" : ""}>All Categories</option><!--[-->`);
      ssrRenderList(unref(productsStore).productCategories, (category) => {
        _push(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(unref(selectedCategory)) ? ssrLooseContain(unref(selectedCategory), category) : ssrLooseEqual(unref(selectedCategory), category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
      });
      _push(`<!--]--></select></div><div><select class="input-field"><option value="name"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "name") : ssrLooseEqual(unref(sortBy), "name")) ? " selected" : ""}>Sort by Name</option><option value="price"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "price") : ssrLooseEqual(unref(sortBy), "price")) ? " selected" : ""}>Sort by Price</option><option value="category"${ssrIncludeBooleanAttr(Array.isArray(unref(sortBy)) ? ssrLooseContain(unref(sortBy), "category") : ssrLooseEqual(unref(sortBy), "category")) ? " selected" : ""}>Sort by Category</option></select></div></div></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(filteredProducts), (product) => {
        _push(`<div class="card hover:shadow-lg transition-shadow duration-200"><div class="aspect-w-16 aspect-h-9 mb-6"><img${ssrRenderAttr("src", product.image)}${ssrRenderAttr("alt", product.name)} class="w-full h-48 object-cover rounded-lg"></div><div class="space-y-4"><div class="flex justify-between items-start"><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(product.name)}</h3><span class="text-lg font-bold text-emerald-600">$${ssrInterpolate(product.price)}</span></div><p class="text-gray-600 text-sm leading-relaxed">${ssrInterpolate(product.description)}</p><div class="flex items-center gap-2"><span class="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">${ssrInterpolate(product.category)}</span>`);
        if (!product.isAvailable) {
          _push(`<span class="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full font-medium">Unavailable</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="flex gap-3 pt-4 border-t border-gray-100"><button class="flex-1 btn-secondary text-sm">`);
        _push(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
        _push(` Edit </button><button class="${ssrRenderClass([product.isAvailable ? "text-red-600" : "text-green-600", "flex-1 btn-ghost text-sm"])}">${ssrInterpolate(product.isAvailable ? "Disable" : "Enable")}</button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(showAddProductModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-lg w-full max-h-screen overflow-y-auto"><div class="p-8"><h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Product</h2><form class="form-section"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label><input${ssrRenderAttr("value", unref(newProduct).name)} type="text" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="3" class="input-field" required>${ssrInterpolate(unref(newProduct).description)}</textarea></div><div class="form-row"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Price</label><input${ssrRenderAttr("value", unref(newProduct).price)} type="number" step="0.01" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Category</label><select class="input-field" required><option value=""${ssrIncludeBooleanAttr(Array.isArray(unref(newProduct).category) ? ssrLooseContain(unref(newProduct).category, "") : ssrLooseEqual(unref(newProduct).category, "")) ? " selected" : ""}>Select category</option><!--[-->`);
        ssrRenderList(unref(productsStore).productCategories, (category) => {
          _push(`<option${ssrRenderAttr("value", category)}${ssrIncludeBooleanAttr(Array.isArray(unref(newProduct).category) ? ssrLooseContain(unref(newProduct).category, category) : ssrLooseEqual(unref(newProduct).category, category)) ? " selected" : ""}>${ssrInterpolate(category)}</option>`);
        });
        _push(`<!--]--></select></div></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Image URL</label><input${ssrRenderAttr("value", unref(newProduct).image)} type="url" class="input-field" required></div><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newProduct).isAvailable) ? ssrLooseContain(unref(newProduct).isAvailable, null) : unref(newProduct).isAvailable) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"><label class="text-sm text-gray-700">Available for order</label></div><div class="flex gap-4 pt-6"><button type="button" class="flex-1 btn-secondary"> Cancel </button><button type="submit"${ssrIncludeBooleanAttr(unref(productsStore).isLoading) ? " disabled" : ""} class="flex-1 btn-primary">`);
        if (unref(productsStore).isLoading) {
          _push(`<span>Adding...</span>`);
        } else {
          _push(`<span>Add Product</span>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/products.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
export {
  _sfc_main as default
};
//# sourceMappingURL=products-8DsIbCoe.js.map
