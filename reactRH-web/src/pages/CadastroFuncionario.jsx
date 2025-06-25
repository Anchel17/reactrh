import { ArrowLeftIcon, PlusIcon, UserRoundIcon } from "lucide-react";
import Header from "../components/header";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Mensagem from "../components/Mensagem";

function CadastroFuncionario(){
    const [nomeInvalido, setNomeInvalido] = useState(false);
    const [cargoInvalido, setCargoInvalido] = useState(false);
    const [salarioInvalido, setSalarioInvalido] = useState(false);
    const [dataInvalida, setDataInvalida] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const navigate = useNavigate();

    const [formValues, setFormValues] = useState(
        {
            nome: '',
            cargo: '',
            salario: '',
            dataAdmissao: ''
        }
    )

    function cadastrar(event){
        event.preventDefault();

        const form = event.target;
        const formData = new FormData(form);

        const formJson = Object.fromEntries(formData.entries());
        let token = document.cookie;
        token = token.replace("session=", "");

        if(isFormInvalido(formJson)){
            return;
        }

        fetch('http://localhost:8080/funcionario',
            {
                method: form.method,
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(formJson)
            }
        )
        .then((response) => {
            if(response.status === 200){
                setCadastroSucesso(true);

                setTimeout(() => {
                    navigate('/funcionarios');
                }, 3000)
            }
            else{
                alert('Erro ao cadastrar funcionário, tente novamente mais tarde.');
            }
        })
        .catch(() => {
            alert('Erro ao cadastrar funcionário, tente novamente mais tarde.');
        })
    }

    function isFormInvalido(formJson){
        setNomeInvalido(false);
        setCargoInvalido(false);
        setSalarioInvalido(false);
        setDataInvalida(false);

        return isNomeInvalido(formJson.nome) || isCargoInvalido(formJson.cargo)
            || isSalarioInvalido(formJson.salario) || isDataInvalida(formJson.dataAdmissao);
    }

    function isNomeInvalido(nome){
        if(/^(?=.*[A-Za-z])[A-Za-z\s]{3,40}$/.test(nome)){
            setNomeInvalido(false);
            return false;
        }

        setNomeInvalido(true);
        return true;
    }

    function isCargoInvalido(cargo){
        if(/^(?=.*[A-Za-z])[A-Za-z\d\s]{5,40}$/.test(cargo)){
            setCargoInvalido(false);
            return false;
        }

        setCargoInvalido(true);
        return true;
    }

    function isSalarioInvalido(salario){
        if(/^\d+$/.test(salario)){
            setSalarioInvalido(false);
            return false;
        }

        setSalarioInvalido(true);
        return true;
    }

    function isDataInvalida(dataForm){
        const data = new Date(dataForm);
        const anoMinimo = new Date('1899-12-31');
        const hoje = new Date();

        data.setHours(0, 0, 0, 0);
        hoje.setHours(0, 0, 0, 0);

        if(data >= anoMinimo && data <= hoje){
            setDataInvalida(false);
            return false;
        }

        setDataInvalida(true);
        return true;
    }

    function onChange(e){
        e.preventDefault();

        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    function goToFuncionarios(){
        navigate('/funcionarios');
    }

    return (
        <div className="w-[100%] min-h-screen bg-gradient-to-br bg-cover from-blue-900 to-blue-400 flex flex-col items-center pb-5">
            <Header/>
            
            {cadastroSucesso && <Mensagem texto={'Funcionário cadastrado com sucesso! Retornando para o menu principal...'}/>}

            <div className="sm:w-[70%] w-[90%] pt-24">
                <div className="flex flex-row items-center gap-3">
                    <button onClick={goToFuncionarios} className="flex flex-row items-center justify-center gap-2 rounded-md text-white bg-[#033868] px-4 py-2 hover:cursor-pointer">
                        <ArrowLeftIcon/>
                        <span>Voltar</span>
                    </button>
                    <h1 className="text-xl sm:text-3xl text-white">Cadastrar Funcionário</h1>
                </div>

                <form method="post" onSubmit={cadastrar} className="w-[100%] flex bg-white mt-5 rounded-lg">
                    <div className="w-[30%] lg:w-[20%] bg-gray-200 rounded-l-lg flex items-center justify-center">
                        <UserRoundIcon size={100}/>
                    </div>

                    <div className="flex flex-col w-[70%] lg:w-[50%] px-3 py-3">
                        <label>Nome</label>
                        <input type="text" name="nome" placeholder="Nome" 
                        className="border border-gray-400 w-[100%] p-2"
                        onChange={onChange} value={formValues.nome} required/>
                        {nomeInvalido && <span className="font-medium text-red-600 text-sm">O nome deve ter entre 3 e 40 caracteres, somente letras.</span>}
                        
                        <label className="pt-5">Cargo</label>
                        <input type="text" name="cargo" placeholder="Cargo" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"
                        onChange={onChange} value={formValues.cargo} required/>
                        {cargoInvalido && <span className="font-medium text-red-600 text-sm">O cargo deve ter entre 5 e 30 caracteres, somente letras.</span>}

                        <label className="pt-5">Salario</label>
                        <input type="number" name="salario" placeholder="Salario" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"
                        onChange={onChange} value={formValues.salario} required/>
                        {salarioInvalido && <span className="font-medium text-red-600 text-sm">O salário só pode conter números e não ser negativo.</span>}

                        <label className="pt-5">Data Admissão</label>
                        <input type="date" name="dataAdmissao" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"
                        onChange={onChange} value={formValues.dataAdmissao} required/>
                        {dataInvalida && <span className="font-medium text-red-600 text-sm">A data não pode ser anterior a 1900 e nem no futuro.</span>}

                        <div className="flex justify-end items-center gap-5 pt-3">
                            <button className="text-red-700 font-semibold hover:cursor-pointer">Limpar</button>
                            <button className="py-2 px-3 text-white bg-blue-500 rounded-lg hover:cursor-pointer" type="submit">Cadastrar</button>
                        </div>
                    </div>

                    <div className="bg-[url('./assets/cadastro.png')] bg-cover bg-no-repeat lg:bg-center hidden lg:block w-[35%]"></div>
                </form>
            </div>
        </div>
    )
}

export default CadastroFuncionario;