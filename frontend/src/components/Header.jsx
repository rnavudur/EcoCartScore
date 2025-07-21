import React from 'react'
import { Leaf, ShoppingCart, Award, BarChart3 } from 'lucide-react'

const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="gradient-bg shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-3 hover:opacity-80 transition-opacity cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2"
          >
            <div className="bg-white p-2 rounded-lg">
              <Leaf className="h-8 w-8 text-eco-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">EcoCart Score</h1>
              <p className="text-eco-green-100 text-sm">Green Shopping Feedback</p>
            </div>
          </button>
          
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('dashboard')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'dashboard' 
                  ? 'bg-white text-eco-green-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>Dashboard</span>
            </button>
            
            <button
              onClick={() => onNavigate('rewards')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'rewards' 
                  ? 'bg-white text-eco-green-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <Award className="h-5 w-5" />
              <span>Rewards</span>
            </button>
            
            <button
              onClick={() => onNavigate('insights')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                currentPage === 'insights' 
                  ? 'bg-white text-eco-green-600 shadow-md' 
                  : 'text-white hover:bg-white hover:bg-opacity-20'
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Insights</span>
            </button>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header 