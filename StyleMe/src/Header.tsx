import { Routes, Route } from 'react-router-dom';
import { FilterComponent} from './Pages/OutfitMaker'
import NavBar from './Pages/NavBar';
import Home from './Pages/Home';
import LogIn from './Pages/LogIn';
import SignUp from './Pages/SignUp';


const App = () => {
    return (
        <>
            <NavBar/>
            <Routes>
                <Route path="/create" element={<FilterComponent/>}/>
                <Route path="/" element={<Home/>}/>
                <Route path="/login" element={<LogIn/>}/>
                <Route path="/sign up" element={<SignUp/>}/>

            </Routes>
        </>
    )
}

export default App;