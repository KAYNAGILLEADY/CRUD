import fs from 'fs';

//models
import Estoque from "../Database/models/Estoque.js"

export default async function (req, res) {
    const id = req.params.id
    const atualizacao = req.body // Se trata do Objeto produto já atualzado, mas ainda não no banco de dados

    try {
        // excluir imagem antiga do produto
        const produto = await Estoque.findById({_id: id})
        fs.unlink('./' + produto.pathImage, function (err) {
            if (err) throw err;
            console.log('Arquivo deletado!');
        })

        // atualizar todos os dados
        await Estoque.findByIdAndUpdate({_id: id}, {
            ...atualizacao,
            pathImage: req.file.path
        })
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