const express = require("express");
const mysql = require("mysql");
const cors = require('cors');
const bodyParser = require('body-parser')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todoapp'
});


const app = express();
var jsonParser = bodyParser.json()
const port = process.env.PORT || "8000";

/**
 * Setup Cors
 */
app.use(cors());

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  next();
});

app.get("/todo/list", (req, res) => {
  pool.getConnection(function (err, connection) {
    connection.query("SELECT * FROM todos", (err, result) => {
      if(err) {
        console.log(err); 
        res.json({"error":true});
      }
      else {
        const list = result.map(v => Object.assign({}, v));
        res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.status(200).json(list); 
      }
    });
  });
});

app.post("/todo/update", (req, res) => {
  pool.getConnection(function (err, connection) {
    const { id, uuid, title, description, priority, done } = req.body;
    connection.query("UPDATE todos SET ? WHERE id = ?", [{ uuid, priority, title, description, done}, id], (err, result, fields) => {
      if(err) {
        console.log(err); 
        res.json({"error":true});
      }
      else {
        if (result.affectedRows !== 0) {
          res.status(200).json({ status: 'not updated' });
        }
      }
    });
  });
});

app.post("/todo/add", (req, res) => {
  pool.getConnection(function (err, connection) {
    const { uuid, title, description, priority, done } = req.body;
    const query = `INSERT INTO \`todos\`(uuid, priority, title, description, done) VALUES ("${uuid}", "${priority}", "${title}", "${description}", 0)`;
    connection.query(query, (err, result, fields) => {
      if(err) {
        console.log(err); 
        res.json({"error":true});
      }
      else {
        if (result.affectedRows !== 0) {
          res.status(200).json({ status: 'not updated' });
        }
      }
    });
  });
});

app.listen(port, () => {
  console.log(`Listening to requests on http://localhost:${port}`);
});