import { UserRoundIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register(){
    const [loginInvalido, setLoginInvalido] = useState(false);
    const [senhaInvalida, setSenhaInvalida] = useState(false);
    const [confirmarSenhaInvalido, setConfirmarSenhaInvalido] = useState(false);
    const [sucessoCadastro, setCadastroSucesso] = useState(false);
    const [usuarioJaCadastrado, setUsuarioJaCadastrado] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        {
            login: '',
            password: '', 
            repeatPassword: '', 
            role: 'USER'
        }
    );

    function register(event){
        event.preventDefault();
        
        const form = event.target;
        const formData = new FormData(form);
        const formJson = Object.fromEntries(formData.entries());
        
        if(isFormInvalido(formJson)){
            return;
        }

        fetch('http://localhost:8080/auth/register', 
            {
                method: form.method, 
                headers: {"Content-Type": "application/json"}, 
                body: JSON.stringify(formJson)
            }
        ).then((response) => {
            if(response.status === 200){
                setCadastroSucesso(true);

                setTimeout(() => navigate('/login'), 3000);
            }
            else if(response.status === 400){
                setUsuarioJaCadastrado(true);
            }
        })
    }

    function isFormInvalido(formJson){
        setUsuarioJaCadastrado(false);
        setCadastroSucesso(false);
        return isLoginInvalido(formJson.login) || isSenhaInvalida(formJson.password) 
            || senhasDiferentes(formJson.password, formJson.repeatPassword);
    }

    function isLoginInvalido(login){
        if(/^[A-Za-z]{3,}$/.test(login)){
            setLoginInvalido(false);
            return false;
        }
        
        setLoginInvalido(true);
        return true;
    }

    function isSenhaInvalida(senha){
        if(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,16}$/.test(senha)){
            setSenhaInvalida(false);
            return false;
        }
        
        setSenhaInvalida(true);
        return true;
    }

    function senhasDiferentes(senha, senhaRepetida){
        if(senha === senhaRepetida){
            setConfirmarSenhaInvalido(false);
            return false;
        }

        setConfirmarSenhaInvalido(true);
        return true;
    }

    function goToLogin(){
        navigate('/login');
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

                {sucessoCadastro && <span className='font-medium text-green-600 text-sm text-center pt-5 px-5'>
                    Usuário cadastrado com sucesso! <br/>Redirecionando para a tela de login...
                </span>}
                {usuarioJaCadastrado && <span className='font-medium text-red-600 text-sm text-center pt-5' >Usuário já cadastrado.</span>}

                <form method='post' onSubmit={register} className='flex flex-col gap-4 items-center pt-5'>
                    <input className="border border-gray-400 w-[75%] sm:w-[50%] p-2" name='login' 
                    type="text" placeholder="Usuário" value={formValues.login} onChange={onChange} 
                    required maxLength='16'/>
                    {loginInvalido && <span className="font-medium text-red-600 text-sm max-w-[80%]">O usuário deve possuir no mínimo 3 caracteres e somente letras.</span>}
                    
                    <input className="border border-gray-400 w-[75%] sm:w-[50%] p-2" name='password' 
                    type="password" placeholder="Senha" value={formValues.password} onChange={onChange} 
                    required maxLength='12'/>
                    {senhaInvalida && <span className="font-medium text-red-600 text-sm max-w-[80%]">A senha deve possuir no mínimo 6 caracteres, 1 letra e 1 número.</span>}
                    
                    <input className="border border-gray-400 w-[75%] sm:w-[50%] p-2" name='repeatPassword' 
                    type="password" placeholder="Repita a senha" value={formValues.repeatPassword} onChange={onChange} 
                    required maxLength='12'/>
                    {confirmarSenhaInvalido && <span className="font-medium text-red-600 text-sm max-w-[80%]">Senhas diferentes.</span>}
                    
                    <span>Nível de permissão:</span>
                    <select name='role' value={formValues.role} onChange={onChange} className="border border-gray-400 w-[75%] sm:w-[50%] p-2">
                        <option value="USER">COMUM</option>
                        <option value="ADMIN">ADMIN</option>
                    </select>

                    <button className="bg-blue-500 text-white w-[75%] sm:w-[50%] py-2 cursor-pointer rounded-md" type="submit">Cadastrar</button>
                </form>
                <span className="text-center pt-7">Possui uma conta?</span>
                <span onClick={goToLogin} className="text-center text-blue-700 cursor-pointer">Faça o login</span>
            </div>
        </div>
    )
}

export default Register;