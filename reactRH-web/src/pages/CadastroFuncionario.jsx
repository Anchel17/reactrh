import { ArrowLeftIcon, PlusIcon, UserRoundIcon } from "lucide-react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";

function CadastroFuncionario(){
    const navigate = useNavigate();

    function goToFuncionarios(){
        navigate('/funcionarios');
    }

    return (
        <div className="w-[100%] min-h-screen bg-gradient-to-br bg-cover from-blue-900 to-blue-400 flex flex-col items-center pb-5">
            <Header/>
            <div className="sm:w-[70%] w-[90%] pt-24">
                <div className="flex flex-row items-center gap-3">
                    <button onClick={goToFuncionarios} className="flex flex-row items-center justify-center gap-2 rounded-md text-white bg-[#033868] px-4 py-2 hover:cursor-pointer">
                        <ArrowLeftIcon/>
                        <span>Voltar</span>
                    </button>
                    <h1 className="text-xl sm:text-3xl text-white">Cadastrar Funcionário</h1>
                </div>

                <form method="post" className="w-[100%] flex bg-white mt-5 rounded-lg">
                    <div className="w-[30%] lg:w-[20%] bg-gray-200 rounded-l-lg flex items-center justify-center">
                        <UserRoundIcon size={100}/>
                    </div>

                    <div className="flex flex-col w-[70%] lg:w-[50%] px-3 py-3">
                        <label>Nome</label>
                        <input type="text" name="nome" placeholder="Nome" 
                        className="border border-gray-400 w-[100%] p-2"/>
                        
                        <label className="pt-5">Cargo</label>
                        <input type="text" name="cargo" placeholder="Cargo" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"/>

                        <label className="pt-5">Salario</label>
                        <input type="text" name="salario" placeholder="salario" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"/>

                        <label className="pt-5">Data Admissão</label>
                        <input type="date" name="dataAdmissao" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"/>
                    </div>

                    <div className="bg-[url('./assets/cadastro.png')] bg-cover bg-no-repeat lg:bg-center hidden lg:block w-[35%]"></div>
                </form>
            </div>
        </div>
    )
}

export default CadastroFuncionario;