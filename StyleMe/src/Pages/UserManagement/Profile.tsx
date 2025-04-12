import { useNavigate } from "react-router-dom";



const Profile = ({setJwt}:{setJwt: (jwt: null) => void}) => {
    const navigate = useNavigate();

    const onLogOut = () => {
        setJwt(null)
        navigate("/");
    }
    
    return (
        <>
            Work in progress!
            <a onClick={() => onLogOut()}>sign out!</a>
        </>
    )
}

export default Profile