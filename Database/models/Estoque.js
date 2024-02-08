import mongoose, { Schema, model } from "mongoose";

const produtoSchema = new Schema({
    nome_produto: String,
    descricao: String,
    preco: Number,
    quantidade: Number,
    pathImage: String
})

const Estoque = model("Estoque", produtoSchema)

export default Estoque