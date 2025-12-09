const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
// const db = require("./conection"); // gunakan untuk database mysql
const pool = require("./conection-pg"); // gunakan untuk database postgresql
const response = require("./response");

app.use(bodyParser.json());

// END POINT
app.get("/", (req, res) => {
  const sql = "SELECT * FROM siswa";

  pool.query(sql, (error, result) => {
    if (error) return response(500, null, "server error :(", res);
    return response(200, result.rows, "get data success :)", res);
  });
});

app.get("/siswa", (req, res) => {
  const nis = req.query.nis;
  const sql = `SELECT * FROM siswa WHERE nis = ?`;

  if (!nis) return response(400, null, "nis harus diisi :(", res);
  if (isNaN(nis)) return response(400, null, "nis harus berupa angka :(", res);

  pool.query(sql, [nis], (error, result) => {
    if (error) response(500, null, "server error", res);
    if (result.length === 0)
      return response(404, null, "data tidak ditemukan :(", res);
    return response(200, result.rows, "find data success :)", res);
  });
});

app.post("/siswa", (req, res) => {
  const { nis, nama_lengkap, alamat, no_tlp } = req.body;
  const sql = `INSERT INTO siswa (nis, nama_lengkap, alamat, no_tlp) VALUES ($1, $2, $3, $4)`;

  pool.query(sql, [nis, nama_lengkap, alamat, no_tlp], (error, result) => {
    if (error) {
      console.log("Database Error:", error);
      return response(500, null, "server error", res);
    }
    return response(200, result.rows, "insert success, mantap jaya :)", res);
  });
});

app.delete("/siswa", (req, res) => {
  const { nis, nama_lengkap, alamat, no_tlp } = req.body;
  const sql = `DELETE FROM siswa WHERE nis = ?`;

  pool.query(sql, [nis, nama_lengkap, alamat, no_tlp], (error, result) => {
    return response(200, result.rows, "delete success, mantap jaya :)", res);
  });
});

// app.get("/test-endpoint", (req, res) => {
//   const sql = "SELECT * FROM siswa";

//   pool.query(sql, (error, result) => {
//     if (error) {
//       console.log("Database Error:", error);
//       return response(500, null, "server error", res);
//     }

//     // PostgreSQL mengembalikan result.rows
//     if (result.rows.length === 0) {
//       return response(404, null, "data tidak ditemukan", res);
//     }

//     return response(200, result.rows, "get all data success :)", res);
//   });
// });

// PORT LISTENER
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
