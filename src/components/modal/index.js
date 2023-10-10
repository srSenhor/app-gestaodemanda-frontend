export default function Modal({isOpen, setOpenModal, children}){


    if (isOpen) {
        return (
            <div className="fixed top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center">
                <div className="fixed top-0 bottom-0 left-0 right-0 z-20 bg-black bg-opacity-70"></div>
                <div className="bg-white w-[70rem] max-w-full rounded-lg overflow-hidden z-30">
                <div className="bg-[#9A5330] p-6 rounded-t-lg relative">
                    <img
                    onClick={() => setOpenModal(false)}
                    src="../images/close3.svg"
                    alt="fechar"
                    className="absolute w-8 h-8 cursor-pointer top-2 right-2"
                    />
                </div>
                <div className="p-2 bg-white rounded-b-lg">{children}</div>
                </div>
            </div>
        );
    }

    return null;
}