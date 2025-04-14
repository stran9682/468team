import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const header = import.meta.env.VITE_API_URL

const Profile = ({setJwt}:{setJwt: (jwt: null) => void}) => {
   
    const navigate = useNavigate();
    const [outfits, setOutfits] = useState<any[]>([]);

    const onLogOut = () => {
        setJwt(null)
        navigate("/");
    }

    useEffect(() => {
        const headers = { 'Authorization': 'Bearer ' + localStorage.getItem('jwtToken')};
        fetch(header + "/UserData/useroutfits", { headers })
        .then(res =>  res.json())    
        .then (data => setOutfits(data));
    }, [])
 
    return (
        <>
            Work in progress!
            <a onClick={() => onLogOut()}>sign out!</a>

            {outfits.map(outfit => (
                <div key={outfit.id}>
                    {outfit.id}
                    {outfit.items.map((item: any) => (
                        <div 
                            key={item.id}
                            style={{
                                backgroundImage: `url(${item.image})`,
                                width: '33.33%',
                                height: '400px',
                                backgroundSize: "cover",
                                color:'white',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            <h2 className='text-white text-lg text-shadow-lg'>{item.name}</h2>
                        </div>
                    ))}
                </div>
            ))}
        </>
    )
}

export default Profile