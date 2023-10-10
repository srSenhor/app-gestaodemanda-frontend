import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function PageLogin() {

    useEffect( () => {
        document.title = `Login: Dev4U()`;
    }, [])

    const navigate = useNavigate();

    const setCredentials = (name) => {        
        axios({
            method: 'GET',
            url:`http://localhost:8080/api/usuario/${name}` 
        }).then( response => {
            gotoMain(response)
        }).catch(
            error => { console.log(error) }
        )
    }

    const validate = (event) => {
        event.preventDefault();
        
        let inputs = document.getElementsByTagName('input')
        let user = {
            'name': inputs[0].value,
            'pass': inputs[1].value
        }

        axios({ 
            method: "POST",
            url: `http://localhost:8080/api/login`,
            data: {
                nome: user.name,
                senha: user.pass
            }
        }).then( response => {
            axios.defaults.headers.common.Authorization = response.headers.getAuthorization()
            setCredentials(user.name)
        }).catch(error => console.log(error))  
    }
    
    const gotoMain = (response) => {
        navigate('/main', {state: {user: response.data}})
    }

    const gotoHome = () => {
        navigate('/')
    }

    return(
        <div className="fixed top-0 left-0 flex w-full bg-red-950">
            <div className="flex flex-grow flex-shrink w-3/5 bg-white">
                <form className="px-20 py-10 mx-auto">
                    <img src='../images/logo.png' alt='logo' className="mb-5"/>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Nome</label>
                            <input type="text" name="nome" placeholder="Insira seu nome completo aqui" className="w-full h-10 px-4 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Senha</label>
                            <input type="password" name="password" placeholder="Insira a sua senha aqui"  className="w-full h-10 px-4 mb-5 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="flex justify-center mt-20">
                        <button onClick={validate} className="w-1/2 h-10 mr-10 text-white border border-solid cursor-pointer border-red-950 rounded-2xl bg-red-950">Login</button>
                        <button onClick={gotoHome} className="w-1/2 h-10 ml-10 bg-white border border-solid cursor-pointer border-red-950 rounded-2xl text-red-950">Cancelar</button>
                    </div>
                    <div className="flex justify-center mt-5 text-black">
                        <p>Ainda não possui uma conta? <Link to='/signup' className="text-blue-500 underline">Cadastre-se aqui!</Link></p>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <img src='../images/login.png' alt='Imagem de pessoas conversando' className="object-cover min-w-full"/>
            </div>
        </div>
    )
}