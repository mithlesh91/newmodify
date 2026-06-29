const ImageKit = require('@imagekit/nodejs').default

const upload = new ImageKit({
    privateKey:process.env.ImageKit_uri
})

async function uploadfile({buffer,filename,folder=''}){
    const file = await upload.files.upload({
        file: await ImageKit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    })
    return file
}
module.exports= uploadfile