import { Routes, Route, NavLink } from 'react-router-dom';
import { FilterComponent } from './Pages/OutfitMaker';
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import LogIn from './Pages/UserManagement/Login';
import SignUp from './Pages/UserManagement/SignUp';
import Profile from './Pages/UserManagement/Profile';
import { FiHome, FiPlusSquare, FiUser, FiLogIn, FiUserPlus, FiLogOut } from 'react-icons/fi';

const App = () => {
    const [jwt, setJwt] = useState<string | null>(localStorage.getItem('jwtToken'));

    useEffect(() => {
        if (jwt == null) {
            localStorage.removeItem('jwtToken');
        } else {
            localStorage.setItem('jwtToken', jwt);
        }
    }, [jwt]);

    const handleLogout = () => {
        setJwt(null);
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navigation Bar */}
            <nav className="bg-white shadow-sm sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        <NavLink 
                            to="/" 
                            className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent"
                        >
                            StyleMe
                        </NavLink>
                        
                        <div className="flex space-x-4">
                            <NavLink 
                                to="/" 
                                className={({ isActive }) => 
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors`
                                }
                            >
                                <FiHome className="mr-1" /> Home
                            </NavLink>
                            
                            <NavLink 
                                to="/create" 
                                className={({ isActive }) => 
                                    `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors`
                                }
                            >
                                <FiPlusSquare className="mr-1" /> Create
                            </NavLink>
                            
                            {jwt ? (
                                <>
                                    <NavLink 
                                        to="/profile" 
                                        className={({ isActive }) => 
                                            `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors`
                                        }
                                    >
                                        <FiUser className="mr-1" /> Profile
                                    </NavLink>
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-red-600 hover:bg-red-50 transition-colors"
                                    >
                                        <FiLogOut className="mr-1" /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <NavLink 
                                        to="/login" 
                                        className={({ isActive }) => 
                                            `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors`
                                        }
                                    >
                                        <FiLogIn className="mr-1" /> Log In
                                    </NavLink>
                                    <NavLink 
                                        to="/sign up" 
                                        className={({ isActive }) => 
                                            `flex items-center px-3 py-2 rounded-md text-sm font-medium ${isActive ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600 hover:bg-purple-50'} transition-colors`
                                        }
                                    >
                                        <FiUserPlus className="mr-1" /> Sign Up
                                    </NavLink>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
                <Routes>
                    <Route path="/create" element={<FilterComponent />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn setJwt={setJwt} />} />
                    <Route path="/sign up" element={<SignUp />} />
                    <Route path="/profile" element={<Profile setJwt={setJwt} />} />
                </Routes>
            </main>

            {/* Footer */}
            <footer className="bg-white border-t mt-8">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <p className="text-center text-gray-500 text-sm">
                        &copy; {new Date().getFullYear()} StyleMe. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default App;