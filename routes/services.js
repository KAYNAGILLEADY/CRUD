import { Router } from "express";

//controllers
import createProduto from "../controllers/createProduto.js";
import showEstoque from "../controllers/showEstoque.js"
import editProduto from "../controllers/editProduto.js"
import deleteProduto from "../controllers/deleteProduto.js"

//configs
const router = Router()

router.get("/estoque", showEstoque)
router.post("/create", createProduto)
router.put("/edit/:id", editProduto)
router.delete("/delete/:id", deleteProduto)

export default router;