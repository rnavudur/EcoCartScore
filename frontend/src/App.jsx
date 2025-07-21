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
  const [error, setError] = useState(null)

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

  const calculateEcoScore = (cartItems) => {
    if (!cartItems || cartItems.length === 0) {
      return { overallScore: 0, breakdown: { packaging: 0, sourcing: 0, carbon: 0, recyclability: 0 } }
    }

    // Eco scoring based on product categories and quantities
    let totalPackaging = 0, totalSourcing = 0, totalCarbon = 0, totalRecyclability = 0
    let totalWeight = 0

    cartItems.forEach(item => {
      const weight = item.quantity || 1
      totalWeight += weight

      // Category-based scoring
      switch(item.category) {
        case 'produce':
          totalPackaging += 90 * weight  // Minimal packaging
          totalSourcing += 85 * weight   // Often local
          totalCarbon += 95 * weight     // Low carbon
          totalRecyclability += 100 * weight // Fully biodegradable
          break
        case 'meat':
          totalPackaging += 40 * weight  // Heavy packaging
          totalSourcing += 60 * weight   // Mixed sourcing
          totalCarbon += 25 * weight     // High carbon
          totalRecyclability += 30 * weight // Poor recyclability
          break
        case 'beverages':
          totalPackaging += 30 * weight  // Plastic bottles
          totalSourcing += 70 * weight   // Mixed sourcing
          totalCarbon += 50 * weight     // Medium carbon
          totalRecyclability += 80 * weight // Recyclable containers
          break
        case 'household':
          totalPackaging += 70 * weight  // Reusable items
          totalSourcing += 75 * weight   // Good sourcing
          totalCarbon += 60 * weight     // Medium carbon
          totalRecyclability += 90 * weight // High recyclability
          break
        default:
          totalPackaging += 60 * weight
          totalSourcing += 70 * weight
          totalCarbon += 65 * weight
          totalRecyclability += 70 * weight
      }
    })

    const packaging = Math.round(totalPackaging / totalWeight)
    const sourcing = Math.round(totalSourcing / totalWeight)
    const carbon = Math.round(totalCarbon / totalWeight)
    const recyclability = Math.round(totalRecyclability / totalWeight)
    const overallScore = Math.round((packaging + sourcing + carbon + recyclability) / 4)

    return { overallScore, breakdown: { packaging, sourcing, carbon, recyclability } }
  }

  const getRecommendations = (score, cartItems) => {
    const recommendations = []
    const hasMeat = cartItems.some(item => item.category === 'meat')
    const hasBeverages = cartItems.some(item => item.category === 'beverages')
    const hasProduce = cartItems.some(item => item.category === 'produce')

    if (score.breakdown.carbon < 50 && hasMeat) {
      recommendations.push("Consider plant-based alternatives to reduce carbon footprint")
    }
    if (score.breakdown.packaging < 60 && hasBeverages) {
      recommendations.push("Switch to reusable containers to reduce packaging waste")
    }
    if (hasProduce) {
      recommendations.push("Great choice on fresh produce - keep it up!")
    }
    if (score.overallScore > 80) {
      recommendations.push("Excellent eco-friendly choices! You're making a difference!")
    } else if (score.overallScore > 60) {
      recommendations.push("Good progress! Try adding more organic and local products")
    } else {
      recommendations.push("Consider choosing more sustainable alternatives")
    }

    return recommendations
  }

  const getBadges = (score) => {
    const badges = []
    if (score.breakdown.packaging > 80) badges.push('Packaging Pro')
    if (score.breakdown.carbon > 80) badges.push('Carbon Crusher')
    if (score.breakdown.sourcing > 80) badges.push('Local Supporter')
    if (score.breakdown.recyclability > 80) badges.push('Recycle Hero')
    if (score.overallScore > 85) badges.push('Eco Champion')
    return badges
  }

  const analyzeCart = async (cart) => {
    setLoading(true)
    
    // Calculate dynamic eco score based on cart contents
    console.log('Cart items for analysis:', cart)
    const score = calculateEcoScore(cart)
    console.log('Calculated score:', score)
    const recommendations = getRecommendations(score, cart)
    const badges = getBadges(score)
    const points = Math.round(score.overallScore * 2) // Points based on score

    const ecoResult = {
      overallScore: score.overallScore,
      breakdown: score.breakdown,
      recommendations,
      badges,
      points
    }
    
    console.log('Final eco result:', ecoResult)
    setEcoScore(ecoResult)
    setCartData(cart)
    setCurrentPage('feedback')
    setLoading(false)
  }

  const navigateToPage = (page) => {
    setCurrentPage(page)
  }

  const renderDashboard = () => {
    try {
      return (
        <Dashboard 
          sampleCart={sampleCart}
          onAnalyzeCart={analyzeCart}
          loading={loading}
        />
      )
    } catch (err) {
      console.error('Dashboard Error:', err)
      return (
        <div style={{ padding: '20px', textAlign: 'center', backgroundColor: '#fff' }}>
          <h2 style={{ color: 'red' }}>Error Found:</h2>
          <p><strong>{err.message}</strong></p>
          <p style={{ color: '#666', fontSize: '14px' }}>{err.stack}</p>
          <button 
            onClick={() => window.location.reload()} 
            style={{ 
              padding: '10px 20px', 
              backgroundColor: '#22c55e', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px',
              marginTop: '10px'
            }}
          >
            Reload Page
          </button>
        </div>
      )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        onNavigate={navigateToPage}
      />
      
      <main className="container mx-auto px-4 py-8">
        {currentPage === 'dashboard' && renderDashboard()}
        
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