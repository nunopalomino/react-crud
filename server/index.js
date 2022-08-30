const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
  host: 'localhost',
  user: 'nuno',
  password: 'password',
  database: 'crud_clients',
});

app.use(cors());
app.use(express.json());

app.post("/register", (req, res) => {
  const { nome } = req.body;
  const { sobrenome } = req.body;
  const { data_nascimento } = req.body;
  const { rg } = req.body;
  const { cpf } = req.body;
  const { endereco } = req.body;
  const { cep } = req.body;
  const { cidade } = req.body;

  let SQL = "INSERT INTO clientes ( nome, sobrenome, data_nascimento, rg, cpf, endereco, cep, cidade) VALUES ( ?, ?, ?, ?, ?, ?, ?, ?)";

  db.query(SQL, [nome, sobrenome, data_nascimento, rg, cpf, endereco, cep, cidade], (err, result) => {
    if (err) console.log(err)
    else res.send(result);
  });
});

app.get("/getCards", (req, res) => {

  let SQL = "SELECT * FROM clientes";

  db.query(SQL, (err, results) => {
    if(err) console.log(err);
    else res.send(results);
  })
});

app.put("/edit", (req, res) => {
  const { id } = req.body;
  const { nome } = req.body;
  const { sobrenome } = req.body;
  const { data_nascimento } = req.body;
  const { rg } = req.body;
  const { cpf } = req.body;
  const { endereco } = req.body;
  const { cep } = req.body;
  const { cidade } = req.body;

  let SQL = "UPDATE clientes SET nome = ?, sobrenome = ?, data_nascimento = ?, rg = ?, cpf = ?, endereco = ?, cep = ?, cidade = ? WHERE idclientes = ?";

  db.query(SQL, [nome, sobrenome, data_nascimento, rg, cpf, endereco, cep, cidade, id], (err, results) => {
    if(err) console.log(err);
    else res.send(results);
  });
});

app.delete("/delete/:id", (req, res) => {
  const {id} = req.params;
  let SQL = "DELETE FROM clientes WHERE idclientes = ?";
  db.query(SQL, [id], (err, results) => {
    if(err) console.log(err);
    else res.send(results);
  });
});

app.listen(3001, () => {
  console.log('Server running on port 3001');
});