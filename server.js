// Importa as dependências necessárias: Express para criar o servidor e a função para conectar ao banco de dados.
import express from 'express';
import routes from './src/routes/postsRoutes.js';

// Cria uma instância do Express e configura o middleware para analisar corpos de requisições JSON.
const app = express();
app.use(express.static('uploads'));
routes(app);

// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ativo.
app.listen(3000, () => {
    console.log('Servidor escutando...');
});