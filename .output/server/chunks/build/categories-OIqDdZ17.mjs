import { ref, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderAttr, ssrRenderClass, ssrIncludeBooleanAttr, ssrLooseContain } from 'vue/server-renderer';
import { PlusIcon, PencilIcon, TrashIcon } from '@heroicons/vue/24/outline';

const _sfc_main = {
  __name: "categories",
  __ssrInlineRender: true,
  setup(__props) {
    const showAddCategoryModal = ref(false);
    const newCategory = ref({
      name: "",
      description: "",
      icon: "",
      color: "#059669",
      isActive: true
    });
    const availableColors = ref([
      "#059669",
      "#3B82F6",
      "#EF4444",
      "#F59E0B",
      "#8B5CF6",
      "#EC4899",
      "#10B981",
      "#F97316",
      "#6366F1",
      "#84CC16"
    ]);
    const categories = ref([
      {
        id: 1,
        name: "Pizza",
        description: "Traditional and gourmet pizzas with various toppings",
        icon: "\u{1F355}",
        color: "#EF4444",
        productCount: 12,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-15")
      },
      {
        id: 2,
        name: "Pasta",
        description: "Fresh pasta dishes with authentic Italian sauces",
        icon: "\u{1F35D}",
        color: "#F59E0B",
        productCount: 8,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-16")
      },
      {
        id: 3,
        name: "Salads",
        description: "Fresh and healthy salad options",
        icon: "\u{1F957}",
        color: "#10B981",
        productCount: 6,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-17")
      },
      {
        id: 4,
        name: "Appetizers",
        description: "Perfect starters to begin your meal",
        icon: "\u{1F956}",
        color: "#8B5CF6",
        productCount: 10,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-18")
      },
      {
        id: 5,
        name: "Desserts",
        description: "Sweet treats to end your meal perfectly",
        icon: "\u{1F370}",
        color: "#EC4899",
        productCount: 7,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-19")
      },
      {
        id: 6,
        name: "Beverages",
        description: "Refreshing drinks and specialty cocktails",
        icon: "\u{1F964}",
        color: "#3B82F6",
        productCount: 15,
        isActive: true,
        createdAt: /* @__PURE__ */ new Date("2024-01-20")
      },
      {
        id: 7,
        name: "Main Courses",
        description: "Hearty main dishes and signature specialties",
        icon: "\u{1F356}",
        color: "#F97316",
        productCount: 14,
        isActive: false,
        createdAt: /* @__PURE__ */ new Date("2024-01-21")
      }
    ]);
    const formatDate = (date) => {
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="flex justify-between items-center mb-8"><div><h1 class="text-3xl font-bold text-gray-900 mb-2">Gest\xE3o de Categorias</h1><p class="text-gray-600">Organize os itens do seu card\xE1pio em categorias.</p></div><button class="btn-primary">`);
      _push(ssrRenderComponent(unref(PlusIcon), { class: "w-4 h-4 mr-2" }, null, _parent));
      _push(` Adicionar Categoria </button></div><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><!--[-->`);
      ssrRenderList(unref(categories), (category) => {
        _push(`<div class="card hover:shadow-lg transition-shadow duration-200"><div class="flex items-center justify-between mb-6"><div class="flex items-center space-x-4"><div class="w-12 h-12 rounded-lg flex items-center justify-center text-2xl" style="${ssrRenderStyle({ backgroundColor: category.color + "20", color: category.color })}">${ssrInterpolate(category.icon)}</div><div><h3 class="text-lg font-semibold text-gray-900">${ssrInterpolate(category.name)}</h3><p class="text-sm text-gray-600">${ssrInterpolate(category.productCount)} items</p></div></div><div class="flex gap-2"><button class="p-2 text-gray-400 hover:text-gray-600 transition-colors">`);
        _push(ssrRenderComponent(unref(PencilIcon), { class: "w-4 h-4" }, null, _parent));
        _push(`</button><button class="p-2 text-red-400 hover:text-red-600 transition-colors">`);
        _push(ssrRenderComponent(unref(TrashIcon), { class: "w-4 h-4" }, null, _parent));
        _push(`</button></div></div><div class="flex justify-between items-center text-sm mb-6"><span class="text-gray-500">Created: ${ssrInterpolate(formatDate(category.createdAt))}</span></div><div class="pt-4 border-t border-gray-100"><div class="flex gap-3"><button class="flex-1 btn-secondary text-sm"> Produtos </button></div></div></div>`);
      });
      _push(`<!--]--></div>`);
      if (unref(showAddCategoryModal)) {
        _push(`<div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"><div class="bg-white rounded-xl max-w-md w-full"><div class="p-8"><h2 class="text-xl font-semibold text-gray-900 mb-6">Add New Category</h2><form class="form-section"><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Category Name</label><input${ssrRenderAttr("value", unref(newCategory).name)} type="text" class="input-field" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Description</label><textarea rows="3" class="input-field" required>${ssrInterpolate(unref(newCategory).description)}</textarea></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Icon (Emoji)</label><input${ssrRenderAttr("value", unref(newCategory).icon)} type="text" class="input-field" placeholder="\u{1F355}" maxlength="2" required></div><div class="form-group"><label class="block text-sm font-medium text-gray-700 mb-2">Color</label><div class="flex gap-2 flex-wrap"><!--[-->`);
        ssrRenderList(unref(availableColors), (color) => {
          _push(`<button type="button" style="${ssrRenderStyle({ backgroundColor: color })}" class="${ssrRenderClass([unref(newCategory).color === color ? "border-gray-900 scale-110" : "border-gray-300", "w-8 h-8 rounded-full border-2 transition-all duration-200"])}"></button>`);
        });
        _push(`<!--]--></div></div><div class="flex items-center space-x-3"><input${ssrIncludeBooleanAttr(Array.isArray(unref(newCategory).isActive) ? ssrLooseContain(unref(newCategory).isActive, null) : unref(newCategory).isActive) ? " checked" : ""} type="checkbox" class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500"><label class="text-sm text-gray-700">Active category</label></div><div class="flex gap-4 pt-6"><button type="button" class="flex-1 btn-secondary"> Cancel </button><button type="submit" class="flex-1 btn-primary"> Add Category </button></div></form></div></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/categories.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=categories-OIqDdZ17.mjs.map
