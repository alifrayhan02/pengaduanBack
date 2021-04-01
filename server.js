const express = require("express")
const app = express()
const cors = require("cors")
app.use(cors())

const petugas = require("./router/petugas")
const masyarakat = require("./router/masyarakat")
const pengaduan = require("./router/pengaduan")
const tanggapan = require("./router/tanggapan")

app.use("/store/api/v1/petugas", petugas)
app.use("/store/api/v1/masyarakat", masyarakat)
app.use("/store/api/v1/pengaduan", pengaduan)
app.use("/store/api/v1/tanggapan", tanggapan)

app.use(express.static(__dirname))


app.listen(8000, () => {
    console.log("Server run on port 8000");
})