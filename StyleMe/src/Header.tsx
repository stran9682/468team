import { Routes, Route, NavLink } from 'react-router-dom';
import { FilterComponent} from './Pages/OutfitMaker'
import { useState } from 'react';
import Home from './Pages/Home';
import LogIn from './Pages/UserManagement/LogIn';
import SignUp from './Pages/UserManagement/SignUp';
import Profile from './Pages/UserManagement/Profile';


const App = () => {
    const [jwt, setJwt] = useState<{token: string} | null>(null);

    if (jwt == null) {
        return (
            <>
                <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/create">Create</NavLink>
                    <NavLink to="/login">Log In</NavLink>
                    <NavLink to="/sign up">Sign Up</NavLink>
                </nav>
                <Routes>
                    <Route path="/create" element={<FilterComponent/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/login" element={<LogIn setJwt={setJwt}/>}/>
                    <Route path="/sign up" element={<SignUp/>}/>
                </Routes>
            </>
        )
    }
    else {
        return (
            <>
               <nav>
                    <NavLink to="/">Home</NavLink>
                    <NavLink to="/create">Create</NavLink>
                    <NavLink to="/profile">profile</NavLink>
                </nav>
                <Routes>
                    <Route path="/create" element={<FilterComponent/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile/>}/>
                </Routes>
            </>
        )
    }
}

export default App;
