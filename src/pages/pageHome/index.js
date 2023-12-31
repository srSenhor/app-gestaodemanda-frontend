import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function PageHome(){

    const navigate = useNavigate();
    const gotoLogin = () => {
        navigate('/login');
    }

    useEffect( () => {
        document.title = `Home: Dev4U()`;
    }, [])

    return(
        <div>
            <div className='flex items-center justify-end h-20 bg-gray-200 min-w-screen'>
                <Link to = '/'/>
                <button onClick={gotoLogin} className="flex px-8 py-3 m-1 text-lg text-white bg-red-900 border-none rounded-lg cursor-pointer">Fazer login</button>
            </div>
            <div className="mx-12 my-12">
                <h1 className="my-2 text-3xl font-bold">Quem somos? </h1>
                <p className="text-justify">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget pretium neque. Pellentesque laoreet vel lacus eget tristique. Morbi laoreet nisi quis diam malesuada viverra. Aliquam in ex eu mi venenatis rhoncus. Donec laoreet arcu eros, at interdum massa pharetra id. Sed vehicula et magna in tincidunt. Integer vel dapibus metus, eu faucibus dui.
    Integer sed nibh sit amet urna vulputate mollis. Nam aliquet aliquam blandit. Sed pharetra interdum vestibulum. Nulla quis sapien non mauris efficitur laoreet. Suspendisse fermentum volutpat arcu, eget porta lorem pulvinar sit amet. Integer a turpis nunc. </p>
                <h1 className="my-2 text-3xl font-bold">Mais coisas</h1>
                <p className="text-justify"> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget pretium neque. Pellentesque laoreet vel lacus eget tristique. Morbi laoreet nisi quis diam malesuada viverra. Aliquam in ex eu mi venenatis rhoncus. Donec laoreet arcu eros, at interdum massa pharetra id. Sed vehicula et magna in tincidunt. Integer vel dapibus metus, eu faucibus dui.
    Integer sed nibh sit amet urna vulputate mollis. Nam aliquet aliquam blandit. Sed pharetra interdum vestibulum. Nulla quis sapien non mauris efficitur laoreet. Suspendisse fermentum volutpat arcu, eget porta lorem pulvinar sit amet. Integer a turpis nunc. </p>
            </div>
        </div>
    )
}