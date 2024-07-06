const express = require("express");
const mysql = require("mysql2");
const app = express();
const cors = require("cors");
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "nay%@%45nayemahmed",
  database: "college",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  const sql = "SELECT * FROM info ORDER BY Roll";
  db.query(sql, (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

app.post("/create", (req, res) => {
  const sql = "INSERT INTO info (`Roll`,`Name`,`Gender`) VALUES (?)";
  const Values = [req.body.Roll, req.body.Name, req.body.Gender];
  db.query(sql, [Values], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});
app.put("/update/:id", (req, res) => {
  const sql = "update info set Roll = ?, Name = ?, Gender = ? where id = ?";
  const Values = [req.body.Roll, req.body.Name, req.body.Gender];

  const id = req.params.id;
  db.query(sql, [...Values, id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});
app.delete("/delete/:id", (req, res) => {
  const sql = "delete from info where id = ?";
  const id = req.params.id;
  db.query(sql, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

app.get("/getrecord/:id", (req, res) => {
  const id = req.params.id;
  const sql = "select * from info where id = ?";
  db.query(sql, [id], (err, data) => {
    if (err) return res.json({ Error: "Error" });
    return res.json(data);
  });
});

module.exports = app;
