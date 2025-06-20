import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import HttpRequest from '~/services/request'

const api = new HttpRequest()

interface Product {
  id: number
  name: string
  description: string
  price: number
  category: string
  image: string
  isAvailable: boolean
}

interface ProductComandoGo {
  id: string
  company_id: string
  category_id: string
  description: string
  price: Number
  created_at: string
  updated_at: string
  subcategory_id: string
}

interface ProductState {
  products: ProductComandoGo[]
  categories: string[]
  isLoading: boolean
}

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    products: [
    ],
    categories: ['Appetizers', 'Main Courses', 'Desserts', 'Beverages', 'Salads', 'Pasta', 'Pizza'],
    isLoading: false
  }),

  getters: {
    allProducts: (state) => state.products,
    availableProducts: (state) => state.products.filter(p => p.isAvailable),
    productsByCategory: (state) => (category: string) =>
      state.products.filter(p => p.category === category),
    getProductById: (state) => (id: number) => state.products.find(p => p.id === id),
    productCategories: (state) => state.categories,
    totalProducts: (state) => state.products.length,
    availableProductsCount: (state) => state.products.filter(p => p.isAvailable).length
  },

  actions: {
    async list_products() {
      const res = await api.request('GET', `company-products/${useAuthStore().user?.company_id}`)

      res.data.data.forEach((product: ProductComandoGo) => {
        const existingProduct = this.products.find(p => p.id === product.id)
        if (!existingProduct) {
          this.products.push({
            id: product.id,
            company_id: product.company_id,
            category_id: product.category_id,
            description: product.description,
            price: product.price,
            created_at: product.created_at,
            updated_at: product.updated_at,
            subcategory_id: product.subcategory_id
          })
        }
      })

      console.log('Products fetched successfully:', res.data)
    },
    async addProduct(productData: Omit<Product, 'id'>) {
      this.isLoading = true
      try {
        const newProduct: Product = {
          id: Math.max(...this.products.map(p => p.id)) + 1,
          ...productData
        }
        this.products.push(newProduct)
        return { success: true, product: newProduct }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async updateProduct(productId: number, updates: Partial<Product>) {
      this.isLoading = true
      try {
        const productIndex = this.products.findIndex(p => p.id === productId)
        if (productIndex !== -1) {
          this.products[productIndex] = { ...this.products[productIndex], ...updates }
          return { success: true, product: this.products[productIndex] }
        }
        return { success: false, error: 'Product not found' }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async deleteProduct(productId: number) {
      this.isLoading = true
      try {
        const productIndex = this.products.findIndex(p => p.id === productId)
        if (productIndex !== -1) {
          this.products.splice(productIndex, 1)
          return { success: true }
        }
        return { success: false, error: 'Product not found' }
      } catch (error: any) {
        return { success: false, error: error.message }
      } finally {
        this.isLoading = false
      }
    },

    async toggleProductAvailability(productId: number) {
      const product = this.products.find(p => p.id === productId)
      if (product) {
        product.isAvailable = !product.isAvailable
        return { success: true, product }
      }
      return { success: false, error: 'Product not found' }
    }
  }
})