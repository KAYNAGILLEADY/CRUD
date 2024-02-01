import express, { json } from 'express'
import connectDatabase from './Database/index.js'

//routes
import services from './routes/services.js'

//Instancias
const app = express()

// configs
app.use(json())
app.set('view engine', 'ejs')
app.use(express.static('public'))
connectDatabase()

app.get("/", (req, res) => {
    res.render("../views/index")
})

app.use("/services", services)

app.listen(8080, () => console.log('Servidor ligado!'))