import { useState } from 'react';
const header = import.meta.env.VITE_API_URL

const SignUp = () => {
    const [badSignUpAttempt, setSignUpAttempt] = useState<String>("");

    const SignUpAttempt = (username: string , password : string, email: string) => {

        if (username === "" || password === "" || email === ""){
            setSignUpAttempt("please enter something")
        }
        else {
            fetch(header + "/UserData/register", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({userName: username, password: password, email: "string"})})
                .then (() =>{
                    setSignUpAttempt("Success Account Created")
                }).catch (error => {
                    setSignUpAttempt("bad attempt " + error)
                })        
        }
    }

    return (
        <>
            <h1 className='text-purple-600'>Username</h1>
            <input id="username"></input>
            <h1 className='text-purple-600'>Email</h1>
            <input id="email"></input>
            <h1 className='text-purple-600'>Password</h1>
            <input id="password"></input>
            <button onClick={() => SignUpAttempt((document.getElementById("username") as HTMLInputElement)?.value, (document.getElementById("password") as HTMLInputElement)?.value, (document.getElementById("email") as HTMLInputElement)?.value)}>Sign Up</button>
            {badSignUpAttempt}
        </>
    )
}

export default SignUp