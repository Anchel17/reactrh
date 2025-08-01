import { Pencil, Trash2Icon, UserIcon } from "lucide-react"
import { useState } from "react";
import { Link } from "react-router-dom"
import Modal from "./Modal";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

function FuncionarioCard({id, nome, cargo, salario, dataAdmissao, caminhoImagemPerfil, isUserAdmin, onDeletarFuncionario}){

    const [isModalOpen, setIsModalOpen] = useState(false);

    function toggleModal(){
        setIsModalOpen(true);
    }

    const closeModal = () =>{
        setIsModalOpen(false);
    }

    const deletarFuncionario = () => {
        onDeletarFuncionario(id);
        closeModal();
    }

    function formatarSalario(){
        return new Intl.NumberFormat('pt-BR', {style: 'currency', currency:'BRL'}).format(salario);
    }

    function formatarData(){
        return format(new Date(dataAdmissao), "dd'/'MM'/'yyyy", {locale: ptBR});
    }

    function getPathImagemFuncionario(){
        return `http://localhost:8080/funcionario/imagem/${caminhoImagemPerfil}`;
    }

    return (
        
        <div className="bg-white rounded-md flex lg:w-[45%] w-[100%]">
            <div className="rounded-l-md w-[30%] flex items-center justify-center bg-gray-200">
                {caminhoImagemPerfil ? (
                    <div alt="Imagem Funcionário"
                    className={`bg-center bg-no-repeat bg-cover w-full h-full object-cover`}
                    style={{
                        backgroundImage: `url(${getPathImagemFuncionario()})`
                    }}
                    ></div>
                ) : (
                    <UserIcon size={100}/>
                )}

            </div>
            <div className="flex flex-row justify-between w-[100%]">
                <div className="flex flex-col gap-2 px-2 py-2">
                    <span>Nome: {nome}</span>
                    <span>Cargo: {cargo}</span>
                    <span>Salário: {formatarSalario()}</span>
                    <span>Admissão: {formatarData()}</span>
                </div>
                {isUserAdmin &&
                    <div className="flex flex-col gap-2 pr-2 justify-between py-3">
                        <button className="hover:cursor-pointer">
                            <Link to={`/funcionarios/cadastro?id=${id}&isEdicao=${true}`}>
                                <Pencil size={32}/>
                            </Link>
                        </button>
                        <button onClick={toggleModal} className="hover:cursor-pointer">
                            <Trash2Icon size={32}/>
                        </button>

                        {isModalOpen && <Modal onSubmit={deletarFuncionario} onCancel={closeModal} nome={nome}/>}
                    </div>
                }
            </div>
        </div>
    )
}

export default FuncionarioCard