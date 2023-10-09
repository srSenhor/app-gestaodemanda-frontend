import { useEffect, useState } from "react"
import { Link, useLocation } from "react-router-dom"
import axios from "axios"
import Demanda from "../../components/demanda";

/*const prod = [
    {title:'Software de Atendimento', notes:'Tá indo'},
    {title:'Software de Balanceamento', notes:'Tá indo'},
    {title:'Produto sem nome', notes:'Tá indo'},
    {title:'Programa de receitas', notes:'Tá indo'},
    {title:'Produto sem nome', notes:'Tá indo'},
    {title:'Produto sem nome', notes:'Tá indo'},
    {title:'Software 5', notes:'Tá indo'},
    {title:'Software 6', notes:'Tá indo'},
    {title:'Software 7', notes:'Tá indo'},
    {title:'Software 8', notes:'Tá indo'},
    {title:'Software 9', notes:'Tá indo'},
    {title:'Software 39', notes:'Tá indo'},
];*/

export default function PageMain(){

    useEffect( () => {
        document.title = `Dev4U()`
        loadDems()
    }, [])

    const location = useLocation();
    const [user, setUser] = useState(location.state.user);
    const [dems, setDems] = useState([]);
    const [count, setCount] = useState();
    const [regDem, setRegDem] = useState(false);
    const [regTask, setRegTask] = useState(false);
    const demsPerRow = 5;

    const loadDems = () => {
        let url

        switch (user.tipoUsuario) {
            case 0:
                url = `http://localhost:8080/api/demanda/cliente/${user.uuid}`;
                break;
            case 1:
                url = `http://localhost:8080/api/demanda/emAnalise`;
                break;
            case 2:
                url = `http://localhost:8080/api/demanda/dev/${user.uuid}`;
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

    const demsGroups = [];
    for (let i = 0; i < dems.length; i += demsPerRow) {
        demsGroups.push(dems.slice(i, i + demsPerRow));
    }


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
                                title={demanda.titulo}
                                notes={demanda.descricao}
                            />
                        ))}
                    </div>
                ))}
            </div>

            <div className="flex justify-center h-[50vh] p-20">
                {user.tipoUsuario}
            </div>
            <div className="fixed bottom-2 right-3">
                <div className="w-16 h-16 p-1 bg-red-900 border border-red-900 border-solid rounded-full cursor-pointer">
                    <img
                    onClick={buttonService}
                    src="../images/dem.svg"
                    alt="botao criar"
                    className="object-cover w-full h-full"
                    />
                </div>
            </div>

            {/* Aqui vão os modais */}
        </div>
    );
}