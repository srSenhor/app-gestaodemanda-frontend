import { useEffect, useState } from "react";

export default function Demanda(props) {
    const title = props.title;
    const notes = props.notes;

    const [isModalOpen, setIsModalOpen] = useState(0);

    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };
    

  //TODO: fazer um componente para o modal que vai ser chamado em cada botão
    return (    
        <div className="relative border border-gray-400 border-solid rounded-xl w-1/5 max-w-2/5 min-h-[18vh] m-2 overflow-hidden">
            <p className="w-full max-w-full p-1 font-bold truncate">{title}</p>
            <p className="w-full max-w-full p-1 font-light truncate">Detalhes: {notes}</p>
            <div className="absolute bottom-0 w-full">
                <button onClick={openModal} className="w-full py-2 font-bold text-white bg-red-700 border-none cursor-pointer rounded-b-xl max-h-20">Ver detalhes</button>
            </div>
        </div>
    );
}
