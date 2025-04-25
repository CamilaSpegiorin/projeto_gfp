import { BD } from "../db.js";

class rotasTransacoes{
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
}

export default rotasTransacoes;
