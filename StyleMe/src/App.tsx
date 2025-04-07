import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import { FilterComponent } from "./OutfitMaker";

const Home = ({ data }) => (
  <div className="p-6">
    <h2 className="text-3xl font-bold">Welcome to StyleMe!</h2>
    <p className="mt-2">With StyleMe, you are able to find the best colors and clothing tailored specifically for you.</p>
    <FilterComponent/>
    <div className="mt-4">
      <h3 className="text-2xl font-bold">Fetched Data:</h3>
      <ul>
        {data && data.map(item => (
          <li key={item.id} className="mt-2">{item.name}</li>
        ))}
      </ul>
    </div>
  </div>
);

const Catalog = () => {
  const outfits = [
    { id: 1, name: "Casual Chic", image: "https://via.placeholder.com/200" },
    { id: 2, name: "Streetwear Vibes", image: "https://via.placeholder.com/200" },
    { id: 3, name: "Elegant Evening", image: "https://via.placeholder.com/200" },
  ];
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">Trending Outfits</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-4">
        {outfits.map((outfit) => (
          <div key={outfit.id} className="bg-white p-4 rounded-lg shadow-md">
            <img src={outfit.image} alt={outfit.name} className="w-full rounded-lg" />
            <h3 className="mt-2 text-lg font-medium">{outfit.name}</h3>
          </div>
        ))}
      </div>
    </div>
  );
};

const Profile = ({ isAuthenticated }) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold">User Profile</h2>
      <p className="mt-2">Manage your account and preferences.</p>
    </div>
  );
};

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (username && password) {
      onLogin();
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold"> Login </h2>
      <input
        type="text"
        placeholder="Username"
        className="mt-2 p-2 border rounded w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin} className="mt-4 p-2 bg-blue-500 text-white rounded w-full">Login</button>
      <p className="mt-2 text-center">
        Don't have an account? <Link to="/signup" className="text-blue-500">Sign up</Link>
      </p>
    </div>
  );
};

const Signup = ({ onSignup }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState(""); // Add email state
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignup = () => {
    if (username && email && password && password === confirmPassword) {
      onSignup();
    }
  };

  return (
    <div className="p-6 max-w-sm mx-auto">
      <h2 className="text-2xl font-bold">Sign Up</h2>
      <input
        type="text"
        placeholder="Username"
        className="mt-2 p-2 border rounded w-full"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        className="mt-2 p-2 border rounded w-full"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="mt-2 p-2 border rounded w-full"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm Password"
        className="mt-2 p-2 border rounded w-full"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={handleSignup} className="mt-4 p-2 bg-green-500 text-white rounded w-full">Sign Up</button>
      <p className="mt-2 text-center">
        Already have an account? <Link to="/login" className="text-blue-500">Login</Link>
      </p>
    </div>
  );
};

const Header = ({ isAuthenticated, onLogout }) => (
  <header className="bg-blue-500 text-white p-4 flex justify-between items-center">
    <h1 className="text-5xl font-bold text-center">StyleMe</h1>
    <nav>
      <Link to="/" className="px-4"> Home </Link>
      <Link to="/catalog" className="px-4"> Catalog </Link>
      {isAuthenticated ? (
        <>
          <Link to="/profile" className="px-4"> Profile </Link>
          <button onClick={onLogout} className="px-4 bg-red-500 rounded">Logout</button>
        </>
      ) : (
        <>
          <Link to="/login" className="px-4"> Login </Link>
          <Link to="/signup" className="px-4"> Sign Up </Link>
        </>
      )}
    </nav>
  </header>
);

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('useEffect is running'); // Add this line to verify useEffect is running
    fetch('http://localhost:8080/ClothingItem')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('Data fetched successfully:', data); // Log the data
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error); // Log the error
        setError(error.message);
        setLoading(false);
      });
  }, []); // Empty dependency array ensures it runs only once on mount

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 text-gray-900">
        <Header isAuthenticated={isAuthenticated} onLogout={() => setIsAuthenticated(false)} />
        <Routes>
          <Route path="/" element={<Home data={data} />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/profile" element={<Profile isAuthenticated={isAuthenticated} />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/signup" element={<Signup onSignup={() => setIsAuthenticated(true)} />} />
         
        </Routes>
      </div>
    </Router>
  );
}