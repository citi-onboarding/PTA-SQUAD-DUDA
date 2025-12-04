import routes from "./routes";
import dotenv from "dotenv";
import express from "express";
import "@database";
import cors from "cors";

dotenv.config();

const app = express();
const allowedOrigins = [
    'http://localhost:3000',
    'https://pta-squad-duda.onrender.com/' // Frontend em desenvolvimento
];

const corsOptions = {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // Permite requisições sem origem (como apps mobile ou curl) E as origens da lista
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            // Se a origem não estiver na lista, bloqueia
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Métodos que você usa
    allowedHeaders: ['Content-Type', 'Authorization'], // Headers que você envia
    credentials: true // Importante se usar cookies/tokens de sessão
};
app.use(express.json());
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
}))
app.use(routes);
app.use(express.static(__dirname + "/public"));

app.listen(process.env.SERVER_PORT || 3001, () => {
  console.log("📦 Server running");
});
