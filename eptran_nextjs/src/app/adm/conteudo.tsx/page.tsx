import Image from "next/image"

export default function Suporte() {
  return (


<main className="bg-white">



    <header className="shadow-xl fixed w-full h-28 items-center z-50 bg-darkBlue-500 grid grid-cols-4">
        <div className="col-span-1 flex px-10">
            <a>
                <img className="w-28" src="../img/Logo Eptran.png" alt="Logo">
            </a>
        </div>
        <nav className="col-span-2 flex justify-center">
            <a href="../img/ensino.html"
                className="hover:underline relative text-lg text-white no-underline font-medium ml-10">Atividade</a>
            <a href="#"
                className="hover:underline relative text-lg text-white no-underline font-medium ml-10">Conquistas</a>
            <a href="../img/sobrenos.html"
                className="hover:underline relative text-lg text-white no-underline font-medium ml-10">Sobre Nós</a>
            <a href="../img/faleConosco.html"
                className="hover:underline relative text-lg text-white no-underline font-medium ml-10">Fale Conosco</a>
            <a href="#"
                className="hover:underline relative text-lg text-white no-underline font-medium ml-10">Administrador</a>
        </nav>
        <div className="flex justify-end items-start col-span-1 px-5 ">
            <img className="w-12 mr-4" src="../img/circle-user-round.png" alt="Foto Perfil">
        </div>
    </header>

    <!-- Sidebar -->
    <aside className="sidebar fixed top-0 bottom-0 overflow-y-auto p-2 w-60 bg-darkBlue-600">
        <div className="px-4 mt-32 flex justify-center text-white font-bold text-3xl">
            <h1>
                Admin
            </h1>
        </div>
        <hr className="w-auto my-4 bg-white  rounded-sm">
        <div className="grid grid-cols-7 align-middle items-center">
            <img src="../img/book-text.png" className="w-5">
            <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl"><a href="#">Conteúdo</a></p>
            <img src="../img/video.png" className="w-5">
            <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl"><a href="#">Vídeos</a></p>
            <img src="../img/message-square-warning.png" className="w-5">
            <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl"><a href="#">Estatísticas</a></p>
            <img src="../img/user-round.png" className="w-5">
            <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl"><a href="#">Usuários</a></p>
            <img src="../img/tickets.png" className="w-5">
            <p className="text-white px-2 py-2 hover:underline col-span-6 text-xl"><a href="#">Suporte</a></p>
        </div>
    </aside>


    <!-- Main -->
    <main>

        <div className="flex">

            <img className="bg-darkBlue-500 rounded-lg h-14 w-14 ml-80 mt-40" src="../img/livro.png" alt="">

            <h1 className="text-darkBlue-500 font-bold text-5xl pl-4 pt-40 -mb-96">Gestão de Conteúdo</h1>
                

        </div>

        <div className="ml-72 pt-0.5 p-8">

            <div className="w-full flex space-x-8 mt-10  justify-between">


                <div className="relative">

                    <div className="absolute flex items-center ps-3 pointer-events-none">

                        <svg className="w-4 h-4 mt-2.5 text-darkBlue-500" aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">

                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />

                        </svg>
                    </div>

                    <input type="text" id="procurar"
                        className="font-bold block items-center p-2 ps-10 w-80 text-sm bg-gray-100 shadow-md rounded-lg"
                        placeholder="Procurar">
                </div>

            <div className="grid grid-cols-7">

                <div>

                    <select
                        className="text-darkBlue-500 block font-semibold p-2 text-sm bg-gray-100 shadow-md rounded-lg mb-6 cursor-pointer"
                        name="selecionar">
                        <option className="text-darkBlue-500 font-bold" value="selecionar" selected>Ensino Médio</option>
                        <option className="text-darkBlue-500 font-bold" value="">Ensino Fundamental</option>
                        <option className="text-darkBlue-500 font-bold" value="">Séries Iniciais</option>
                    </select>

                </div>

                <div>
                    <select
                        className="text-darkBlue-500 block font-semibold p-2 text-sm bg-gray-100 shadow-md rounded-lg mb-6 cursor-pointer ml-14"
                        name="selecionar">
                        <option className="text-darkBlue-500 font-bold" value="selecionar" selected >Mais recentes</option>
                        <option className="text-darkBlue-500 font-bold" value="">Mais antigos</option>
                    </select>
                </div>

            </div>

                <div className="w-72">

                    <button className="font-semibold w-56 h-10 mt-1 shadow-xl flex items-center bg-darkBlue-500 text-white  px-5 rounded-md">
                        <img className="w-7 mr-3" src="../img/circulo.png" alt="Adicionar"/>
                        Adicionar Material
                      </button>
                     
                </div>

            </div>

            <div className="w-full rounded-xl mt-16">

                <div className="flex justify-between">

                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>

                            
                        </div>
                        
                    </div>
   
                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>
   
                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>
   
                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>
   
                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500">
   
                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>

                    </div>
   
                </div>

                <div className="flex justify-between">

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
 
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                    <div className="rounded-xl w-48 bg-darkBlue-500 mt-8">

                        <img className="border rounded-t-xl" src="../img/mat1.png" alt="">

                        <div className="flex justify-between">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-20 h-6 pt-1">Conteúdo Eptran</p>

                            <p className="text-[8px] text-white text-center ml-4 mr-8 mt-2 border rounded-md w-14 h-6 p-1">21/07/2024</p>

                        </div>

                        <div className="flex justify-start">

                            <p className="text-[8px] text-white text-center ml-3 mt-2 border rounded-md w-8 h-6 p-1">27 PG</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-8 h-6 p-1">EM</p>

                            <p className="text-[8px] text-white text-center ml-2 mt-2 border rounded-md w-10 h-6 p-1">207 MB</p>

                        </div>

                        <div className="flex">

                            <button className="cursor-pointer">

                                <img className="w-8 mt-2 ml-3" src="../img/pontinhos.png" alt="">
                                
                            </button>
                            
                        </div>
                        
                    </div>

                </div>

            </div>

        </div>

    </main>

</main>

)
}