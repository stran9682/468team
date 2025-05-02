import { useState } from 'react';
const header = import.meta.env.VITE_API_URL

const SignUp = () => {
    const [badSignUpAttempt, setSignUpAttempt] = useState<String>("");

    const SignUpAttempt = (username: string , password : string, email: string) => {

        if (username === "" || password === "" || email === ""){
            setSignUpAttempt("please enter something")
        }
        else {
            fetch(header + "/UserData/register", {method: 'POST', headers: {'Content-Type': 'application/json'},body: JSON.stringify({userName: username, password: password, email: email})})
                .then ((result) =>{
                    result.json()
                }).then(() => setSignUpAttempt("account created!"))
                .catch (error => {
                    setSignUpAttempt("bad attempt " + error)
                })        
        }
    }

    return (
        <div className='h-screen'>
            <form className="max-w-sm mx-auto" onSubmit={(event) => { event.preventDefault(); SignUpAttempt((document.getElementById("username") as HTMLInputElement)?.value, (document.getElementById("password") as HTMLInputElement)?.value, (document.getElementById("email") as HTMLInputElement)?.value)}}>
                <div className="mb-5">
                    <h1 className="block mb-2 text-sm font-medium text-black">Your username</h1>
                    <input id="username" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="username" required />
                </div>
                <div className="mb-5">
                    <h1 className="block mb-2 text-sm font-medium text-black">Your email</h1>
                    <input id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <div className="mb-5">
                    <h1 className="block mb-2 text-sm font-medium text-black">Your Password</h1>
                    <input type="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />
                </div>
                <button type='submit' className="text-white bg-cyan-100 hover:bg-cyan-200 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Submit</button>
                <div className='text-black'>
                    {badSignUpAttempt}
                </div>
            </form>
        </div>
        
    )
}

export default SignUp