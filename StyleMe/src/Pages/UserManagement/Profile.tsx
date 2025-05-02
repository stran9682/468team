import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import OutfitDisplay from "../OutfitDisplay";

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
        <div className="h-full">
            <div className="mb-4">
                <h1 className="text-2xl text-black">Your saved outfits</h1>
                <a onClick={() => onLogOut()}>sign out!</a>
            </div>

            {outfits.map(outfit => {
                if (outfit.items.length > 0) {
                    return (
                        <div key={outfit.id} className="mb-4">
                            <h1 className="text-xl text-black">outfit {outfit.id}</h1>
                            <OutfitDisplay ClothingItems={outfit.items} />
                        </div>
                    );
                }
                return null;
            })}
        </div>
    )
}
  
export default Profile