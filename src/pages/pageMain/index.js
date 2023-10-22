import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import Demanda from "../../components/demanda";
import Modal from "../../components/modal";

const URL_BASE = 'http://localhost:8080'

export default function PageMain(){

    const location = useLocation();
    const [user, setUser] = useState(location.state.user);
    const [dems, setDems] = useState([]);
    const [selectedDem, setSelectedDem] = useState();
    const [regDem, setRegDem] = useState(false);
    const [regTask, setRegTask] = useState(false);
    const demsPerRow = 5;

    const createDem = () => {
        document.addEventListener('DOMContentLoaded', () => {
            let dd = new Date().getDay();
            let mm = new Date().getMonth();
            let aaaa = new Date().getFullYear();
    
            let dem = {
                'title': document.getElementById('title').value,
                'desc': document.getElementById('desc').value,
                'date': `${dd}/${mm}/${aaaa}`
            }
    
            axios({
                method: 'POST',
                url: `${URL_BASE}/api/demanda`,
                data:{
                    titulo: dem.title,
                    descricao: dem.desc,
                    uuidCliente: user.uuidcliente,
                    dataCriacao: dem.date
                }
            }).then(response => {
                setRegDem(false)
                console.log(response.data)
            }).catch( error => {
                if (error.response) {
                    console.log(error.response.data);
                    console.log(error.response.status);
                } else {
                    console.error('Erro na solicitação:', error.message);
                }
            })
        })
    }

    const buttonService = () => {
        if (user.tipoUsuario === 0) {
            setRegDem(true);
            console.log('coisa do cliente')
        } else if(user.tipoUsuario === 2){
            setRegTask(true);
            console.log('coisa do desenvolvedor')
        } else {
            console.log('coisa do avaliador')
        }
    }

    const changeSelectedDem = (dem) => {
        setSelectedDem(dem)
    }

    const demsGroups = [];
    for (let i = 0; i < dems.length; i += demsPerRow) {
        demsGroups.push(dems.slice(i, i + demsPerRow));
    }

    useEffect( () => {
        document.title = `Dev4U()`
        const loadDems = () => {
            let url
    
            switch (user.tipoUsuario) {
                case 0:
                    url = `${URL_BASE}/api/demanda/cliente/${user.uuid}`;
                    break;
                case 1:
                    url = `${URL_BASE}/api/demanda/emAnalise`;
                    break;
                case 2:
                    url = `${URL_BASE}/api/demanda/dev/${user.uuid}`;
                    break;
                default:
                    break;
            }
    
            axios({
                method: 'GET',
                headers: {
                    "Content-Type":"application/json; charset=UTF-8",
                },
                url: url,
            }).then( response => {
                if( user.tipoUsuario === 2 ){
                    let filtrDems = []
    
                    for (let x of response.data) {
                        if (x.situacao === 1) {
                            filtrDems.push(x)
                        }
                    }
                    
                    setDems(filtrDems)
                } else {
                    setDems(response.data)
                }
            }).catch( error => console.log(error) )
        }
        loadDems();
    }, [user])

    return (
        <div>
            <div className="flex items-center justify-end h-20 bg-gray-200 min-w-screen">
            <div className="flex w-11/12 ml-4">
                <Link to="/">
                <img
                    src="../images/exit.png"
                    alt="logout"
                    className="max-h-1/6"
                ></img>
                </Link>
            </div>

            <p>{user.nome}</p>

            <div className="relative h-20 max-w-10vh">
                <img
                src="../images/profile_picture.png"
                alt="foto de perfil default"
                className="h-full"
                />
            </div>
            </div>

            <div className="p-20 h-1/6">
                {demsGroups.map((grupo, index) => (
                    <div key={index} className="flex justify-center mb-5">
                        {grupo.map((demanda, subIndex) => (
                            <Demanda
                                key={subIndex}
                                data={demanda}
                                userType={user.tipoUsuario}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-center h-[50vh] p-20">
                {user.tipoUsuario}
            </div>
            <div className="fixed bottom-2 right-3">
                <div className="p-1 bg-red-900 border border-red-900 border-solid rounded-full cursor-pointer w-14 h-14">
                    <img
                    onClick={buttonService}
                    src="../images/dem.svg"
                    alt="botao criar"
                    className="object-cover w-full h-full p-1 "
                    />
                </div>
            </div>

            {/* Modal demanda */}
            <Modal isOpen={regDem} setOpenModal={setRegDem}>
                <div className="flex justify-left">
                    <h1 className="mx-6 my-2 text-3xl font-bold">Criar demanda</h1>
                </div>
                <div className="flex flex-col justify-between p-10 h-[calc(100% - 3rem)]">
                    <div className="mb-10">
                        <label id="title-dem" className="text-xl font-bold text-[#9A5330]">Título</label>
                        <input id="title-dem" type="text" placeholder="Titulo do produto" className="border border-solid border-[#640D14] rounded-2xl h-40px w-full mb-10 p-2"/>
                        <label id="desc-dem" className="text-xl font-bold text-[#9A5330]">Descrição</label>
                        <textarea id="desc-dem" placeholder="Descrição do produto" className="border border-solid border-[#640D14] font-sans w-full h-48 p-2 rounded-2xl resize-none"/>
                    </div>
                    <button onClick={createDem} className="cursor-pointer h-12 w-1/6 border-none rounded-2 bg-[#329A97] text-white text-base font-bold self-end ">Cadastrar pedido</button>
                </div>
            </Modal>

            {/* Modal tarefa */}
            <Modal isOpen={regTask} setOpenModal={setRegTask}>
                <div className="flex justify-left">
                    <h1 className="mx-8 my-1 text-3xl font-bold">Criar tarefa</h1>
                </div>
                <div className="flex flex-col justify-between p-10 h-[calc(100% - 3rem)]">
                    <div className="flex flex-col w-3/6 mb-1">
                        <label id="produto" className="text-xl font-bold text-[#9A5330]">Produto</label>
                        <select id="produto" onChange={ (e) => { changeSelectedDem(e.target.value) }} className="w-3/5 h-10 px-2 bg-white border rounded-lg border-red-950 text-red-950">
                            {demsGroups.map((dem, index)=>{
                                return(
                                    <option key={index}>{dem.titulo}</option>
                                )
                            })} 
                        </select>
                    </div>    
                    <div className="mb-1">
                        <label id="title-dem" className="text-xl font-bold text-[#9A5330]">Nome da tarefa</label>
                        <input id="title-dem" type="text" placeholder="Titulo do produto" className="border border-solid border-[#640D14] rounded-2xl h-40px w-full mb-10 p-2"/>
                        <label id="desc-dem" className="text-xl font-bold text-[#9A5330]">Descrição</label>
                        <textarea id="desc-dem" placeholder="Descrição do produto" className="border border-solid border-[#640D14] font-sans w-full h-48 p-2 rounded-2xl resize-none"/>
                    </div>
                    <button onClick={() => {alert('Ainda não foi implementado.')}} className="cursor-pointer h-12 w-1/6 border-none rounded-2 bg-[#329A97] text-white text-base font-bold self-end ">Cadastrar tarefa</button>
                </div>
            </Modal>
        </div>
    );
}