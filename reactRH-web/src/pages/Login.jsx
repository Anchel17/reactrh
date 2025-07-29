import { UserRoundIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login(){
    const [credenciaisInvalidas, setCredenciaisInvalidas] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        {
            login: '',
            password: '', 
        }
    );

    function login(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        
        fetch('/api/auth/login',
            {
                method: form.method, 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(formJson)
            }
        )
        .then((response) => {
            if(response.status === 200){
                navigate('/funcionarios');
            }
            else if(response.status === 204){
                setCredenciaisInvalidas(true);
            }
            else{
                alert("Erro não esperado, tente novamente mais tarde.");
            }
        })
        .catch((e) => {alert("Erro não esperado, tente novamente mais tarde."); console.log(e)})
    }

    function goToRegister(){
        navigate('/register');
    }

    function onChange(e){
        e.preventDefault();
        
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    return (
        <div className="bg-[url('./assets/login-background.png')] bg-no-repeat bg-center sm:bg-top bg-cover w-[100vw] h-[100vh] flex justify-center items-center">
            <div className='bg-white flex flex-col w-72 rounded-xl sm:w-96 pb-7'>
                <div className='flex items-center justify-center pt-7 gap-3'>
                    <div className="bg-blue-500 rounded-xl p-1">
                        <UserRoundIcon size={64} color="#fff"/>
                    </div>
                    <h1 className="text-3xl sm:text-5xl">React RH</h1>
                </div>
                {credenciaisInvalidas && <span className='font-medium text-red-600 text-sm text-center pt-5'>Credenciais inválidas</span>}
                <form method='post' onSubmit={login} className='flex flex-col gap-4 items-center pt-5'>
                    <input onChange={onChange} className="border border-gray-400 w-[75%] sm:w-[50%] p-2" type="text" 
                    placeholder="Usuário" name="login" value={formValues.login} required maxLength='16'/>
                    <input onChange={onChange} className="border border-gray-400 w-[75%] sm:w-[50%] p-2" type="password"
                    placeholder="Senha" name="password" value={formValues.password} required maxLength='12'/>
                    <button className="bg-blue-500 text-white w-[75%] sm:w-[50%] py-2 cursor-pointer" type="submit">Login</button>
                </form>
                <span className="text-center pt-7">Não possui uma conta?</span>
                <span onClick={goToRegister} className="text-center text-blue-700 cursor-pointer">crie uma conta</span>
            </div>
        </div>
    )
}

export default Login;