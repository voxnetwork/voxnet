import { db } from "../database.js";

export const getTestsByDevice = (req, res) => {
    const deviceId = req.params.id;
    const sql = "SELECT * FROM tests WHERE device_id = ?";

    db.query(sql, [deviceId], (err, result) => {
        if (err) {
            return res.status(500).json({ error: "Erro ao buscar testes" });
        }
        res.json(result);
    });
};

export const createTest = (req, res) => {
  const { status, latencia } = req.body; // pegar também o latency

  const deviceId = req.params.id;

  const sql = `INSERT INTO tests (device_id, status, latencia, tempo) VALUES (?, ?, ?, NOW())`;
  const values = [deviceId, status, latencia];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao criar teste" + err });
    }
    res.json({ message: "Teste criado com sucesso", id: result.insertId });
  });
};