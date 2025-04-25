import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios, {autenticarToken} from './routes/rotasUsuarios.js';

const app = express(); //criar instancia do express
testarConexao();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API Funcionando!')
})

//Rotas usuarios
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login)
app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios)
// app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorId)
app.path('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizar)
// app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodos)
app.delete('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.deletar)

// //Rotas categorias
app.post('/categorias', autenticarToken, rotasCategorias.nova)
// app.get('/categorias', rotasCategorias.listar)
// app.get('/categorias/:id_categoria', rotasCategorias.listarPorId)
// app.patch('/categorias/:id_categoria', rotasCategorias.atualizar)
// app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodos)
// app.delete('/categorias/:id_categoria', rotasCategorias.deletar)

// //Rotas subcategorias
// app.post('/subcategorias', rotasSubcategorias.nova)
// app.get('/subcategorias', rotasSubcategorias.listar)
// app.get('/subcategorias/:id_subcategoria', rotasSubcategorias.listarPorId)
// app.patch('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizar)
// app.put('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizarTodos)
// app.delete('/subcategorias/:id_subcategoria', rotasSubcategorias.deletar)

// // //Rotas local Transacao
// app.post('/localtransacao', rotaslocalTransacoes.nova)
// app.get('/localtransacao', rotaslocalTransacoes.listar)
// app.get('/localtransacao/:id_local_transacao', rotaslocalTransacoes.listarPorID)
// app.patch('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizar)
// app.put('/localtransacao/:id_local_transacao', rotaslocalTransacoes.atualizarTodos)
// app.delete('/localtransacao/:id_local_transacao', rotaslocalTransacoes.deletar)

// // //Rotas Transacoes
// app.post('/transacoes', rotasTransacoes.nova)
// app.get('/transacoes', rotasTransacoes.listar)
// app.get('/transacoes/:id_transacao', rotasTransacoes.listarPorID)
// app.patch('/transacoes/:id_transacao', rotasTransacoes.atualizar)
// app.put('/transacoes/:id_transacao', rotasTransacoes.atualizarTodos)
// app.delete('/transacoes/:id_transacao', rotasTransacoes.deletar)

const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

