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
        <div className="flex top-0 left-0 fixed w-full bg-red-950">
            <div className="flex  flex-grow flex-shrink w-3/5 bg-white">
                <form className="py-10 px-20 mx-auto">
                    <img src='../images/logo.png' alt='logo' className="mb-5"/>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Nome</label>
                            <input type="text" name="nome" placeholder="Insira seu nome completo aqui" className="border border-solid border-red-950 rounded-2xl h-10 w-full text-base px-4"/>
                        </div>
                    </div>

                    <div className="mb-10">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Senha</label>
                            <input type="password" name="password" placeholder="Insira a sua senha aqui"  className="border border-solid border-red-950 rounded-2xl h-10 w-full mb-5 text-base px-4"/>
                        </div>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button onClick={validate} className="w-1/2 h-10 border border-solid border-red-950 rounded-2xl cursor-pointer mr-10 bg-red-950 text-white">Login</button>
                        <button onClick={gotoHome} className="w-1/2 h-10 border border-solid border-red-950 rounded-2xl cursor-pointer ml-10 bg-white text-red-950">Cancelar</button>
                    </div>
                    <div className="text-black flex justify-center mt-5">
                        <p>Ainda não possui uma conta? <Link to='/signup' className="text-blue-500 underline">Cadastre-se aqui!</Link></p>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <img src='../images/login.png' alt='Imagem de pessoas conversando' className="min-w-full object-cover"/>
            </div>
        </div>
    )
}