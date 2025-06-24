import { defineStore } from 'pinia'
import { useAuthStore } from './auth'
import HttpRequest from '~/services/request'
import { categories } from '@vueuse/core/metadata.cjs'

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
  categories: Categories[]
  printers: Printers[]
  isLoading: boolean
}

interface Categories {
  id: string
  description: string
  company_id: string
  created_at: string
  updated_at: string
  printer_id: string
}

interface Printers {
  address: string
  company_id: string
  description: string
  id: string
  reference: string
  terminal: string
}

export const useProductsStore = defineStore('products', {
  state: (): ProductState => ({
    products: [
    ],
    categories: [],
    printers: [],
    isLoading: false
  }),

  getters: {
    allCategories: (state) => state.categories,
    allProducts: (state) => state.products,
    allPrinters: (state) => state.printers,
    availableProducts: (state) => state.products,
    productsByCategory: (state) => (category: string) =>
      state.products.filter(p => p.id === category),
    getProductById: (state) => (id: number) => state.products,
    productCategories: (state) => state.categories,
    totalProducts: (state) => state.products.length,
    availableProductsCount: (state) => state.products.length
  },

  actions: {
    async list_printers() {
      try {
        const res = await api.request('GET', `company-printers/${useAuthStore().user?.company_id}`)
        res.data.data.forEach((printer: Printers) => {
          const existingPrinter = this.printers.find(p => p.id === printer.id)
          if (!existingPrinter) {
            this.printers.push({
              address: printer.address,
              company_id: printer.company_id,
              description: printer.description,
              id: printer.id,
              reference: printer.reference,
              terminal: printer.terminal
            })
          }
        })
        console.log('Printers fetched successfully:', res.data)
      }
      catch (error: any) {
        console.error('Error fetching printers:', error)
        throw new Error(error.message || 'Failed to fetch printers')
      }
      
    },
    async add_category(categoryData: Categories) {
      try {
        const res = await api.request('POST', `company-category/`, categoryData)
        return { success: true }
      }
      catch (error: any) {
        console.error('Error adding category:', error)
        return { success: false, error: error.message }
      }
    },
    async list_categories() {
      const res = await api.request('GET', `company-category/${useAuthStore().user?.company_id}`)
      res.data.data.forEach((category: Categories) => {
        const existingCategory = this.categories.find(c => c.id === category.id)
        if (!existingCategory) {
          this.categories.push({
            id: category.id,
            description: category.description,
            company_id: category.company_id,
            created_at: category.created_at,
            updated_at: category.updated_at,
            printer_id: category.printer_id
          })
        }
      })
      console.log('Categories fetched successfully:', res.data)
    },
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