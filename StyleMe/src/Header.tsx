import { Routes, Route, NavLink } from 'react-router-dom';
import { FilterComponent} from './Pages/OutfitMaker'
import { useEffect, useState } from 'react';
import Home from './Pages/Home';
import LogIn from './Pages/UserManagement/LogIn';
import SignUp from './Pages/UserManagement/SignUp';
import Profile from './Pages/UserManagement/Profile';

const App = () => {
    const [jwt, setJwt] = useState<string | null>(localStorage.getItem('jwtToken'));

    useEffect (() => {
        if (jwt == null){
            localStorage.removeItem('jwtToken');
        }
        else {
            localStorage.setItem('jwtToken', jwt!)
        }
    }, [jwt])

    if (jwt == null) {
        return (
            <>         
                
                <nav className='pl-10 pr-10 space-y-4 flex justify-between box-border'>

                    <div className='flex justify-between w-1/6'>
                        <NavLink to="/" className='text-3xl content-center'>Home</NavLink>
                        <NavLink to="/create" className='text-3xl content-center'>Create</NavLink>
                    </div>
                    
                    <div className='text-7xl w-2/3 justify-center flex'>StyleMe</div>

                    <div className='flex justify-between w-1/6'>
                        <NavLink to="/login" className='text-3xl content-center'>Log In</NavLink>
                        <NavLink to="/sign up" className='text-3xl content-center'>Sign Up</NavLink>
                    </div>

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
                
                <nav className='pl-10 pr-10 space-y-4 flex justify-between'>
                    
                    <div className='flex justify-between w-1/6'>
                        <NavLink to="/" className='text-3xl content-center'>Home</NavLink>
                        <NavLink to="/create" className='text-3xl content-center'>Create</NavLink>
                    </div>
                    
                    <div className='text-7xl w-2/3 justify-center flex'>StyleMe</div>

                    <NavLink to="/profile" className='text-3xl w-1/6 content-center'>profile</NavLink>    
                </nav>
                <Routes>
                    <Route path="/create" element={<FilterComponent/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/profile" element={<Profile setJwt={setJwt}/>}/>
                </Routes>
            </>
        )
    }
}

export default App;
