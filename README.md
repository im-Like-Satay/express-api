## Cuyschool
Cuyschool adalah sebuah repo github pribadi, yang dibuat untuk mengembangkan skil bahasa pemrograman Javascript 

## 🚀 Quick Start

```bash
# Install dependencies
npm install OR npm i

# Start development server with hot reload
npm run dev # OR use pm2 for prod 

# View interactive API documentation
open http://localhost:3000
```

## Feature
  - `GET /` Select all data from tables
  - `GET /siswa?nis={number of nis}` Search data from nis
  - `POST /siswa` Input data. Payload :
```json
{
  "nis": "10002",
  "nama_lengkap": "aldo sudewo",
  "alamat": "jln rahmad subandoy 333",
  "no_tlp": "11111"
}
```
  - `DELETE /siswa` Delete data (Experimental)


