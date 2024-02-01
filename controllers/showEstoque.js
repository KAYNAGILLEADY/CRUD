//models
import Estoque from "../Database/models/Estoque.js"

export default async function (req, res) {
    
    try {
        const produtos = await Estoque.find()      
        return res.status(200).json(produtos)
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            message: 'Tente novamente'
        })
    }

}