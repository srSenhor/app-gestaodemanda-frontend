import { useEffect, useState } from "react";
import Modal from "../modal";
import axios from "axios";

export default function Demanda(props) {

    const [isOpen, setModalOpen] = useState(false);
    const [priority, setPriority] = useState(['Baixa', 'Média', 'Alta']);
    const [devs, setDevs] = useState([]);
    const [selectedDev, setSelectedDev] = useState();
    
    const changePriority = (priority) => {
        switch (priority) {
            case 'Baixa':
                setPriority(0);
                break;
            case 'Média':
                setPriority(1);
                break;
            case 'Alta':
                setPriority(2);
                break;
            default:
                setPriority(0);
                break;
        }
    }

    const changeSelectedDev = (dev) => {
        setSelectedDev(dev)
    }

    const getDevs = () => {
        axios({
            method: 'GET',
            url: 'http://localhost:8080/api/usuario/devs'
        }).then( response => {
            setDevs(response.data)
            console.log('teste')
        }).catch( error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else {
                console.error('Erro na solicitação:', error.message);
            }
        })
    }

    const placeholder = () => {
        alert('Essa função ainda não foi implementada. \nAguarde atualizações!!!')
    }

    const sendDem = () => {
        let uuid

        for (const x of devs) {
            if (x.email === selectedDev) {
                uuid = x.uuid
            }
        }

        axios({
            method: 'put',
            url: 'http://localhost:8080/api/demanda',
            data: {
                uuid: props.data.uuid,
                uuidDev: uuid,
                dataEncerramento: "À definir",
                prioridade: priority,
                situacao: 1,
                prazo: 0
            }
        }).then( response => {
            setModalOpen(false)
            alert('Encaminhado com sucesso para ' + selectedDev)
        }).catch( error => {
            if (error.response) {
                console.log(error.response.data);
                console.log(error.response.status);
            } else {
                console.error('Erro na solicitação:', error.message);
            }
        })
    }

    const finishDem = (status) => {
        axios({
            method: 'PUT',
            url: 'http://localhost:8080/api/demanda/concluir',
            data: {
                uuid: props.data.uuid,
                situacao: status
            }
        }).then( response => {
            setModalOpen(false);
            alert('Demanda deferida!')
        }).catch( error => console.log( error ))
    }

    const openModal = () => {
        setModalOpen(true);
    };
    
    useEffect( () => {
        getDevs()
    },[])

    switch (props.userType) {
        case 0:
            return (    
                <div className="relative border border-gray-400 border-solid rounded-xl w-1/5 max-w-2/5 min-h-[18vh] m-2 overflow-hidden">
                    <p className="w-full max-w-full p-2 font-bold truncate">{props.data.titulo}</p>
                    <p className="w-full max-w-full p-2 font-light truncate">Detalhes: {props.data.descricao}</p>
                    <div className="absolute bottom-0 w-full">
                        <button onClick={openModal} className="w-full py-1 font-bold text-white bg-red-700 border-none cursor-pointer rounded-b-xl max-h-20">Ver detalhes</button>
                    </div>
        
                    {/* Modal detalhes */}
                    <Modal isOpen={isOpen} setOpenModal={setModalOpen}>
                        <div className="flex flex-col justify-between p-5 h-[calc(100% - 3rem)]">
                            <div>
                            <div className="flex flex-row mb-1 text-lg font-bold">
                                    Nome do produto: <div className="px-1 text-xl font-light">{props.data.titulo}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold">
                                    Descrição: <div className="px-1 text-xl font-light">{props.data.descricao}</div>    
                                </div>
                                <div className="flex flex-row mb-1 text-lg font-bold">
                                    Status: <div className="px-1 text-xl font-light">{props.data.situacao}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold text-red-600">
                                    Prioridade: <div className="px-1 text-xl font-light">{props.data.prioridade}</div>    
                                </div>
                                <div className="flex flex-row text-lg font-bold">
                                    Criado em: <div className="px-1 text-xl font-light">{props.data.dataCriacao}</div>    
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col justify-end w-full p-4 text-lg font-bold">
                            <div className="flex flex-col items-center w-1/6 ml-auto text-2xl font-bold text-red-600">
                                Prazo<div className="px-1 text-xl font-light">{props.data.prazo} dias</div>    
                            </div>
                            <button onClick={placeholder} className="cursor-pointer h-12 w-1/6 border-none rounded-2 bg-[#329A97] text-white text-base font-bold self-end ">Contatar cliente</button>
                        </div>
                    </Modal>
                </div>
            );
        case 1:
            return (    
                <div className="relative border border-gray-400 border-solid rounded-xl w-1/5 max-w-2/5 min-h-[18vh] m-2 overflow-hidden">
                    <p className="w-full max-w-full p-2 font-bold truncate">{props.data.titulo}</p>
                    <p className="w-full max-w-full p-2 font-light truncate">Detalhes: {props.data.descricao}</p>
                    <div className="absolute bottom-0 w-full">
                        <button onClick={openModal} className="w-full py-1 font-bold text-white bg-red-700 border-none cursor-pointer rounded-b-xl max-h-20">Ver detalhes</button>
                    </div>
        
                    {/* Modal detalhes */}
                    <Modal isOpen={isOpen} setOpenModal={setModalOpen}>
                        <div className="flex flex-col justify-between p-5 h-[calc(100% - 3rem)]">
                            <div>
                                <div className="flex flex-row mb-1 text-lg font-bold">
                                    Nome do produto: <div className="px-1 text-xl font-light">{props.data.titulo}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold">
                                    Descrição: <div className="px-1 text-xl font-light">{props.data.descricao}</div>    
                                </div>
                                <div className="flex flex-row mb-1 text-lg font-bold">
                                    Status: <div className="px-1 text-xl font-light">{props.data.situacao}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold text-red-600">
                                    Prioridade: <div className="px-1 text-xl font-light">{props.data.prioridade}</div>    
                                </div>
                                <div className="flex flex-row text-lg font-bold">
                                    Criado em: <div className="px-1 text-xl font-light">{props.data.dataCriacao}</div>    
                                </div>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="flex items-center w-5/6">
                                <select onChange={ (e) => { changeSelectedDev(e.target.value) }} className="w-3/5 h-10 px-2 bg-white border rounded-lg border-red-950 text-red-950">
                                    {devs.map((dev, index)=>{
                                        return(
                                            <option key={index}>{dev.email}</option>
                                        )
                                    })} 
                                </select>
                            </div>    
                            <div className="flex flex-col justify-end w-full p-4 text-lg font-bold ">
                                <div className="flex flex-col items-center w-1/6 ml-auto text-2xl font-bold text-red-600">
                                    Prazo<div className="px-1 text-xl font-light">{props.data.prazo} dias</div>    
                                </div>
                                <button onClick={finishDem} className="mb-1 cursor-pointer h-12 w-2/6 border-none rounded-lg bg-[#329A97] text-white text-base font-bold self-end ">Deferir demanda</button>
                                <button onClick={sendDem} className="cursor-pointer h-12 w-2/6 border-none rounded-lg bg-[#329A97] text-white text-base font-bold self-end ">Encaminhar demanda</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        case 2:
            return (    
                <div className="relative border border-gray-400 border-solid rounded-xl w-1/5 max-w-2/5 min-h-[18vh] m-2 overflow-hidden">
                    <p className="w-full max-w-full p-2 font-bold truncate">{props.data.titulo}</p>
                    <p className="w-full max-w-full p-2 font-light truncate">Detalhes: {props.data.descricao}</p>
                    <div className="absolute bottom-0 w-full">
                        <button onClick={openModal} className="w-full py-1 font-bold text-white bg-red-700 border-none cursor-pointer rounded-b-xl max-h-20">Ver detalhes</button>
                    </div>
        
                    {/* Modal detalhes */}
                    <Modal isOpen={isOpen} setOpenModal={setModalOpen}>
                        <div className="flex flex-col justify-between p-5 h-[calc(100% - 3rem)]">
                            <div>
                                <div className="flex flex-row mb-1 text-lg font-bold">
                                    Nome do produto: <div className="px-1 text-xl font-light">{props.data.titulo}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold">
                                    Descrição: <div className="px-1 text-xl font-light">{props.data.descricao}</div>    
                                </div>
                                <div className="flex flex-row mb-1 text-lg font-bold">
                                    Status: <div className="px-1 text-xl font-light">{props.data.situacao}</div>    
                                </div>
                                <div className="flex flex-row mb-5 text-lg font-bold text-red-600">
                                    Prioridade: <div className="px-1 text-xl font-light">{props.data.prioridade}</div>    
                                </div>
                                <div className="flex flex-row text-lg font-bold">
                                    Criado em: <div className="px-1 text-xl font-light">{props.data.dataCriacao}</div>    
                                </div>
                            </div>
                        </div>
                        <div className="flex ">
                            <div className="flex items-center w-5/6">
                                <select onChange={ (e) => { changeSelectedDev(e.target.value) }} className="w-3/5 h-10 px-2 bg-white border rounded-lg border-red-950 text-red-950">
                                    {devs.map((dev, index)=>{
                                        return(
                                            <option key={index}>{dev.email}</option>
                                        )
                                    })} 
                                </select>
                            </div>    
                            <div className="flex flex-col justify-end w-full p-4 text-lg font-bold ">
                                <div className="flex flex-col items-center w-1/6 ml-auto text-2xl font-bold text-red-600">
                                    Prazo<div className="px-1 text-xl font-light">{props.data.prazo} dias</div>    
                                </div>
                                <button onClick={finishDem} className="mb-1 cursor-pointer h-12 w-2/6 border-none rounded-lg bg-[#329A97] text-white text-base font-bold self-end ">Deferir demanda</button>
                                <button onClick={sendDem} className="cursor-pointer h-12 w-2/6 border-none rounded-lg bg-[#329A97] text-white text-base font-bold self-end ">Encaminhar demanda</button>
                            </div>
                        </div>
                    </Modal>
                </div>
            );
        default:
            return (
                <>Tem nada aqui</>
            );
    }
}
