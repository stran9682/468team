import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { FilterComponent } from "./Pages/OutfitMaker";
import { FiUser, FiLogOut, FiLogIn, FiUserPlus, FiHome, FiShoppingBag } from "react-icons/fi";


const Home = ({ data }: { data: any[] }) => (
  <div className="p-6 max-w-7xl mx-auto">
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-8 rounded-2xl shadow-lg mb-8">
      <h2 className="text-4xl font-bold mb-4">Welcome to StyleMe!</h2>
      <p className="text-xl opacity-90">Discover your perfect colors and clothing tailored just for you.</p>
    </div>
    
    <FilterComponent />
    
    <div className="mt-12 bg-white rounded-2xl shadow-md p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Your Wardrobe Items</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data && data.map(item => (
          <div key={item.id} className="bg-gray-50 p-4 rounded-xl hover:shadow-md transition-all">
            <div className="h-40 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg mb-2"></div>
            <p className="font-medium text-gray-800">{item.name}</p>
            <p className="text-sm text-gray-500">{item.type || 'Clothing item'}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const Catalog = () => {
  const outfits = [
    { id: 1, name: "Casual Chic", image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
    { id: 2, name: "Streetwear Vibes", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { id: 3, name: "Elegant Evening", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80" },
    { id: 4, name: "Summer Breeze", image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1935&q=80" },
    { id: 5, name: "Winter Warmth", image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80" },
    { id: 6, name: "Office Ready", image: "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" },
  ];
  
  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Trending Outfits</h2>
        <p className="text-gray-600">Discover outfits curated just for your style</p>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {outfits.map((outfit) => (
          <div 
            key={outfit.id} 
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div className="relative overflow-hidden h-60">
              <img 
                src={outfit.image} 
                alt={outfit.name} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                <h3 className="text-white text-xl font-medium">{outfit.name}</h3>
              </div>
            </div>
            <div className="p-4">
              <button className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
                View Outfit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white">
          <div className="flex items-center">
            <div className="w-20 h-20 rounded-full bg-white/20 flex items-center justify-center">
              <FiUser size={32} />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl font-bold">User Profile</h2>
              <p>Premium Member</p>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Personal Information</h3>
              <p className="text-gray-600">Name: Jane Doe</p>
              <p className="text-gray-600">Email: jane@example.com</p>
            </div>
            
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Style Preferences</h3>
              <p className="text-gray-600">Preferred Colors: Blue, Green</p>
              <p className="text-gray-600">Style: Casual Elegance</p>
            </div>
            
            <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Recent Outfits</h3>
              <div className="flex space-x-4 overflow-x-auto py-2">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex-shrink-0 w-24 h-24 bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Login = ({ onLogin }: { onLogin: () => void }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Welcome Back</h2>
          <p className="opacity-90">Sign in to your StyleMe account</p>
        </div>
        
        <form onSubmit={handleLogin} className="p-6 space-y-6">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Enter your username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            Login
          </button>
          
          <div className="text-center text-gray-600">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 hover:underline font-medium">
              Sign up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const Signup = ({ onSignup }: { onSignup: () => void }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (username && email && password && password === confirmPassword) {
      onSignup();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-500 p-6 text-white text-center">
          <h2 className="text-3xl font-bold">Create Account</h2>
          <p className="opacity-90">Join StyleMe today</p>
        </div>
        
        <form onSubmit={handleSignup} className="p-6 space-y-4">
          <div>
            <label className="block text-gray-700 mb-2">Username</label>
            <input
              type="text"
              placeholder="Choose a username"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          
          <div>
            <label className="block text-gray-700 mb-2">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          
          <button 
            type="submit" 
            className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-500 text-white rounded-lg hover:opacity-90 transition-opacity font-medium mt-4"
          >
            Sign Up
          </button>
          
          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <Link to="/login" className="text-purple-600 hover:underline font-medium">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

const Header = ({ isAuthenticated, onLogout }: { isAuthenticated: boolean, onLogout: () => void }) => (
  <header className="bg-white shadow-sm sticky top-0 z-10">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between h-16 items-center">
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            StyleMe
          </span>
        </Link>
        
        <nav className="hidden md:flex space-x-8">
          <Link 
            to="/" 
            className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
          >
            <FiHome className="mr-1" /> Home
          </Link>
          <Link 
            to="/catalog" 
            className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
          >
            <FiShoppingBag className="mr-1" /> Catalog
          </Link>
          {isAuthenticated ? (
            <>
              <Link 
                to="/profile" 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
              >
                <FiUser className="mr-1" /> Profile
              </Link>
              <button 
                onClick={onLogout} 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
              >
                <FiLogOut className="mr-1" /> Logout
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login" 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
              >
                <FiLogIn className="mr-1" /> Login
              </Link>
              <Link 
                to="/signup" 
                className="text-gray-700 hover:text-purple-600 transition-colors flex items-center"
              >
                <FiUserPlus className="mr-1" /> Sign Up
              </Link>
            </>
          )}
        </nav>
        
        {/* Mobile menu button would go here */}
      </div>
    </div>
  </header>
);

const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
  </div>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('http://localhost:8080/ClothingItem')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <LoadingSpinner />;
  if (error) return (
    <div className="min-h-screen flex items-center justify-center bg-red-50">
      <div className="bg-white p-8 rounded-xl shadow-md max-w-md text-center">
        <h2 className="text-2xl font-bold text-red-500 mb-4">Error Loading Data</h2>
        <p className="text-gray-700 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900">
        <Header isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
        <Routes>
          <Route path="/" element={<Home data={data!} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
         
        </Routes>
      </div>
    </Router>
  );
}