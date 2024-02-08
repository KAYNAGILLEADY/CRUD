//models
import Estoque from "../Database/models/Estoque.js"

export default async function (req, res) {
    const { nome_produto, descricao, preco, quantidade } = req.body
    let pathImage = req.file.path

    if(!nome_produto || !descricao || !preco || !quantidade || !pathImage)
        return res.status(400).json({message: 'Há dados faltantes para criação!'})

    // create
    try {
        const novoProduto = await Estoque.create({
            nome_produto,
            descricao,
            preco,
            quantidade,
            pathImage
        })
        return res.status(201).json({
            message: 'Produto criado com sucesso!',
            novoProduto,
        })
    } catch (error) {
        console.log('Erro: ' + error)
    }
}