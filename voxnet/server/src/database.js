import mysql from "mysql2";

export const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "080108leo",
    database: "voxnet"
});

db.connect((err) => {
    if(err){
        console.log("erro ao conectar no banco de dados: " + err );
        return;
    }
    console.log("conectado com sucesso")
})