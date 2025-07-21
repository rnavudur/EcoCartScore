import axios from 'axios'

const API_BASE_URL = '/api'

class CartService {
  async analyzeEcoScore(cartItems) {
    try {
      const response = await axios.post(`${API_BASE_URL}/cart/analyze`, {
        items: cartItems
      })
      return response.data
    } catch (error) {
      console.error('Cart analysis failed:', error)
      throw error
    }
  }

  async getProductMetadata(productId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/products/${productId}/metadata`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch product metadata:', error)
      throw error
    }
  }

  async getRewards(userId) {
    try {
      const response = await axios.get(`${API_BASE_URL}/rewards/user/${userId}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch rewards:', error)
      throw error
    }
  }

  async submitFeedback(feedback) {
    try {
      const response = await axios.post(`${API_BASE_URL}/feedback`, feedback)
      return response.data
    } catch (error) {
      console.error('Failed to submit feedback:', error)
      throw error
    }
  }

  async getEcoInsights(timeframe = '30d') {
    try {
      const response = await axios.get(`${API_BASE_URL}/insights?timeframe=${timeframe}`)
      return response.data
    } catch (error) {
      console.error('Failed to fetch eco insights:', error)
      throw error
    }
  }
}

export const cartService = new CartService() 