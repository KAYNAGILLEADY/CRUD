import { config } from 'dotenv';
import { connect } from 'mongoose';

config()

export default async function connectDatabase () {
    try {
        await connect(`mongodb+srv://${process.env.USERNAME_DATABASE}:${process.env.PASSWORD_DATABASE}@cluster0.sxbtsno.mongodb.net/?retryWrites=true&w=majority`);
        console.log("Banco de dados ligado!")
    }catch(error) {
        console.log("Erro: " + error)
    }
}


