import { BookUserIcon, UserRoundIcon } from "lucide-react";

function Login(){
    function login({userInfos}){
        console.log(userInfos);
    }

    return (
        <div className="bg-[url('./assets/login-background.png')] bg-no-repeat bg-center sm:bg-top bg-cover w-[100vw] h-[100vh] flex justify-center items-center">
            <div className='bg-white flex flex-col w-72 rounded-xl sm:w-96'>
                <div className='flex items-center justify-center pt-7 gap-3'>
                    <div className="bg-blue-500 rounded-xl p-1">
                        <UserRoundIcon size={64} color="#fff"/>
                    </div>
                    <h1 className="text-3xl sm:text-5xl">React RH</h1>
                </div>
                <form action={login} className='flex flex-col gap-4 items-center pt-5'>
                    <input className="border border-gray-400 w-[75%] sm:w-[50%] p-2" type="text" placeholder="Usuário"/>
                    <input className="border border-gray-400 w-[75%] sm:w-[50%] p-2" type="password" placeholder="Senha" />
                    <button className="bg-blue-500 text-white w-[75%] sm:w-[50%] py-2 cursor-pointer" type="submit">Login</button>
                </form>
                <span className="text-center pt-7">Não possui uma conta?</span>
                <a href="" className="text-center pb-7 text-blue-700">crie uma conta</a>
            </div>
        </div>
    )
}

export default Login;