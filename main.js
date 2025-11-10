const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const db = require('./conection')
const response = require('./response')

app.use(bodyParser.json())

// END POINT
app.get('/', (req, res) => {
    const sql = "SELECT * FROM siswa"
    
    db.query(sql, (error, result) => {
        if (error) return response(500, null, "server error :(", res)
        return response(200, result, "get data success :)", res)
    })
})

app.get('/search', (req, res) => {
    const sql = `SELECT * FROM siswa WHERE nis = ${req.query.nis}`
    const nis = req.query.nis
    // if (!nis) response(400, null, "nis harus diisi :(", res)
    
    db.query(sql, (error, result) => {
        if (error) response(404, "user tidak ditemukan :(", "not found", res)
        response(200, result, "find data success :)", res)
    })
})

app.post('/siswa', (req, res) => {
    const { nis, namaLengkap, kelas, alamat } = req.body
    const sql = `INSERT INTO siswa (nis, nama_lengkap, kelas, alamat) VALUES (${nis}, '${namaLengkap}', '${kelas}', '${alamat}')`

    db.query(sql, (error, result) => {
        if (error) response(403, "user tidak ditemukan, atau:(", "not found", res)
        response(200, result, "update success, mantap jaya :)", res)
    })
})

app.delete("/delete", (req, res) => {

})


// PORT LISTENER
app.listen(port, () => {
    console.log(`http://localhost:${port}`)
})
