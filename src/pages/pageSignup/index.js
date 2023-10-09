import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export default function PageSignup(){

    useEffect( () => {
        document.title = `Signup: Dev4U()`
    }, [])

    const navigate = useNavigate();
    const [userType, setUserType] = useState(0);

    const validate = (event) => {
        event.preventDefault();
        
        let inputs = document.getElementsByTagName('input');
        let user = {
            'name': inputs[0].value,
            'email': inputs[1].value,
            'phone': inputs[3].value,
            'pass': inputs[5].value,
        }

        axios({
            method: 'POST',
            url: `http://localhost:8080/api/usuario`,
            data: {
                nome: user.name,
                email: user.email,
                contato: user.phone,
                senha: user.pass,
                tipoUsuario: userType
            }
        }).then( response => {
            alert('Cadastro realizado com sucesso!')
            gotoMain(response)
        }).catch(
            error => { console.log(error) }
        )
    }

    const changeType = ( type ) => {
        switch(type){
            case 'Cliente':
                setUserType(0)
                break;
            case 'Avaliador':
                setUserType(1)
                break;
            case 'Desenvolvedor':
                setUserType(2)
                break;
            default:
                setUserType(0)
        }
    }

    const gotoMain = (response) => {
        navigate('/main', {state: {user: response.data}})
    }

    const gotoLogin = () => {
        navigate('/login')
    }

    return(
        <div className="flex top-0 left-0 fixed w-full bg-red-950 overflow-y-hidden h-screen">
            <div className="flex  flex-grow flex-shrink w-1/2 bg-white max-h-screen overflow-y-auto">
                <form className="py-10 px-20 mx-auto ">
                    <img src='../images/logo.png' alt='logo' className="mb-5"/>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Nome</label>
                            <input type="text" name="nome" placeholder="Insira seu nome completo aqui" className="border border-solid border-red-950 rounded-2xl h-10 w-full text-base px-4"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">E-mail</label>
                            <input type="text" name="nome" placeholder="Insira seu melhor e-mail aqui" className="border border-solid border-red-950 rounded-2xl h-10 w-full text-base px-4"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Confirme seu e-mail</label>
                            <input type="text" name="nome" placeholder="Confirme seu e-mail" className="border border-solid border-red-950 rounded-2xl h-10 w-full text-base px-4"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Contato</label>
                            <input type="text" name="nome" placeholder="Insira um número de telefone ou e-mail aqui" className="border border-solid border-red-950 rounded-2xl h-10 w-full text-base px-4"/>
                        </div>
                    </div>

                    <div className="flex w-3/4 items-center my-3 mx-2/5">
                        <select onChange={ (e) => { changeType(e.target.value) }} className="border border-red-950 rounded-lg px-2 w-3/5 h-10 text-red-950 bg-white">
                            <option>Cliente</option>
                            <option>Avaliador</option>
                            <option>Desenvolvedor</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Senha</label>
                            <input type="password" name="password" placeholder="Insira uma senha forte aqui"  className="border border-solid border-red-950 rounded-2xl h-10 w-full mb-5 text-base px-4"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block text-red-950 text-lg ml-4">Confirme sua senha</label>
                            <input type="password" name="password" placeholder="Confirme sua senha"  className="border border-solid border-red-950 rounded-2xl h-10 w-full mb-5 text-base px-4"/>
                        </div>
                    </div>

                    <div className="mt-20 flex justify-center">
                        <button onClick={validate} className="w-1/2 h-10 border border-solid border-red-950 rounded-2xl cursor-pointer mr-10 bg-red-950 text-white">Cadastrar</button>
                        <button onClick={gotoLogin} className="w-1/2 h-10 border border-solid border-red-950 rounded-2xl cursor-pointer ml-10 bg-white text-red-950">Voltar</button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <img src='../images/login.png' alt='Imagem de pessoas conversando' className="w-full h-auto min-w-full object-cover "/>
            </div>
        </div>
    )
}
