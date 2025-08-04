import { ArrowLeftIcon, PlusIcon, UserRoundIcon } from "lucide-react";
import Header from "../components/header";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Mensagem from "../components/Mensagem";
import { CurrencyInput } from "react-currency-mask";

function CadastroFuncionario(){
    const [nomeInvalido, setNomeInvalido] = useState(false);
    const [cargoInvalido, setCargoInvalido] = useState(false);
    const [salarioInvalido, setSalarioInvalido] = useState(false);
    const [dataInvalida, setDataInvalida] = useState(false);
    const [cadastroSucesso, setCadastroSucesso] = useState(false);
    const [alterarSucesso, setAlterarSucesso] = useState(false);
    const [previewImageUrl, setPreviewImageUrl] = useState(null);
    const navigate = useNavigate();

    const location = useLocation()
    const searchParams = new URLSearchParams(location.search);
    const idParam = searchParams.get('id');
    const isEdicaoParam = searchParams.get('isEdicao');

    const [formValues, setFormValues] = useState(
        {
            nome: '',
            cargo: '',
            salario: '',
            dataAdmissao: '',
            imagemUsuario: null
        }
    )

    function handleSubmit(event){
        event.preventDefault();

        if(isFormInvalido(formValues)){
            return;
        }

        const formData = new FormData();
        formData.append("nome", formValues.nome);
        formData.append("cargo", formValues.cargo);
        formData.append("salario", formValues.salario);
        formData.append("dataAdmissao", formValues.dataAdmissao);
        
        if (formValues.imagemUsuario) {
            formData.append("imagemUsuario", formValues.imagemUsuario);
        }

        const urlRequest = isEdicaoParam 
                ? `/api/funcionario/${idParam}`
                : '/api/funcionario';
        
        const httpMethod = isEdicaoParam ? 'PUT' : 'POST';

        fetch(urlRequest,
            {
                method: httpMethod,
                body: formData,
                credentials: "include",
            }
        )
        .then((response) => {
            if(response.status === 200){

                isEdicaoParam ? setAlterarSucesso(true) : setCadastroSucesso(true);

                setTimeout(() => {
                    navigate('/funcionarios');
                }, 3000)
            }
            else if(response.status === 403){
                alert('Usuário não autorizado!')
            }
            else{
                alert('Erro ao realizar operação, tente novamente mais tarde.');
            }
        })
        .catch(() => {
            alert('Erro ao realizar operação, tente novamente mais tarde.');
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
        if(/^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ\s'-]{3,40}$/.test(nome)){
            setNomeInvalido(false);
            return false;
        }

        setNomeInvalido(true);
        return true;
    }

    function isCargoInvalido(cargo){
        if(/^(?=.*[A-Za-zÀ-ÿ])[A-Za-zÀ-ÿ\s'-.]{5,40}$/.test(cargo)){
            setCargoInvalido(false);
            return false;
        }

        setCargoInvalido(true);
        return true;
    }

    function isSalarioInvalido(salario){
        if(/^\d+(\.\d{1,2})?$/.test(salario)){
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

    // eslint-disable-next-line no-unused-vars
    function onChangeSalary(e, originalValue, maskedValue){
        e.preventDefault();

        setFormValues({...formValues, [e.target.name]: originalValue});
    }

    function goToFuncionarios(){
        navigate('/funcionarios');
    }

    function handleFileChange(event){
        const file = event.target.files[0];
        if (file) {
            setFormValues({...formValues, imagemUsuario: file})
            setPreviewImageUrl(URL.createObjectURL(file));
        }
    }

    useEffect(() => {
        if(isEdicaoParam && idParam){
            fetch(`/api/funcionario/${idParam}`, {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(funcionario => {
                if(funcionario.caminhoImagemPerfil){
                    setPreviewImageUrl(getPathImagemFuncionario(funcionario.caminhoImagemPerfil))
                }
                setFormValues({
                    nome: funcionario.nome,
                    cargo: funcionario.cargo,
                    salario: funcionario.salario,
                    dataAdmissao: funcionario.dataAdmissao,
                    funcionarioImage: funcionario.caminhoImagemPerfil || null
                })
            })
            .catch(err => console.log(err));
        }
    }, [idParam, isEdicaoParam]);

    function getPathImagemFuncionario(caminhoImagemPerfil){
        return `http://localhost:8080/funcionario/imagem/${caminhoImagemPerfil}`;
    }

    return (
        <div className="w-[100%] min-h-screen bg-gradient-to-br bg-cover from-blue-900 to-blue-400 flex flex-col items-center pb-5">
            <Header/>
            
            {cadastroSucesso && <Mensagem texto={'Funcionário cadastrado com sucesso! Retornando para o menu principal...'}/>}
            {alterarSucesso && <Mensagem texto={'Funcionário alterado com sucesso! Retornando para o menu principal...'}/>}

            <div className="sm:w-[70%] w-[90%] pt-24">
                <div className="flex flex-row items-center gap-3">
                    <button onClick={goToFuncionarios} className="flex flex-row items-center justify-center gap-2 rounded-md text-white bg-[#033868] px-4 py-2 hover:cursor-pointer">
                        <ArrowLeftIcon/>
                        <span>Voltar</span>
                    </button>
                    {!isEdicaoParam && <h1 className="text-xl sm:text-3xl text-white">Cadastrar Funcionário</h1>}
                    {isEdicaoParam && <h1 className="text-xl sm:text-3xl text-white">Editar Funcionário</h1>}
                </div>
                <form method="post" onSubmit={handleSubmit} className="w-[100%] flex bg-white mt-5 rounded-lg">
                    <div className="relative group w-[30%] lg:w-[20%] bg-gray-200 rounded-l-lg flex items-center justify-center overflow-hidden">
                        {previewImageUrl ? (
                                <div alt="Preview imagem do usuário" 
                                style={{'--preview-url': `url(${previewImageUrl}`}}
                                className={`bg-[image:var(--preview-url)] bg-center bg-no-repeat bg-cover w-full h-full object-cover`}></div>
                            ) : (
                                <UserRoundIcon size={100} className="z-10"/>
                        )}
                        <div className="absolute inset-0 bg-gray-400 bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                            <PlusIcon size={60} className="text-white" />
                        </div>

                        <input
                            type="file"
                            name="userImage"
                            accept="image/*"
                            className="absolute inset-0 opacity-0 cursor-pointer z-30"
                            onChange={handleFileChange} // Lide com o arquivo aqui
                        />
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
                        <CurrencyInput name="salario" placeholder="Salario" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"
                        onChangeValue={onChangeSalary} defaultValue={formValues.salario} required/>
                        {salarioInvalido && <span className="font-medium text-red-600 text-sm">O salário só pode conter números e não ser negativo.</span>}

                        <label className="pt-5">Data Admissão</label>
                        <input type="date" name="dataAdmissao" 
                        className="border border-gray-400 w-[100%] sm:w-[100%] p-2"
                        onChange={onChange} value={formValues.dataAdmissao} required/>
                        {dataInvalida && <span className="font-medium text-red-600 text-sm">A data não pode ser anterior a 1900 e nem no futuro.</span>}

                        <div className="flex justify-end items-center gap-5 pt-3">
                            <button className="text-red-700 font-semibold hover:cursor-pointer">Limpar</button>
                            {!isEdicaoParam && <button className="py-2 px-3 text-white bg-blue-500 rounded-lg hover:cursor-pointer" type="submit">Cadastrar</button>}
                            {isEdicaoParam && <button className="py-2 px-3 text-white bg-blue-500 rounded-lg hover:cursor-pointer" type="submit">Alterar</button>}
                        </div>
                    </div>

                    <div className="bg-[url('./assets/cadastro.png')] bg-cover bg-no-repeat lg:bg-center hidden lg:block w-[35%]"></div>
                </form>
            </div>
        </div>
    )
}

export default CadastroFuncionario;