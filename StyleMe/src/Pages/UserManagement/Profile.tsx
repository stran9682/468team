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
        <div className="pl-10 pr-10 bg-white">
            <div  className="mb-5 text-black">
                <h1 className="text-5xl">Welcome to your profile!</h1>
                <a onClick={() => onLogOut()}>sign out!</a>
            </div>

            {outfits.map(outfit => (
                <div className="mb-10 text-black" key={outfit.id}>
                    <h2 className="text-3xl mb-5">Outfit {outfit.id}</h2>
                    <div className="flex gap-5">
                        {outfit.items.map((item: any) => (
                            <div key={item.id} style={{backgroundImage: `url(${item.image})`, backgroundSize: "cover"}} className="w-1/4 h-100 aspect-ratio: 1 / 1.618;">
                                <h2 className='text-white text-2xl text-shadow-lg'>{item.name}</h2>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Profile