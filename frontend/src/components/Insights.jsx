import React, { useState, useEffect } from 'react'
import { BarChart3, TrendingUp, TrendingDown, Calendar, Leaf, Package, Truck, Recycle } from 'lucide-react'
import { cartService } from '../services/cartService'

const Insights = () => {
  const [insightsData, setInsightsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [selectedTimeframe, setSelectedTimeframe] = useState('30d')
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchInsights()
  }, [selectedTimeframe])

  const fetchInsights = async () => {
    try {
      setLoading(true)
      const data = await cartService.getEcoInsights(selectedTimeframe)
      setInsightsData(data)
    } catch (err) {
      console.error('Error fetching insights:', err)
      // Fallback to mock data for demo
      setInsightsData({
        totalTrips: 12,
        averageEcoScore: 74,
        totalPointsEarned: 1450,
        topCategory: "Organic Products",
        trends: {
          ecoScore: { current: 74, previous: 68, change: +6 },
          packagingScore: { current: 72, previous: 65, change: +7 },
          carbonScore: { current: 78, previous: 72, change: +6 },
          localScore: { current: 69, previous: 71, change: -2 }
        },
        categoryBreakdown: [
          { category: "Packaging", score: 72, improvement: +7 },
          { category: "Carbon Impact", score: 78, improvement: +6 },
          { category: "Local Sourcing", score: 69, improvement: -2 },
          { category: "Recyclability", score: 76, improvement: +4 }
        ],
        weeklyScores: [
          { week: "Week 1", score: 68 },
          { week: "Week 2", score: 71 },
          { week: "Week 3", score: 73 },
          { week: "Week 4", score: 74 }
        ],
        sustainablePurchases: [
          { item: "Organic Bananas", count: 8, impact: "Low carbon footprint" },
          { item: "Reusable Bags", count: 3, impact: "Plastic reduction" },
          { item: "Local Honey", count: 2, impact: "Supports local farmers" },
          { item: "Bulk Grains", count: 5, impact: "Minimal packaging" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  const timeframes = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 3 months' },
    { value: '1y', label: 'Last year' }
  ]

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-eco-green-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your insights...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-12">
          <p className="text-red-600">Error loading insights. Please try again.</p>
        </div>
      </div>
    )
  }

  const getTrendIcon = (change) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingDown className="h-4 w-4 text-red-500" />
    return <span className="h-4 w-4" />
  }

  const getCategoryIcon = (category) => {
    switch (category) {
      case 'Packaging': return <Package className="h-5 w-5" />
      case 'Carbon Impact': return <Leaf className="h-5 w-5" />
      case 'Local Sourcing': return <Truck className="h-5 w-5" />
      case 'Recyclability': return <Recycle className="h-5 w-5" />
      default: return <BarChart3 className="h-5 w-5" />
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Eco Shopping Insights</h2>
          <p className="text-xl text-gray-600">
            Track your sustainable shopping progress and discover improvement opportunities.
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-500" />
          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 bg-white focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500"
          >
            {timeframes.map((tf) => (
              <option key={tf.value} value={tf.value}>{tf.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="eco-card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-eco-green-600 mb-2">{insightsData.totalTrips}</div>
            <div className="text-gray-600">Shopping Trips</div>
          </div>
        </div>
        
        <div className="eco-card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-eco-green-600 mb-2">{insightsData.averageEcoScore}</div>
            <div className="text-gray-600">Average Eco Score</div>
          </div>
        </div>
        
        <div className="eco-card">
          <div className="p-6 text-center">
            <div className="text-3xl font-bold text-eco-green-600 mb-2">{insightsData.totalPointsEarned}</div>
            <div className="text-gray-600">Points Earned</div>
          </div>
        </div>
        
        <div className="eco-card">
          <div className="p-6 text-center">
            <div className="text-lg font-bold text-eco-green-600 mb-2">{insightsData.topCategory}</div>
            <div className="text-gray-600">Top Category</div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Trends */}
        <div className="eco-card">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-eco-green-600" />
              Score Trends
            </h3>
            
            <div className="space-y-4">
              {Object.entries(insightsData.trends).map(([key, trend]) => (
                <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div>
                    <h4 className="font-semibold text-gray-900 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                    </h4>
                    <p className="text-sm text-gray-600">Current: {trend.current}%</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getTrendIcon(trend.change)}
                    <span className={`font-semibold ${
                      trend.change > 0 ? 'text-green-600' : 
                      trend.change < 0 ? 'text-red-600' : 'text-gray-600'
                    }`}>
                      {trend.change > 0 ? '+' : ''}{trend.change}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="eco-card">
          <div className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="h-6 w-6 mr-2 text-eco-green-600" />
              Category Performance
            </h3>
            
            <div className="space-y-4">
              {insightsData.categoryBreakdown.map((category, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getCategoryIcon(category.category)}
                      <span className="font-semibold text-gray-900">{category.category}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-600">{category.score}%</span>
                      {getTrendIcon(category.improvement)}
                      <span className={`text-sm ${
                        category.improvement > 0 ? 'text-green-600' : 
                        category.improvement < 0 ? 'text-red-600' : 'text-gray-600'
                      }`}>
                        {category.improvement > 0 ? '+' : ''}{category.improvement}
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-eco-green-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${category.score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Weekly Progress */}
      <div className="eco-card">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Weekly Progress</h3>
          
          <div className="grid grid-cols-4 gap-4">
            {insightsData.weeklyScores.map((week, index) => (
              <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-eco-green-600 mb-1">{week.score}</div>
                <div className="text-sm text-gray-600">{week.week}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Sustainable Purchases */}
      <div className="eco-card">
        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Top Sustainable Purchases</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            {insightsData.sustainablePurchases.map((purchase, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-eco-green-50 rounded-lg">
                <div>
                  <h4 className="font-semibold text-gray-900">{purchase.item}</h4>
                  <p className="text-sm text-gray-600">{purchase.impact}</p>
                </div>
                <div className="text-eco-green-600 font-semibold">
                  {purchase.count}x
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Insights 