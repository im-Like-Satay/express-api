const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
const db = require("./conection");
const response = require("./response");
const e = require("express");

app.use(bodyParser.json());

// END POINT
app.get("/", (req, res) => {
  const sql = "SELECT * FROM siswa";

  db.query(sql, (error, result) => {
    if (error) return response(500, null, "server error :(", res);
    return response(200, result, "get data success :)", res);
  });
});

app.get("/siswa", (req, res) => {
  const nis = req.query.nis;
  const sql = `SELECT * FROM siswa WHERE nis = ?`;

  if (!nis) return response(400, null, "nis harus diisi :(", res);
  if (isNaN(nis)) return response(400, null, "nis harus berupa angka :(", res);

  db.query(sql, [nis], (error, result) => {
    if (error) response(500, null, "server error", res);
    if (result.length === 0)
      return response(404, null, "data tidak ditemukan :(", res);
    return response(200, result, "find data success :)", res);
  });
});

app.post("/siswa", (req, res) => {
  const { nis, namaLengkap, kelas, alamat, noTlp } = req.body;
  const sql = `INSERT INTO siswa (nis, nama_lengkap, kelas, alamat, no_tlp) VALUES (?, ?, ?, ?, ?)`;

  db.query(sql, [nis, namaLengkap, kelas, alamat, noTlp], (error, result) => {
    return response(200, result, "insert success, mantap jaya :)", res);
  });
});

app.delete("/siswa", (req, res) => {
  const { nis, namaLengkap, kelas, alamat, noTlp } = req.body;
  const sql = `DELETE FROM siswa WHERE nis = ?`;

  db.query(sql, [nis, namaLengkap, kelas, alamat, noTlp], (error, result) => {
    return response(200, result, "delete success, mantap jaya :)", res);
  });
});

// PORT LISTENER
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
