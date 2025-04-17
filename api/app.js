import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios from './routes/rotasUsuarios.js';

const app = express(); //criar instancia do express
testarConexao();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login)
app.get('/usuarios', rotasUsuarios.listarUsuarios)
app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorId)
app.path('/usuarios/:id_usuario', rotasUsuarios.atualizar)
app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodos)
app.delete('/usuarios/:id_usuario', rotasUsuarios.deletar)

//Rotas categorias
app.post('/categorias', rotasCategorias.nova)
app.get('/categorias', rotasCategorias.listar)
app.get('/categorias/:id_categoria', rotasCategorias.listarPorId)
app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodos)
app.delete('/categorias/:id_categoria', rotasCategorias.deletar)

//Rotas subcategorias
app.post('/subcategorias', rotasSubcategorias.nova)
app.get('/subcategorias', rotasSubcategorias.listar)
app.get('/subcategorias/:id_subcategoria', rotasSubcategorias.listarPorId)
app.patch('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizar)
app.put('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizarTodos)
app.delete('/subcategorias/:id_subcategoria', rotasSubcategorias.deletar)

const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

