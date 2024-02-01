import mongoose, { Schema, model } from "mongoose";

/**
 * Implementações a serem feitas:
 *  - Adicionar imagems aos produtos
 */

const produtoSchema = new Schema({
    nome_produto: String,
    descricao: String,
    preco: Number,
    quantidade: Number
})

const Estoque = model("Estoque", produtoSchema)

export default Estoque