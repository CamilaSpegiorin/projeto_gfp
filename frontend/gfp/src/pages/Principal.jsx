import React, {useState, useEffect, useContext } from "react";
import { UsuarioContext } from "../UsuarioContext";
import { useNavigate, Link, Routes, Route, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";
import logo from '../assets/logo.png';
import { MdMenu, MdAdd, MdClose, MdCreditCard, MdGridView, MdLogout, MdOutlineLocalOffer, MdPeople } from "react-icons/md";
import { MdCached } from "react-icons/md";

export default function Principal(){
    const { dadosUsuario, setDadosUsuario, carregando } = useContext(UsuarioContext);

    const [menuAberto, setMenuAberto] = useState(false);

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!dadosUsuario && !carregando) {
            navigate('/login');
        }
    }, [dadosUsuario, carregando, navigate]);


    const botaoLogout = () => {
        try{
        localStorage.removeItem('UsuarioLogado');
        setDadosUsuario(null);
        navigate('/')
    } catch (error) {
        console.error('Erro ao deslogar:', error)
    }
    }

    return (
        <div className="flex h-screen font-sans bg-gradient-to-b from-[#2c3e50] to-[#3498db]">
            {/* div para fechar o menu clicando fora */}
            <div className={`fixed inset-0 bg-black bg-opacity-80 z-30 md:hidden
                ${menuAberto == true ? 'block' : 'hidden'} `}
                onClick={() => setMenuAberto(false)}>
            </div>
           
            {/* sidebar */}
            <section className={`fixed top-0 left-0 h-full w-64 bg-slate-900
                text-gray-200 flex flex-col z-40 transform transition-transform
                md:relative md:w-20 lg:w-64 md:translate-x-0
                ${menuAberto == true ? 'translate-x-0' : '-translate-x-full'}`}>
               
                <div className="flex justify-content-between items-center mb-6 p-4
                                border-b border-slate-700">
                    <div className="flex gap-2 items-center">
                        <img src={logo} alt='Logo GFP' className='w-8 h-8' />
                        <span className="text-xl font-bold md:hidden lg:block">GFP</span>
                    </div>
                    <button className="md:hidden" onClick={() => setMenuAberto(false)}>
                        <MdClose className="w-6 h-6"/>
                    </button>
                </div>
                <nav className="flex-1">
                    <div className="px-4 lg:px-6 mb-2">
                        <Link to='/dashboard' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/dashboard' ?
                                'bg-cyan-600 text-white shadow-md' : 'hover:bg-slate-700'
                            }`
                        }
                        >
                            <MdGridView className="w-6 h-6"/>
                            <span className="font-medium md:hidden lg:block">Dashboard</span>
                        </Link>
                    </div>
                    <div className="px-4 lg:px-6 mb-2">
                        <Link to='/transacoes' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/transacoes' ?
                                'bg-cyan-600 text-white shadow-md' : 'hover:bg-slate-700'
                            }`
                        }
                        >
                            <MdCached className="w-6 h-6"/>
                            <span className="font-medium md:hidden lg:block">Transações</span>
                        </Link>
                    </div>
                    <div className="px-4 lg:px-6 mb-2">
                        <Link to='/contas' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/contas' ?
                                'bg-cyan-600 text-white shadow-md' : 'hover:bg-slate-700'
                            }`
                        }
                        >
                            <MdCreditCard className="w-6 h-6"/>
                            <span className="font-medium md:hidden lg:block">Contas</span>
                        </Link>
                    </div>
                    <div className="px-4 lg:px-6 mb-2">
                        <Link to='/categorias' onClick={() => setMenuAberto(false)}
                            className={`flex items-center gap-2 p-3 rounded-lg transition-colors
                            duration-200 ${location.pathname == '/categorias' ?
                                'bg-cyan-600 text-white shadow-md' : 'hover:bg-slate-700'
                            }`
                        }
                        >
                            <MdOutlineLocalOffer className="w-6 h-6"/>
                            <span className="font-medium md:hidden lg:block">Categorias</span>
                        </Link>
                    </div>
                </nav>
                <div className="p-4 lg:p-6 border-t border-slate-700 bg-cyan-600
                            hover:bg-cyan-700 text-white font-bold py-3 px-4 rounded-lg m-4">
                    <button className="flex w-full item-center justify-center">
                        <MdAdd className="w-8 h-8" />
                        <span className="md:hidden lg:block">Nova Transação</span>
                    </button>
                </div>
                <div className="border-t border-slate-700 pt-4">
                    <div className="flex items-center p-2">
                        <MdPeople className="w-10 h-10 p-2 bg-slate-700
                            text-cyan-400 rounded-full"/>
                        <div className="ml-3 md:hidden lg:block">
                            <p className="font-bold text-white">{dadosUsuario?.nome}</p>
                            <p>{dadosUsuario?.email}</p>
                        </div>
                    </div>
                    <button className="flex gap-2 items-center w-full justtify-center p-3
                        text-slate-300" onClick={botaoLogout}>
                        <MdLogout className="w-8 h-8"/>
                        <span className="md:hidden lg:block">Sair</span>
                    </button>
                </div>
            </section>
            {/* Conteudo Principal */}
            <section className="flex-1 p-4 text-gray-100 overflow-auto">
                <header>
                    <button className="md:hidden" onClick={() => setMenuAberto(true)}>
                        <MdMenu className='w-8 h-8'/>
                    </button>
                    <div>
                        <img src={logo} alt="Logo GFP" className="w-8 h-8" />
                        <span className="font-bold text-xl">GFP</span>
                    </div>
                </header>

                <main>
                    <Routes>
                        <Route path="/" element={<Dashboard/>} />
                        <Route path="/dashboard" element={<Dashboard/>} />
                    </Routes>
                </main>

            </section>
        </div>
    )
}
