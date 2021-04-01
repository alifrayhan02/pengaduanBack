const express = require("express")
const models = require("../models/index")
const pengaduan = models.pengaduan
const app = express()

const multer = require("multer")
const path = require("path")
const fs = require("fs")
const tanggapan = require("../models/tanggapan")

const auth = require("../auth")
app.use(auth)


app.get("/detail/:nik", async (req, res) => {
    let param = { nik: req.params.nik }
    let result = await pengaduan.findAll({
        where: param,
        include: [{ model: models.tanggapan, as: "tanggapan", }]
    })
    res.json(result)
})



// config storage image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./image")
    },
    filename: (req, file, cb) => {
        cb(null, "img-" + Date.now() + path.extname(file.originalname))
    }
})
let upload = multer({ storage: storage })


app.get("/", (req, res) => {
    pengaduan.findAll()
        .then(pengaduan => {
            res.json(pengaduan)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.get("/:id_pengaduan", (req, res) => {
    pengaduan.findOne({ where: { id_pengaduan: req.params.id_pengaduan } })
        .then(pengaduan => {
            res.json(pengaduan)
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.post("/", upload.single("image"), (req, res) => {
    if (!req.file) {
        res.json({
            message: "No uploaded file"
        })
    } else {
        let data = {
            nik: req.body.nik,
            pelapor: req.body.pelapor,
            isi_laporan: req.body.isi_laporan,
            status: req.body.status,
            image: req.file.filename,
            pelapor: req.body.pelapor,
        }
        pengaduan.create(data)
            .then(result => {
                res.json({
                    message: "data has been inserted",
                    data: result
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })


    }
})

app.put("/", upload.single("image"), async (req, res) => {
    let param = { id_pengaduan: req.body.id_pengaduan }
    let data = {
        nik: req.body.nik,
        pelapor: req.body.pelapor,
        isi_laporan: req.body.isi_laporan,
        status: req.body.status,
        pelapor: req.body.pelapor,
        tanggapan: req.body.tanggapan,
        petugas: req.body.petugas,
    }
    if (req.file) {
        // get data by id
        const row = await pengaduan.findOne({ where: param })
        let oldFileName = row.image

        // delete old file
        let dir = path.join(__dirname, "../image", oldFileName)
        fs.unlink(dir, err => console.log(err))


        // set new filename
        data.image = req.file.filename
    }

    pengaduan.update(data, { where: param })
        .then(result => {
            res.json({
                message: "data has been updated",
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

app.delete("/:id_pengaduan", async (req, res) => {
    try {
        let param = { id_pengaduan: req.params.id_pengaduan }
        let result = await pengaduan.findOne({ where: param })
        let oldFileName = result.image

        // delete old file
        let dir = path.join(__dirname, "../image", oldFileName)
        fs.unlink(dir, err => console.log(err))

        // delete data
        pengaduan.destroy({ where: param })
            .then(result => {
                res.json({
                    message: "data has been deleted",
                })
            })
            .catch(error => {
                res.json({
                    message: error.message
                })
            })

    } catch (error) {
        res.json({
            message: error.message
        })
    }
})

app.get("/get/:nik", async (req, res) => {
    let param = { nik: req.params.nik }
    let result = await pengaduan.findAll({
        where: param,

    })
    res.json(result)
})

app.get("/get/status/:status", async (req, res) => {
    let param = { status: req.params.status }
    let result = await pengaduan.findAll({
        where: param,

    })
    res.json(result)
})

app.get("/get/:id_petugas", async (req, res) => {
    let param = { id_petugas: req.params.id_petugas }
    let result = await pengaduan.findAll({
        where: param,

    })
    res.json(result)
})

// app.get("/detail/tang/semua", async (req, res) => {
//     let result = await pengaduan.findAll({
//         include: [
//             "pet",
//             {
//                 model: models.petugas,
//                 as: "petugas",
//                 include: ["petugas"]
//             }
//         ]
//     })
//     res.json(result)
// })

app.get("/detail/tang/tes", async (req, res) => {
    let result = await pengaduan.findAll({
        include: [{
            model: models.tanggapan, as: "tanggapan",

        }],

    })

    console.log(result)
    res.json(result)
})

module.exports = app