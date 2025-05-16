import React, { useState, useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';

export default function Principal() {
    const [usuario, setUsuario] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const buscarUsuarioLogado = async () => {
            const UsuarioLogado = await localStorage.getItem('UsuarioLogado');
            if (UsuarioLogado) {
                setUsuario(JSON.parse(UsuarioLogado));
            } else {
                navigate('/');
            }
        }

        buscarUsuarioLogado();
    }, [])

    const botaoLogout = () => {
    try{
        localStorage.removeItem('UsuarioLogado');
        setUsuario(null);
        navigate('/');
    }catch (error) {
        console.error('Erro ao deslogar:', error);
    }
};

    return(
        <h1>Tela Principal</h1>
    );
