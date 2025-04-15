import { useState } from 'react';   
import { useNavigate } from 'react-router-dom';

const header = import.meta.env.VITE_API_URL

const LogIn = ({setJwt}:{setJwt: (jwt: string) => void}) => {
    const [badLoginAttempt, setLoginAttempt] = useState<String>("");
    const navigate = useNavigate();

    const loginAttempt = (username: string , password : string) => {

        if (username === "" || password === ""){
            setLoginAttempt("please enter something")
        }
        else {
            fetch(header + "/UserData/login", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({userName: username, password: password, email: "string"})})
                .then(res =>
                    res.json()
                )
                .then (data =>{
                    setJwt(data.token)
                    setLoginAttempt("")
                    navigate("/");
                }).catch (error => {
                    setLoginAttempt("bad log in attempt " + error)
                })        
        }
    }

    return (
        <>
            Username<input id="username"></input>
            Password<input id="password"></input>
            <button onClick={() => loginAttempt((document.getElementById("username") as HTMLInputElement)?.value, (document.getElementById("password") as HTMLInputElement)?.value)}>Login</button>
            {badLoginAttempt}
        </>
    )
}

export default LogIn