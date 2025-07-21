import React, { useState, useEffect } from 'react'
import { Award, Star, Gift, TrendingUp, CheckCircle, Clock, Target } from 'lucide-react'
import { cartService } from '../services/cartService'

const Rewards = () => {
  const [rewardsData, setRewardsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetchRewards()
  }, [])

  const fetchRewards = async () => {
    try {
      setLoading(true)
      // For demo - skip API call and use fallback data directly
      throw new Error('Using demo data')
      const data = await cartService.getRewards('user123')
      setRewardsData(data)
    } catch (err) {
      console.error('Using demo rewards data:', err)
      // Fallback to mock data for demo
      setRewardsData({
        totalPoints: 1250,
        availableRewards: [
          {
            id: 1,
            name: "5% Off Organic Products",
            cost: 500,
            description: "Get 5% discount on all organic items",
            category: "discount",
            available: true
          },
          {
            id: 2,
            name: "Plant a Tree",
            cost: 1000,
            description: "Fund tree planting in partnership with reforestation organizations",
            category: "environmental",
            available: true
          },
          {
            id: 3,
            name: "Free Reusable Bag",
            cost: 200,
            description: "Claim a free eco-friendly reusable shopping bag",
            category: "product",
            available: true
          }
        ],
        badges: [
          { name: "Eco Warrior", earned: true, description: "Made 10 sustainable shopping trips" },
          { name: "Plastic Free", earned: true, description: "Avoided plastic packaging for a week" },
          { name: "Local Supporter", earned: true, description: "Bought local products 5 times" },
          { name: "Carbon Reducer", earned: false, description: "Reduce cart carbon footprint by 50%" }
        ],
        recentActivity: [
          { date: "2025-01-17", points: 145, description: "Eco-friendly cart analysis" },
          { date: "2025-01-15", points: 120, description: "Plastic-free shopping" },
          { date: "2025-01-13", points: 95, description: "Local produce purchase" }
        ]
      })
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-12">
          <div className="animate-spin h-12 w-12 border-4 border-eco-green-500 border-t-transparent rounded-full mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading your rewards...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center py-12">
          <p className="text-red-600">Error loading rewards. Please try again.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Green Rewards</h2>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          Earn points for sustainable shopping choices and redeem them for rewards that make a difference.
        </p>
      </div>

      {/* Points Summary */}
      <div className="eco-card">
        <div className="p-8">
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-eco-green-100 rounded-full mb-4">
                <Star className="h-12 w-12 text-eco-green-600" />
              </div>
              <div className="text-3xl font-bold text-eco-green-600 mb-2">
                {rewardsData.totalPoints.toLocaleString()}
              </div>
              <div className="text-gray-600">Total Green Points</div>
            </div>
            
            <div className="md:col-span-2">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Green Points Balance</h3>
              <p className="text-gray-600 mb-6">
                You've earned {rewardsData.totalPoints.toLocaleString()} points through sustainable shopping! 
                Use them to get discounts, support environmental causes, or claim eco-friendly products.
              </p>
              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2">
                  <Award className="h-5 w-5 text-eco-green-600" />
                  <span className="font-semibold">{rewardsData.badges.filter(b => b.earned).length} Badges Earned</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Gift className="h-5 w-5 text-eco-green-600" />
                  <span className="font-semibold">{rewardsData.availableRewards.length} Rewards Available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Available Rewards */}
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-900 flex items-center">
            <Gift className="h-6 w-6 mr-2 text-eco-green-600" />
            Available Rewards
          </h3>
          
          {rewardsData.availableRewards.map((reward) => (
            <div key={reward.id} className="eco-card">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">{reward.name}</h4>
                    <p className="text-gray-600 mb-4">{reward.description}</p>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="font-semibold">{reward.cost} points</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        reward.category === 'discount' ? 'bg-blue-100 text-blue-800' :
                        reward.category === 'environmental' ? 'bg-green-100 text-green-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {reward.category}
                      </span>
                    </div>
                  </div>
                  <button
                    disabled={rewardsData.totalPoints < reward.cost}
                    className={`ml-4 px-4 py-2 rounded-lg font-medium transition-colors ${
                      rewardsData.totalPoints >= reward.cost
                        ? 'bg-eco-green-600 text-white hover:bg-eco-green-700'
                        : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    }`}
                  >
                    {rewardsData.totalPoints >= reward.cost ? 'Redeem' : 'Need More Points'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Badges & Activity */}
        <div className="space-y-6">
          {/* Badges */}
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Award className="h-6 w-6 mr-2 text-eco-green-600" />
              Achievement Badges
            </h3>
            
            <div className="grid grid-cols-1 gap-4">
              {rewardsData.badges.map((badge, index) => (
                <div key={index} className={`eco-card ${!badge.earned ? 'opacity-60' : ''}`}>
                  <div className="p-4">
                    <div className="flex items-center space-x-3">
                      {badge.earned ? (
                        <CheckCircle className="h-6 w-6 text-eco-green-600" />
                      ) : (
                        <Clock className="h-6 w-6 text-gray-400" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{badge.name}</h4>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 mr-2 text-eco-green-600" />
              Recent Activity
            </h3>
            
            <div className="eco-card">
              <div className="p-6">
                <div className="space-y-4">
                  {rewardsData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-gray-900">{activity.description}</p>
                        <p className="text-sm text-gray-500">{activity.date}</p>
                      </div>
                      <div className="flex items-center space-x-1 text-eco-green-600 font-semibold">
                        <Star className="h-4 w-4" />
                        <span>+{activity.points}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Rewards 