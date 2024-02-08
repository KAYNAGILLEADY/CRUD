import fs from 'fs';

//models
import Estoque from "../Database/models/Estoque.js"

export default async function (req, res) {
    const id = req.params.id

    try {
        let produto = await Estoque.findById(id)

        if (!produto) return res.status(400).json({
            message: "Produto não encontrado"
        })

        fs.unlink('./' + produto.pathImage, function (err) {
            if (err) throw err;
            console.log('Arquivo deletado!');
        })
        await Estoque.findByIdAndDelete(produto._id)

        return res.status(200).json({
            message: `Produto ${produto.nome_produto} excluido com sucesso!!`
        })
    } catch(error) {
        console.log(error)
        res.status(400).json({message: 'Não foi possível atualizar'})
    }
}