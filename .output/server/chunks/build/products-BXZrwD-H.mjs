import { d as defineStore } from './server.mjs';

const useProductsStore = defineStore("products", {
  state: () => ({
    products: [
      {
        id: 1,
        name: "Margherita Pizza",
        description: "Classic pizza with tomato sauce, mozzarella, and fresh basil",
        price: 18.99,
        category: "Pizza",
        image: "https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: true
      },
      {
        id: 2,
        name: "Chicken Caesar Salad",
        description: "Fresh romaine lettuce with grilled chicken, parmesan, and caesar dressing",
        price: 14.99,
        category: "Salads",
        image: "https://images.pexels.com/photos/1213710/pexels-photo-1213710.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: true
      },
      {
        id: 3,
        name: "Spaghetti Carbonara",
        description: "Traditional Italian pasta with eggs, cheese, pancetta, and black pepper",
        price: 16.99,
        category: "Pasta",
        image: "https://images.pexels.com/photos/4518843/pexels-photo-4518843.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: true
      },
      {
        id: 4,
        name: "Chocolate Tiramisu",
        description: "Rich Italian dessert with coffee-soaked ladyfingers and mascarpone",
        price: 8.99,
        category: "Desserts",
        image: "https://images.pexels.com/photos/6880219/pexels-photo-6880219.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: true
      },
      {
        id: 5,
        name: "Bruschetta",
        description: "Toasted bread topped with fresh tomatoes, garlic, and basil",
        price: 9.99,
        category: "Appetizers",
        image: "https://images.pexels.com/photos/8844885/pexels-photo-8844885.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: false
      },
      {
        id: 6,
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with herbs and lemon butter sauce",
        price: 24.99,
        category: "Main Courses",
        image: "https://images.pexels.com/photos/3926124/pexels-photo-3926124.jpeg?auto=compress&cs=tinysrgb&w=400",
        isAvailable: true
      }
    ],
    categories: ["Appetizers", "Main Courses", "Desserts", "Beverages", "Salads", "Pasta", "Pizza"],
    isLoading: false
  }),
  getters: {
    allProducts: (state) => state.products,
    availableProducts: (state) => state.products.filter((p) => p.isAvailable),
    productsByCategory: (state) => (category) => state.products.filter((p) => p.category === category),
    getProductById: (state) => (id) => state.products.find((p) => p.id === id),
    productCategories: (state) => state.categories,
    totalProducts: (state) => state.products.length,
    availableProductsCount: (state) => state.products.filter((p) => p.isAvailable).length
  },
  actions: {
    async addProduct(productData) {
      this.isLoading = true;
      try {
        const newProduct = {
          id: Math.max(...this.products.map((p) => p.id)) + 1,
          ...productData
        };
        this.products.push(newProduct);
        return { success: true, product: newProduct };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async updateProduct(productId, updates) {
      this.isLoading = true;
      try {
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex !== -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...updates };
          return { success: true, product: this.products[productIndex] };
        }
        return { success: false, error: "Product not found" };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async deleteProduct(productId) {
      this.isLoading = true;
      try {
        const productIndex = this.products.findIndex((p) => p.id === productId);
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1);
          return { success: true };
        }
        return { success: false, error: "Product not found" };
      } catch (error) {
        return { success: false, error: error.message };
      } finally {
        this.isLoading = false;
      }
    },
    async toggleProductAvailability(productId) {
      const product = this.products.find((p) => p.id === productId);
      if (product) {
        product.isAvailable = !product.isAvailable;
        return { success: true, product };
      }
      return { success: false, error: "Product not found" };
    }
  }
});

export { useProductsStore as u };
//# sourceMappingURL=products-BXZrwD-H.mjs.map
