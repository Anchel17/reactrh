import { PlusIcon } from "lucide-react";
import FuncionarioCard from "../components/FuncionarioCard";
import Loading from "../components/Loading"
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mensagem from "../components/Mensagem";

function FuncionarioPage(){
    const [loggedUser, setLoggedUser] = useState({login: '', roles: []});
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [temFuncionarios, setTemFuncionarios] = useState(false);
    const [deletarSucesso, setDeletarSucesso] = useState(false);

    async function buscarFuncionarios(){
        try{
            const response = await fetch('/api/funcionario',
                {
                    method: 'GET',
                    headers: {
                        "content-type": "application/json",
                    },
                    credentials: "include",
                }
            )

            if(response.status === 403){
                navigate('/login');
                return;
            }

            const funcionariosJson = await response.json();
            setFuncionarios(funcionariosJson);
            setIsLoading(false);
            setTemFuncionarios(funcionariosJson.length > 0);
        }
        catch(err){
            alert("Erro inesperado ao buscar funcionários.");
            setIsLoading(false);
            console.error(err);
        }
    }

    async function buscarInformacoesUsuario() {
        try{
            const response = await fetch('/api/auth/me',
                    {
                        method: 'GET',
                        headers: {
                            "content-type": "application/json",
                        },
                        credentials: "include",
                    }
                );

            if(response.status === 200){
                const userInfo = await response.json();

                setLoggedUser(userInfo);
            }
            else if(response.status === 403){
                navigate('/login');
                return;
            }
            else{
                alert("Resposta inesperada do servidor, redirecionando para o Login.");
            }
        }
        catch(err){
            alert("Erro inesperado ao buscar informações do usuário.");
            console.error(err);
        }
    }

    useEffect(() => {
        buscarInformacoesUsuario();
        buscarFuncionarios();
    }, []);
    
    function deletarFuncionario(id){
        fetch(`/api/funcionario/${id}`,
            {
                method: 'DELETE',
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
            }
        )
        .then((response) => {
            if(response.status === 200){
                setDeletarSucesso(true);
                buscarFuncionarios();

                setTimeout(() => setDeletarSucesso(false), 3000);
            }
            else if(response.status === 403){
                alert("Usuário não autorizado a deletar funcionário!")
                navigate('/login');
                return;
            }
            else{
                alert('Erro ao deletar funcionário, tente novamente mais tarde.');
            }
        })
        .catch(() => {
            alert('Erro ao deletar funcionário, tente novamente mais tarde.');
        })
    }

    function goToCadastro(){
        navigate('/funcionarios/cadastro');
    }

    return (
        <div className="w-[100%] min-h-screen bg-gradient-to-br bg-cover from-blue-900 to-blue-400 flex flex-col items-center pb-5">
            {deletarSucesso && <Mensagem texto={'Funcionário deletado com sucesso.'}/>}
            <Header/>
            <div className="sm:w-[70%] w-[90%] pt-24">
                <div className="flex justify-between">
                    <h1 className="text-3xl text-white">Funcionários</h1>
                    {loggedUser.roles.includes('ROLE_ADMIN') &&
                        <button onClick={goToCadastro}  className="flex flex-row items-center justify-center gap-2 text-white bg-[#033868] px-4 py-2 hover:cursor-pointer">
                            <PlusIcon/>
                            <span className="hidden sm:block">Adicionar Funcionário</span>
                        </button>
                    }
                </div>
                {isLoading && 
                    <div className="flex self-center justify-center pt-5">
                        <Loading/>
                    </div>
                }
                {temFuncionarios &&
                    <div className="flex lg:flex-row flex-col flex-wrap justify-between gap-y-10 pt-5">
                        {funcionarios.map(func => (
                            <FuncionarioCard key={func.id} id={func.id} nome={func.nome} 
                            cargo={func.cargo} salario={func.salario} dataAdmissao={func.dataAdmissao}
                            isUserAdmin={loggedUser.roles.includes('ROLE_ADMIN')} onDeletarFuncionario={deletarFuncionario}/>
                        ))}
                    </div>
                }
                {!temFuncionarios && !isLoading &&
                    <div>
                        <span className="text-white text-3xl flex justify-center pt-5">Sem funcionários cadastrados!</span>
                    </div>
                }
            </div>
        </div>
    )
}

export default FuncionarioPage;