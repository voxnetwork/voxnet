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
}

//  - PUT /devices/:id      (atualização de dispositivo)
export const updateDevice = (req, res) => {
  const { id } = req.params; 
  const { nome, ip_address, tipo } = req.body;

  if (!nome || !ip_address || !tipo) {
    return res.status(400).json({ error: "Campos obrigatórios não enviados" });
  }

  const sql = "UPDATE devices SET nome = ?, ip_address = ?, tipo = ? WHERE id = ?";
  const values = [nome, ip_address, tipo, id];

  db.query(sql, values, (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao atualizar dispositivo" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dispositivo não encontrado" });
    }
    res.json({ message: "Dispositivo atualizado com sucesso" });
  });
};

//  - DELETE /devices/:id   (exclusão de dispositivo)
export const deleteDevice = (req, res) => {
  const { id } = req.params;

  const sql = "delete from devices where id = ?";

  db.query(sql, [id], (err, result) => {
     if (err) {
      return res.status(500).json({ error: "Erro ao deletar dispositivo" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Dispositivo não encontrado" });
    }
    res.json({ message: "Dispositivo deletado com sucesso" });
  });
}