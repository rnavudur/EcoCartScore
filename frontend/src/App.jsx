import React, { useState, useEffect } from 'react'
import Dashboard from './components/Dashboard'
import CheckoutFeedback from './components/CheckoutFeedback'
import Rewards from './components/Rewards'
import Insights from './components/Insights'
import Header from './components/Header'
import { cartService } from './services/cartService'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [cartData, setCartData] = useState(null)
  const [ecoScore, setEcoScore] = useState(null)
  const [loading, setLoading] = useState(false)

  // Sample cart data for demo
  const sampleCart = [
    {
      id: 1,
      name: "Organic Bananas",
      quantity: 6,
      price: 2.99,
      category: "produce"
    },
    {
      id: 2,
      name: "Grass-Fed Ground Beef",
      quantity: 1,
      price: 8.99,
      category: "meat"
    },
    {
      id: 3,
      name: "Plastic Water Bottles (24pk)",
      quantity: 1,
      price: 4.99,
      category: "beverages"
    },
    {
      id: 4,
      name: "Reusable Shopping Bags (3pk)",
      quantity: 1,
      price: 12.99,
      category: "household"
    }
  ]

  const analyzeCart = async (cart) => {
    setLoading(true)
    try {
      const result = await cartService.analyzeEcoScore(cart)
      setEcoScore(result)
      setCartData(cart)
      setCurrentPage('feedback')
    } catch (error) {
      console.error('Error analyzing cart:', error)
      // For demo purposes, use mock data
      setEcoScore({
        overallScore: 73,
        breakdown: {
          packaging: 60,
          sourcing: 85,
          carbon: 70,
          recyclability: 75
        },
        recommendations: [
          "Switch to reusable water bottles to eliminate plastic waste",
          "Consider plant-based alternatives for some meat products",
          "Great choice on organic produce - keep it up!"
        ],
        badges: ['Organic Supporter', 'Local Lover'],
        points: 145
      })
      setCartData(cart)
      setCurrentPage('feedback')
    } finally {
      setLoading(false)
    }
  }

  const navigateToPage = (page) => {
    setCurrentPage(page)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateToPage}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && (
          <Dashboard 
            sampleCart={sampleCart}
            onAnalyzeCart={analyzeCart}
            loading={loading}
          />
        )}
        
        {currentPage === 'feedback' && ecoScore && (
          <CheckoutFeedback 
            cartData={cartData}
            ecoScore={ecoScore}
            onBackToDashboard={() => navigateToPage('dashboard')}
          />
        )}
        
        {currentPage === 'rewards' && (
          <Rewards />
        )}
        
        {currentPage === 'insights' && (
          <Insights />
        )}
      </main>
    </div>
  )
}

export default App 