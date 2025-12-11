const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'VoxNet'
});

db.getConnection((err, connection) => {
    if (err) {
        console.log('Erro ao conectar-se com o MySQL: '+ err);
        return;
    }
    console.log('Conexão efetuada com sucesso!');
    connection.release();
});

app.get('/devices', (_req, res) => {
    const sql = 'SELECT * FROM devices';

    db.query(sql, (err, resultado) => {
        if (err) {
            console.log("Não foi possível encontrar dispositivos:", err);
            return res.status(500).json({ erro: "Não foi possível encontrar dispositivos" });
        }
        res.json(resultado);
    });
});

app.get('/tests', (_req, res) => {
    const sql = 'SELECT * FROM tests';

    db.query(sql, (err, resultado) => {
        if (err) {
            console.log('Não foi possível encontrar testes:', err);
            return res.status(500).json({ erro: 'Não foi possível encontrar testes' });
        }
        res.json(resultado);
    });
});

app.listen(3001, () => {
    console.log('O servidor está rodando na porta 3001.');
});

app.post('/devices', (req, res) => {
    const {nome, ip_address, tipo} = req.body;

    if (!nome || !tipo || !ip_address){
        return res.status(400).json({erro: 'Está faltando nome, endereço de IP ou tipo.'});
    }

    const sql = 'INSERT INTO devices (nome, ip_address, tipo) VALUES (?, ?, ?)'

    db.query(sql, [nome, ip_address, tipo], (err, resultado) => {
    if (err) {
        console.error("Erro ao inserir:", err);
        alert("Erro ao inserir:", err
            
        )

        return res.status(500).json({
            erro: err.sqlMessage || err.message || JSON.stringify(err)
        });
    }


        const device_id = resultado.insertId;
        const ping = require('ping')

        ping.promise.probe(ip_address, {timeout: 1})
        .then(pingResult => {
            const status = pingResult.alive ? 'online' : 'offline';
            const latency = pingResult.alive ? parseFloat(pingResult.time) : null;

            const sqlTeste = `INSERT INTO tests (device_id, status, latency, tempo) VALUES (?, ?, ?, CURRENT_TIME())`;

            db.query(
                sqlTeste, [device_id, status, latency], (err) => {
                    if (err) {
                        console.log('Não foi possível salvar o teste: ', err)
                    }

                    return res.status(201).json({
                    aviso: "Dispositivo foi cadastrado no banco e seu teste foi feito.",
                    id: device_id,
                    nome,
                    ip_address,
                    tipo,
                    test: {
                       status,
                       latency
                    }
                 });
            });
        });
    });
});