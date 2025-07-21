import React, { useState } from 'react'
import { 
  ArrowLeft, 
  Award, 
  Leaf, 
  Package, 
  Truck, 
  Recycle,
  TrendingUp,
  Star,
  Gift,
  CheckCircle,
  AlertTriangle,
  Lightbulb
} from 'lucide-react'

const CheckoutFeedback = ({ cartData, ecoScore, onBackToDashboard }) => {
  const [activeTab, setActiveTab] = useState('overview')

  const getScoreColor = (score) => {
    if (score >= 80) return 'eco-score-high'
    if (score >= 60) return 'eco-score-medium'
    return 'eco-score-low'
  }

  const getScoreGrade = (score) => {
    if (score >= 90) return 'A+'
    if (score >= 80) return 'A'
    if (score >= 70) return 'B'
    if (score >= 60) return 'C'
    return 'D'
  }

  const scoreBreakdown = [
    { 
      name: 'Packaging', 
      score: ecoScore.breakdown.packaging, 
      icon: Package,
      description: 'Sustainable packaging materials'
    },
    { 
      name: 'Sourcing', 
      score: ecoScore.breakdown.sourcing, 
      icon: Truck,
      description: 'Local vs imported products'
    },
    { 
      name: 'Carbon Impact', 
      score: ecoScore.breakdown.carbon, 
      icon: Leaf,
      description: 'Carbon footprint of products'
    },
    { 
      name: 'Recyclability', 
      score: ecoScore.breakdown.recyclability, 
      icon: Recycle,
      description: 'End-of-life product impact'
    }
  ]

  const CircularProgress = ({ score, size = 120 }) => {
    const radius = (size - 8) / 2
    const circumference = 2 * Math.PI * radius
    const strokeDasharray = circumference
    const strokeDashoffset = circumference - (score / 100) * circumference

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth="8"
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#22c55e"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-1000 ease-out"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="text-3xl font-bold text-gray-900">{score}</div>
            <div className="text-sm text-gray-500">Score</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToDashboard}
          className="flex items-center space-x-2 text-eco-green-600 hover:text-eco-green-700"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </button>
        <div className="text-sm text-gray-500">
          Analysis completed • {cartData.length} items analyzed
        </div>
      </div>

      {/* Main Score Card */}
      <div className="eco-card">
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <CircularProgress score={ecoScore.overallScore} />
              <div className="mt-4">
                <div className={`inline-flex px-4 py-2 rounded-full text-lg font-bold ${getScoreColor(ecoScore.overallScore)}`}>
                  Grade {getScoreGrade(ecoScore.overallScore)}
                </div>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Your Eco Score: {ecoScore.overallScore}/100
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                {ecoScore.overallScore >= 80 
                  ? "Excellent! Your cart shows strong environmental consciousness." 
                  : ecoScore.overallScore >= 60 
                  ? "Good start! You're making eco-friendly choices with room for improvement."
                  : "There's significant opportunity to make your shopping more sustainable."
                }
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500" />
                  <span className="font-semibold">+{ecoScore.points} Green Points</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-eco-green-600" />
                  <span className="font-semibold">{ecoScore.badges.length} Badges Earned</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'overview', name: 'Overview', icon: TrendingUp },
            { id: 'breakdown', name: 'Detailed Breakdown', icon: Package },
            { id: 'recommendations', name: 'Recommendations', icon: Lightbulb },
            { id: 'rewards', name: 'Rewards & Badges', icon: Gift }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-2 px-1 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? 'border-eco-green-500 text-eco-green-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="eco-card">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Cart Summary</h3>
              <div className="space-y-3">
                {cartData.map((item, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                    <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-3 mt-3">
                  <div className="flex justify-between items-center font-bold text-lg">
                    <span>Total</span>
                    <span>${cartData.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="eco-card">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Carbon Footprint</span>
                  <span className="font-semibold text-eco-green-600">-12% vs average</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Plastic Reduction</span>
                  <span className="font-semibold text-eco-green-600">3 items avoided</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Local Products</span>
                  <span className="font-semibold text-eco-green-600">75% of cart</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Recyclable Items</span>
                  <span className="font-semibold text-eco-green-600">85% of packaging</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'breakdown' && (
        <div className="grid md:grid-cols-2 gap-6">
          {scoreBreakdown.map((category, index) => (
            <div key={index} className="eco-card">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <category.icon className="h-6 w-6 text-eco-green-600" />
                    <h3 className="text-xl font-bold text-gray-900">{category.name}</h3>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-lg font-bold ${getScoreColor(category.score)}`}>
                    {category.score}
                  </div>
                </div>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-eco-green-500 h-3 rounded-full transition-all duration-1000"
                    style={{ width: `${category.score}%` }}
                  ></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'recommendations' && (
        <div className="space-y-6">
          {ecoScore.recommendations.map((recommendation, index) => (
            <div key={index} className="eco-card">
              <div className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    {index === 0 ? (
                      <AlertTriangle className="h-6 w-6 text-yellow-500" />
                    ) : (
                      <Lightbulb className="h-6 w-6 text-eco-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Recommendation #{index + 1}
                    </h3>
                    <p className="text-gray-700">{recommendation}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'rewards' && (
        <div className="grid md:grid-cols-2 gap-6">
          <div className="eco-card">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-6 w-6 mr-2 text-eco-green-600" />
                Badges Earned
              </h3>
              <div className="space-y-3">
                {ecoScore.badges.map((badge, index) => (
                  <div key={index} className="flex items-center space-x-3 p-3 bg-eco-green-50 rounded-lg">
                    <CheckCircle className="h-5 w-5 text-eco-green-600" />
                    <span className="font-semibold text-eco-green-800">{badge}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="eco-card">
            <div className="p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-6 w-6 mr-2 text-yellow-500" />
                Green Points
              </h3>
              <div className="text-center py-6">
                <div className="text-4xl font-bold text-eco-green-600 mb-2">
                  +{ecoScore.points}
                </div>
                <p className="text-gray-600 mb-4">Points earned this session</p>
                <div className="bg-gray-100 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    Use your Green Points for discounts on sustainable products or donate to environmental causes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CheckoutFeedback 