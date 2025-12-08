import { db } from "../database.js";

// SELECT => GET (LISTAGEM)
export const getDevices = (req, res) => {
  const sql = "SELECT * FROM devices";

  db.query(sql, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar dispositivos" });
    }
    res.json(result);
  });
};

// POST => CREATE (CADASTRO)
export const createDevice = (req, res) => {
  const { nome, ip_address, tipo } = req.body;

  if (!nome || !ip_address || !tipo) {
    return res.status(400).json({ error: "Campos obrigatórios não enviados" });
  }

  const sql = `INSERT INTO devices (nome, ip_address, tipo, data_criacao) VALUES (?, ?, ?, NOW())`;
  const values = [nome, ip_address, tipo];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao cadastrar dispositivo" });
    }

    res.json({
      message: "Cadastrado com sucesso",
      id: result.insertId,
    });
  });

  // Faltam ser desenvolvidos:
//  - PUT /devices/:id      (atualização de dispositivo)
//  - DELETE /devices/:id   (exclusão de dispositivo)
};
