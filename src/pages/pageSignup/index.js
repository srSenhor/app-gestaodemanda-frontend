import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"


export default function PageSignup(){

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

    useEffect( () => {
        document.title = `Signup: Dev4U()`
    }, [])
    
    return(
        <div className="fixed top-0 left-0 flex w-full h-screen overflow-y-hidden bg-red-950">
            <div className="flex flex-grow flex-shrink w-1/2 max-h-screen overflow-y-auto bg-white">
                <form className="px-20 py-10 mx-auto ">
                    <img src='../images/logo.png' alt='logo' className="mb-5"/>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Nome</label>
                            <input type="text" name="nome" placeholder="Insira seu nome completo aqui" className="w-full h-10 px-4 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">E-mail</label>
                            <input type="text" name="nome" placeholder="Insira seu melhor e-mail aqui" className="w-full h-10 px-4 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Confirme seu e-mail</label>
                            <input type="text" name="nome" placeholder="Confirme seu e-mail" className="w-full h-10 px-4 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Contato</label>
                            <input type="text" name="nome" placeholder="Insira um número de telefone ou e-mail aqui" className="w-full h-10 px-4 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="flex items-center w-3/4 my-3 mx-2/5">
                        <select onChange={ (e) => { changeType(e.target.value) }} className="w-3/5 h-10 px-2 bg-white border rounded-lg border-red-950 text-red-950">
                            <option>Cliente</option>
                            <option>Avaliador</option>
                            <option>Desenvolvedor</option>
                        </select>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Senha</label>
                            <input type="password" name="password" placeholder="Insira uma senha forte aqui"  className="w-full h-10 px-4 mb-5 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="mb-2">
                        <div className="flex flex-col">
                            <label className="block ml-4 text-lg text-red-950">Confirme sua senha</label>
                            <input type="password" name="password" placeholder="Confirme sua senha"  className="w-full h-10 px-4 mb-5 text-base border border-solid border-red-950 rounded-2xl"/>
                        </div>
                    </div>

                    <div className="flex justify-center mt-20">
                        <button onClick={validate} className="w-1/2 h-10 mr-10 text-white border border-solid cursor-pointer border-red-950 rounded-2xl bg-red-950">Cadastrar</button>
                        <button onClick={gotoLogin} className="w-1/2 h-10 ml-10 bg-white border border-solid cursor-pointer border-red-950 rounded-2xl text-red-950">Voltar</button>
                    </div>
                </form>
            </div>
            <div className="flex justify-center">
                <img src='../images/login.png' alt='Imagem de pessoas conversando' className="object-cover w-full h-auto min-w-full "/>
            </div>
        </div>
    )
}
