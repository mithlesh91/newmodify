const songmodel = require('../models/songmodels')
const fileupload = require('../service/upload.image')
const id3 = require('node-id3')

async function songupload(req, res) {
    const songbufffer = req.file.buffer
    const { mood } = req.body
    const tags = id3.read(songbufffer)
    console.log(tags)
    const [songFile, posterFile] = await Promise.all([
        fileupload({
            buffer: songbufffer,
            filename: tags.title + '.mp3',
            folder: 'songs'
        }),
        fileupload({
            buffer: tags.image.imageBuffer,
            filename: tags.title + '.jpeg',
            folder: 'posters'
        })
    ])
    const newSong = await songmodel.create({
        songurl: songFile.url,
        posterUrl: posterFile.url,
        title: tags.title,
        mood: mood
    })
    res.status(201).json({
        message: 'song uploaded successfully',
        newSong
    })
}

async function getallsongs(req, res) {
    const { mood } = req.query
    console.log("Mood from frontend:", mood)
    const allsongs = await songmodel.findOne(
       { mood}
    )
   
    if (!allsongs) {
        return res.status(404).json({
            message: 'no songs found for the given mood'
        })
    }


    res.status(200).json({
        message: 'songs fetched successfully',
        allsongs
    })
}


module.exports = {
    songupload,
    getallsongs
}
