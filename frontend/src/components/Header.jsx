import React from 'react'
import { Leaf, ShoppingCart, Award, BarChart3 } from 'lucide-react'

const Header = ({ currentPage, onNavigate }) => {
  return (
    <header className="gradient-bg shadow-lg">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <button 
            onClick={() => onNavigate('dashboard')}
            className="flex items-center space-x-4 hover:opacity-80 transition-all duration-300 cursor-pointer focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-lg p-2 hover:scale-105"
          >
            <div className="bg-white p-3 rounded-xl shadow-lg border-2 border-eco-green-200">
              <Leaf className="h-10 w-10 text-eco-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-white flex items-center">
                🌱 EcoCart Score
              </h1>
              <p className="text-eco-green-100 text-sm font-medium">Green Shopping Feedback Tool</p>
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