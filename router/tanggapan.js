const express = require("express")
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: true}))

const models = require("../models/index")
const tanggapan = models.tanggapan
const pengaduan = models.pengaduan

const auth = require("../auth")


app.get("/", auth, async(req, res) => {
    let result = await tanggapan.findAll()
    res.json(result)
})

app.get("/detail", async (req, res) =>{
    let result = await tanggapan.findAll({
        include: ["pengaduan"]
    })
    res.json(result)
})

app.put("/", auth, async(req, res) => {
    let param = { id_tanggapan: req.body.id_tanggapan}
    let data = {
        tanggapan: req.body.tanggapan,
      
    }

    tanggapan.update(data, {where: param})
    .then(result => {
        res.json({
            message: "data has been updated"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

app.delete("/:id_tanggapan", auth, async(req, res) => {
    let param = {id_tanggapan: req.params.id_tanggapan}
    tanggapan.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})
app.delete("/adu/:id_pengaduan",auth, async(req, res) => {
    let param = {id_pengaduan: req.params.id_pengaduan}
    tanggapan.destroy({where: param})
    .then(result => {
        res.json({
            message: "data has been deleted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.get("/:id_pengaduan", auth, (req, res) =>{
    tanggapan.findOne({ where: {id_pengaduan: req.params.id_pengaduan}})
    .then(tanggapan => {
        res.json(tanggapan)
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})


app.post("/",(req, res) => {
    let data = {
        tanggapan: req.body.tanggapan,
        id_pengaduan: req.body.id_pengaduan,
        id_petugas: req.body.id_petugas
    }

    tanggapan.create(data)
    .then(result => {
        res.json({
            message: "data has been inserted"
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})




module.exports = app