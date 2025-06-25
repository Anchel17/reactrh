import { PlusIcon } from "lucide-react";
import FuncionarioCard from "../components/FuncionarioCard";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function FuncionarioPage(){
    const navigate = useNavigate();
    const [funcionarios, setFuncionarios] = useState([]);

    useEffect(() => {
        async function buscarFuncionarios(){
            try{
                let token = await document.cookie;
                token = token.replace("session=", "");
                const response = await fetch('http://localhost:8080/funcionario',
                    {
                        method: 'GET',
                        headers: {
                            "content-type": "application/json",
                            "authorization": `Bearer ${token}`
                        },
                    }
                )

                const funcionariosJson = await response.json();
                setFuncionarios(funcionariosJson);
            }
            catch(err){
                alert("Erro inesperado ao buscar funcionários.");
                console.error(err);
            }
        }
        buscarFuncionarios();
    }, []);

    function goToCadastro(){
        navigate('/funcionarios/cadastro');
    }

    return (
        <div className="w-[100%] min-h-screen bg-gradient-to-br bg-cover from-blue-900 to-blue-400 flex flex-col items-center pb-5">
            <Header/>
            <div className="sm:w-[70%] w-[90%] pt-24">
                <div className="flex justify-between">
                    <h1 className="text-3xl text-white">Funcionários</h1>
                    <button onClick={goToCadastro}  className="flex flex-row items-center justify-center gap-2 text-white bg-[#033868] px-4 py-2 hover:cursor-pointer">
                        <PlusIcon/>
                        <span className="hidden sm:block">Adicionar Funcionário</span>
                    </button>
                </div>

                <div className="flex lg:flex-row flex-col flex-wrap justify-between gap-y-10 pt-5">
                    {funcionarios.map(func => (
                        <FuncionarioCard key={func.id} nome={func.nome} 
                        cargo={func.cargo} salario={func.salario} dataAdmissao={func.dataAdmissao}/>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default FuncionarioPage;