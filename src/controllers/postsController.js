import {getTodosPosts, criarPost, atualizarPost} from "../models/postsModel.js"; // Importa a função para obter todos os posts do banco de dados
import fs from "fs";
import gerarDescricaoComGemini from "../services/geminiServices.js";

export async function listarPosts(req, res) {
    const posts = await getTodosPosts(); // Chama a função para obter todos os posts do banco de dados
    res.status(200).json(posts); // Envia os posts como resposta em formato JSON com status 200 (sucesso)
    }

export async function postarNovoPost(req, res) {
    const novoPost = req.body; // Obtém o novo post do corpo da requisição
    try {
        const postCriado = await criarPost(novoPost); // Chama a função para criar um novo post no banco de dados
        res.status(200).json(postCriado); // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requesição"}); // Envia uma resposta de erro com status 500 (erro interno do servidor)
    }
}

export async function uploadImagem(req, res) {
    const novoPost = {
        descricao: "",
        imgUrl: req.file.originalname,
        alt: ""
    };

    try {
        const postCriado = await criarPost(novoPost); // Chama a função para criar um novo post no banco de dados
        const imagemAtualizada = `uploads/${postCriado.insertedId}.png`
        fs.renameSync(req.file.path, imagemAtualizada)
        res.status(200).json(postCriado); // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requesição"}); // Envia uma resposta de erro com status 500 (erro interno do servidor)
    }
}

export async function atualizarNovoPost(req, res) {
    const id = req.params.id;
    const urlImagem = `http://localhost:3000/${id}.png`
   
    try {
        const imageBuffer = fs.readFileSync(`uploads/${id}.png`);
        const descricao = await gerarDescricaoComGemini(imageBuffer)

        const post = {
            imgUrl: urlImagem,
            descricao: descricao,
            alt: req.body.alt
        }

        const postCriado = await atualizarPost(id, post); // Chama a função para criar um novo post no banco de dados
        res.status(200).json(postCriado); // Envia o post criado como resposta em formato JSON com status 200 (sucesso)
    } catch(erro) {
        console.error(erro.message); // Exibe o erro no console
        res.status(500).json({"Erro":"Falha na requesição"}); // Envia uma resposta de erro com status 500 (erro interno do servidor)
    }
}