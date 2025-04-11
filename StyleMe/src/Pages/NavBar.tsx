import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/create">Create</NavLink>
            <NavLink to="/login">Log In</NavLink>
            <NavLink to="/sign up">Sign Up</NavLink>
        </nav>
    )
}

export default NavBar;