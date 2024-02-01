//models
import Estoque from "../Database/models/Estoque.js"

export default async function (req, res) {
    const id = req.params.id
    const atualizacao = req.body // Se trata do Objeto produto já atualzado, mas ainda não no banco de dados
    
    // for (var props in atualizacao) {
    //     if (props === undefined) return res.status(400).json({
    //         message: 'Dados Faltantes!!!'
    //     })
    // }

    try {
        await Estoque.findByIdAndUpdate({_id: id}, {...atualizacao})
        const produtoAtualizado = await Estoque.findOne({_id: id})

        return res.status(200).json({
            message: 'Ok, produto atualizado',
            produtoAtualizado
        })
    } catch(error) {
        console.log(error)
        res.status(400).json({message: 'Não foi possível atualizar'})
    }
}