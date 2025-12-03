import express from "express";
import cors from "cors";
import { db } from "./database.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/devices", (req, res) => {
    const sql = "SELECT * FROM devices"

    db.query(sql, (err, result) => {
        if(err){
            return res.status(500).json({ error: "Erro ao buscar dispositivos"})
        }
        res.json(result);
    });
});

app.post("/devices", (req, res) => {
    const { nome, ip_address, tipo } = req.body;

    if(!nome || !ip_address || !tipo) {
        return res.status(400).json({error: "campos obrigatorios nao enviados"});
    }

    const sql = "insert into devices (nome, ip_address, tipo, data_criacao) values (?, ?, ?, NOW())";
    const values = [nome, ip_address, tipo];

    db.query(sql, values, (err, result) => {
        if(err){
            return res.status(500).json({error: "ERRO AO CADASTRAR"});
        }
        res.json({messsage: "cadastrado com sucesso", id: result.insertId})
    })
})

 app.listen(3000, () => {
    console.log('rodando');
})

export default app;