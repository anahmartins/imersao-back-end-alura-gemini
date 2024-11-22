import express from "express"; // Importa o módulo express
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

const upload = multer({ dest: "./uploads" , storage})

const routes = (app) => {
    app.use(express.json()); // Configura o middleware para analisar corpos de requisições JSON
    // Define uma rota GET para "/posts". Quando essa rota é acessada, a função assíncrona é executada,
    app.use(cors(corsOptions));
    // obtendo todos os posts do banco de dados e enviando-os como resposta.
    app.get("/posts", listarPosts);
    app.post("/posts", postarNovoPost)
    app.post("/upload", upload.single("imagem"), uploadImagem)
    app.put("/upload/:id", atualizarNovoPost)
}

export default routes; // Exporta a função de rotas para ser utilizada em outros arquivos