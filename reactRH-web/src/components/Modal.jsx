function Modal({onSubmit, onCancel, nome}){
    return (
        <>
            <div className="fixed inset-0 bg-black opacity-40 z-40 flex items-center justify-center"/>
            <div className="flex fixed inset-0 items-center justify-center z-50">
                <div className="bg-white px-6 py-3 rounded-lg shadow-lg max-w-md">
                    <h1 className="font-bold">Deletar funcionário</h1>
                    <p className="py-5">Deseja deletar o funcionário <span className="font-semibold">{nome}</span>?</p>

                    <div className="flex justify-end gap-4">
                        <button className="hover:cursor-pointer font-semibold text-red-600" onClick={onCancel}>Cancelar</button>
                        <button className="hover:cursor-pointer bg-red-600 text-white px-2 py-1 border-none rounded-md" onClick={onSubmit}>Deletar</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Modal;