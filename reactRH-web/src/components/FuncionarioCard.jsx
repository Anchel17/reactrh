import { Pencil, Trash2Icon, UserIcon } from "lucide-react"

function FuncionarioCard({nome, cargo, salario, dataAdmissao}){
    return (
        <div className="bg-white rounded-md flex lg:w-[45%] w-[100%]">
            <div className="rounded-l-md flex items-center bg-gray-200">
                <UserIcon size={100}/>
            </div>
            <div className="flex flex-row justify-between w-[100%]">
                <div className="flex flex-col gap-2 px-2 py-2">
                    <span>Nome: {nome}</span>
                    <span>Cargo: {cargo}</span>
                    <span>Salário: R$ {salario}</span>
                    <span>Admissão: {dataAdmissao}</span>
                </div>
                <div className="flex flex-col gap-2 pr-2 justify-between py-3">
                    <button className="hover:cursor-pointer">
                        <Pencil size={32}/>
                    </button>
                    <button className="hover:cursor-pointer">
                        <Trash2Icon size={32}/>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default FuncionarioCard