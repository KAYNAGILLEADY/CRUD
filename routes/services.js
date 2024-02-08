import { Router } from "express";
import upload from '../uploadMulter.js'

//controllers
import createProduto from "../controllers/createProduto.js";
import showEstoque from "../controllers/showEstoque.js"
import editProduto from "../controllers/editProduto.js"
import deleteProduto from "../controllers/deleteProduto.js"

//configs
const router = Router()

router.get("/estoque", showEstoque)
router.post("/create", upload.single('file'), createProduto)
router.put("/edit/:id", upload.single('file'), editProduto)
router.delete("/delete/:id", deleteProduto)

export default router;