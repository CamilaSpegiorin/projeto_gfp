import express from 'express'
import { testarConexao } from './db.js'
import cors from 'cors';
import rotasUsuarios, { autenticarToken } from './routes/rotasUsuarios.js';
import rotasCategorias from './routes/rotasCategorias.js';
import rotasContas from './routes/rotasContas.js';
import rotasTransacoes from './routes/rotasTransacoes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerSpec from './swagger.js';

const app = express(); //criar instancia do express
testarConexao();

app.use(cors());
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.get('/', (req, res) => {
    res.send('/api-docs')
})

//Rotas usuarios
// app.post('/usuarios', rotasUsuarios.novoUsuario)
// app.post('/usuarios/login', rotasUsuarios.login)
// app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios)
// //app.get('/usuarios/:id_usuario', rotasUsuarios.listarUsuariosPorId)
// app.path('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizar)
// //app.put('/usuarios/:id_usuario', rotasUsuarios.atualizarTodos)
// app.delete('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.deletar)

//ROTAS USUARIOS 
app.post('/usuarios', rotasUsuarios.novoUsuario)
app.post('/usuarios/login', rotasUsuarios.login)
app.get('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.listarUsuariosPorID) 
app.get('/usuarios', autenticarToken, rotasUsuarios.listarUsuarios) 
app.delete('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.deletar) 
app.put('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizarTodos) 
app.patch('/usuarios/:id_usuario', autenticarToken, rotasUsuarios.atualizar)

// //Rotas categorias
app.post('/categorias', autenticarToken, rotasCategorias.nova)
app.get('/categorias/filtrarCategoria', rotasCategorias.filtrarCategoria)
app.get('/categorias', autenticarToken, rotasCategorias.listarTodas)
app.get('/categorias/:id_categoria', rotasCategorias.ListarporID)
app.patch('/categorias/:id_categoria', rotasCategorias.Atualizar)
app.put('/categorias/:id_categoria', rotasCategorias.atualizarTodosCampos)
app.delete('/categorias/:id_categoria', rotasCategorias.Deletar)

// //Rotas subcategorias
// app.post('/subcategorias', rotasSubcategorias.nova)
//app.get('/subcategorias', autenticarToken, listarSubcategorias)
// app.get('/subcategorias/:id_subcategoria', rotasSubcategorias.listarPorId)
// app.patch('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizar)
// app.put('/subcategorias/:id_subcategoria', rotasSubcategorias.atualizarTodos)
// app.delete('/subcategorias/:id_subcategoria', rotasSubcategorias.deletar)

// // //rotasContas
app.post('/contas', rotasContas.novaConta)
app.get('/contas', rotasContas.listarContas)
app.get('/contas/:id_rotasContas', rotasContas.listarContaPorID)
app.patch('/contas/:id_rotasContas', rotasContas.atualizarContas)
app.put('/contas/:id_conta', rotasContas.atualizarTodasContas)
app.delete('/contas/:id_conta', rotasContas.deletarConta)

// // //Rotas Transacoes
app.post('/transacoes', rotasTransacoes.novaTransacoes)
app.get('/transacoes/somarTransacoes', rotasTransacoes.somarTransacoes)
app.get('/transacoes/filtroData', rotasTransacoes.filtrarPorData)
app.get('/transacoes/transacoesVencidas/:id_usuario', rotasTransacoes.transacoesVencidas)
// app.get('/transacoes', rotasTransacoes.listar)
// app.get('/transacoes/:id_transacao', rotasTransacoes.listarPorID)
// app.patch('/transacoes/:id_transacao', rotasTransacoes.atualizar)
// app.put('/transacoes/:id_transacao', rotasTransacoes.atualizarTodos)
// app.delete('/transacoes/:id_transacao', rotasTransacoes.deletar)

const porta = 3000
app.listen(porta, () => {
    console.log(`Api rodando na porta http://localhost:${porta}`);
})

