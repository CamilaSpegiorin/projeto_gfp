import { BD } from "../db.js";

class rotasTransacoes{

    //nova Transação
    static async novaTransacoes(req, res) {
        const { id_usuario, id_categoria, id_subcategoria, valor            } = req.body;
        try {
            const transacao = await BD.query(`INSERT INTO transacoes (id_usuario, id_categoria, id_subcategoria, valor)
                    VALUES ($1, $2, $3, $4)`,
                [id_usuario, id_categoria, id_subcategoria, valor]);                
            res.status(201).json(transacao); //retorna o usuario criado com status 201
        }
        catch (error) {
            console.error('Erro ao criar a transação', error);
            res.status(500).json({ message: 'Erro ao criar transação', error: error.message });
        }
    }

    static async listar(req, res) {
        try {
            const resposta = await BD.query("select * from transacoes");
            res.status(200).json(resposta.rows);
        } catch (error) {
            console.log('erro ao listar transacoes ', error);
            res.status(500).json({ message: "Erro ao listar transacoes",error:error.message });
        }
    }
    static async listarPorID(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("select * from transacoes where id_transacao = $1", [id]);
            res.status(200).json(resposta.rows);
        } catch (error) {
            console.log('erro ao listar transacoes ', error);
            res.status(500).json({ message: "Erro ao listar transacoes",error:error.message });
        }
    }
    static async deletarTransacoes(req, res) {
        const { id } = req.params;
        try {
            const resposta = await BD.query("delete from transacoes where id_transacao = $1", [id]);
            res.status(200).json("transacao deletada com sucesso");
        } catch (error) {
            console.log('erro ao deletar transacoes ', error);
            res.status(500).json({ message: "Erro ao deletar transacao",error:error.message });
        }
    }
    static async atualizarTransacoes(req, res) {
        const { id } = req.params;
        const { valor, id_categoria, id_subcategoria, id_local_transacao, id_usuario, data_transacao } = req.body;
        try {
            const transacoes = await BD.query(`
                UPDATE transacoes SET nome = $1, tipo_transacao = $2, gasto_fixo = $3, id_usuario = $4 WHERE id_categoria = $5`
                , [nome, tipo_transacao, gasto_fixo, id_usuario, id])
            const categoriaAtualizada = await BD.query(`
                SELECT * FROM transacoes WHERE id_transacoes = $1`, [id])
            return res.status(200).json(transacoesAtualizada)
    } catch(error){
        return res.status(500).json({error: 
            "Erro ao atualizar dados da categoria", error: error.message});
   
    }
}
    static async AtualizarTransacoes(req, res){
        const { id } = req.params;
        const { valor, id_categoria, id_subcategoria, id_local_transacao, id_usuario, data_transacao}= req.body;
        try {
            // Inicializar arrays(vetores) para armazenar os campos e valores a serem atualizados
            const campos = []
            const valores = []
            // Verifica quais campos foram fornecidos
            if(nome !== undefined){
                campos.push(`nome = $${valores.length + 1}`)
                valores.push(nome)
            }
           if(tipo_transacao !== undefined){
            campos.push(`tipo_transacao = $${valores.length + 1}`)
            valores.push(tipo_transacao)
            }
            if(tipo_transacao!== undefined){
                campos.push(`tipo_transacao = $${valores.length + 1}`)
                valores.push(tipo_transacao)
            }
            if(gasto_fixo!== undefined){
                campos.push(`gasto_fixo = $${valores.length + 1}`)
                valores.push(gasto_fixo)
            }
                if(id_usuario !== undefined){
                    campos.push(`id_usuario = $${valores.length + 1}`)
                    valores.push(id_usuario)
            }
            if (id_transacoes !== undefined){
                campos.push(`id_transacoes = $${valores.length + 1}`)
                valores.push(id_transacoes)
            }
            if(campos.length === 0){
                return res.status(400).json({erro: 
                    "Nenhum campo foi fornecido" })
            }
            // Montar a query
             const query = `UPDATE categorias SET ${campos.join(',')}
        WHERE id_categoria = ${id} returning *`
             // Executar a query
             const transacoesAtualizada = await BD.query(query, valores)

             // Verifica se o usuario foi atualizado
             if (transacoes.rows.length === 0) {
                return res.status(404).json({ message:
                     "Transacoes não encontrada" });
            }
                return res.status(200).json(transacoesAtualizada.rows[0]);

           } catch(error){
            return res.status(500).json({error:
                "Erro ao atualizar dados da categoria", error: error.message});
           }
       
           
        }

        //Criar uma rota que perimite filtrar transacoes de data de vencimento ou data de pagamento
        //dentro de um intervalo especifico

        static async  filtrarPorData(req, res) {
            const {data_inicial, data_fim, tipo_data} = req.query;

            let colunaData;
            if (tipo_data == 'vencimento') {
                colunaData = 'data_vencimento';
            }
            else if (tipo_data == 'pagamento') {
                colunaData = 'data_pagamento';
            } else {
                return res.status(400).json({
                 message: "Tipo_data inválido, use vencimento ou pagamento" 
                })
            }try{
                const query = `
                SELECT t.*, u.nome AS nome_usuario, ct.nome
                FROM transacoes AS t
                LEFT JOIN usuarios AS u ON t.id_usuario = u.id_usuario
                JOIN contas ct ON t.id_conta = ct.id_conta
                WHERE ${colunaData} BETWEEN $1 AND $2
                ORDER BY ${colunaData} ASC
                `
                const transacoes = await BD.query(query, [data_inicial, data_fim])

                res.status(200).json(transacoes.rows);
            }catch(error) {
                console.error('Erro ao filtrar transação:', error);
                res.status(500).json({ message: "Erro ao filtrar transação", error: error.message });
            }
        }

        //Somando transacoes entrada ou saida

        static async somarTransacoes(req, res) {
            const { tipo, id_usuario } = req.query;
            try {
                const tipoTransacao = tipo.toUpperCase();

                const query = `
                    SELECT SUM(valor) AS total
                    FROM transacoes
                    WHERE tipo_transacao = $1 AND id_usuario = $2 
                `

                    const resultado = await BD.query(query, [tipoTransacao, id_usuario])

                    let total = resultado.rows[0].total
                    if (total === null)
                    {
                        total = 0
                    }
                    res.status(200).json({total: parseFloat(total)});

            }catch(error) {
                console.error('Erro ao somar transação:', error);
                res.status(500).json({ message: "Erro ao somar transação", error: error.message });
            }
        }

        static async transacoesVencidas(req,res) {
            const { id_usuario } = req.params;

            try {
                const query = `
                            SELECT t.valor, t.data_transacao, t.data_vencimento, t.data_pagamento,                            u.nome AS nome_usuario,
                            c.conta AS nome_conta,
                            ct.nome AS nome_categoria,
                            sct.nome AS nome_subcategoria
                            FROM transacoes AS t
                            LEFT JOIN usuarios u ON t.id_usuario = u.id_uduario
                            LEFT JOIN contas c ON t.id_conta = c.id_conta
                            LEFT JOIN categorias ct ON t.id_categoria = ct.id_categoria
                            LEFT JOIN subcategorias sct ON t.id_subcategoria = sct.id_subcategoria
                            WHERE t.data_vencimento < CURRENT_DATE    --filtra transacoes vencidas
                            AND t.id_usuario = $1
                            ORDER BY t.data_vencimento ASC
                `
                const resultado = await BD.query(query, [id_usuario])

                //Função para formatar data.
                const formatarDataBr = (data) => {
                    if(!data) return null;
                    return new Date(data).toLocaleDateString('pt-BR')//Converte a data no padrão BR
                }

                const dadosFormatados = resultado.rows.map(t => ({
                    ...t, //copia todas as propriedades originais da resultado para a t
                    data_transacao: formatarDataBr(t.data_transacao),
                    data_vencimento: formatarDataBr(t.data_vencimento),
                    data_pagamento: formatarDataBr(t.data_pagamento),
                }))

                res.status(200).json(dadosFormatados);

            }catch(error) {
                console.error('Erro ao buscar transações vencidas:', error);
                res.status(500).json({ message: "Erro ao buscar transações vencidas", error: error.message });
        }

    }
}

export default rotasTransacoes;
