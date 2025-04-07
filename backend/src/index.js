// Importa os módulos necessários
import express from "express"; // Framework para criar servidores HTTP
import dotenv from "dotenv"; // Carrega variáveis de ambiente do arquivo .env
import cookieParser from "cookie-parser"; // Middleware para lidar com cookies
import cors from "cors"; // Middleware para habilitar CORS (Cross-Origin Resource Sharing)

// Importa a função de conexão com o banco de dados
import { connectDB } from "./lib/db.js";

// Importa as rotas definidas para autenticação e mensagens
import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";

// Carrega as variáveis de ambiente do arquivo .env para process.env
dotenv.config();

// Cria uma instância do servidor Express
const app = express();

// Define a porta onde o servidor irá rodar (pega do .env ou usa 5001 por padrão)
const PORT = process.env.PORT || 5001;

const URL = process.env.CLIENT_URL;

// Middleware para interpretar requisições com JSON no corpo
app.use(express.json());

// Middleware para ler os cookies presentes nas requisições
app.use(cookieParser());

// Middleware para habilitar CORS (Cross-Origin Resource Sharing)
app.use(
  cors({
    origin: URL, // Permite requisições apenas do domínio definido em CLIENT_URL
    credentials: true, // Permite o envio de cookies nas requisições
  })
);

// Define o prefixo das rotas de autenticação, por exemplo: /api/auth/login
app.use("/api/auth", authRoutes);

// Define o prefixo das rotas de mensagens, por exemplo: /api/message/send
app.use("/api/messages", messageRoutes);

// Inicia o servidor e escuta na porta definida
app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
  console.log("Client Url " + PORT);

  // Conecta ao banco de dados assim que o servidor estiver rodando
  connectDB();
});
