function Mensagem({texto}){
    return (
        <div className="bg-green-500 text-white max-w-[90%] md:max-w-[70%] absolute px-9 py-2 md:py-5 lg:text-xl text-md border-2 rounded-md 
                        border-green-700 top-20 md:top-22">
            <span>{texto}</span>
        </div>
    )
}

export default Mensagem;