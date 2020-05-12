var fs = require('fs');
var path = require('path');

function RemoveContain(base64Data) {
    if (base64Data.includes("data:image/jpeg;base64,"))
        return base64Data.replace("data:image/jpeg;base64,", "");
    if (base64Data.includes("data:image/png;base64,"))
        return base64Data.replace("data:image/png;base64,", "");
    if (base64Data.includes("data:image/jpg;base64,"))
        return base64Data.replace("data:image/jpg;base64,", "");
}

function createFolder(folderName) {
    let bigImage = path.join(__dirname, '../public/images/big');
    let smallImage = path.join(__dirname, '../public/images/small');
    let createFolder = [bigImage, smallImage];
    for (let ex of createFolder) {
        if (!fs.existsSync(ex)) {
            fs.mkdirSync(ex);
        }
    }
    let bigIdFolder = path.join(__dirname, '../public/images/big/' + folderName);
    let smallIdFolder = path.join(__dirname, '../public/images/small/' + folderName);
    let createIdFolder = [bigIdFolder, smallIdFolder];
    for (let ex of createIdFolder) {
        if (!fs.existsSync(ex)) {
            fs.mkdirSync(ex);
        }
    }
}

function writeImages(base64Data, originalImage, thumbNail) {
    fs.writeFile(originalImage, base64Data, 'base64', function (err) {
        if (err) {
            console.log(err);
        } else {
            var Jimp = require('jimp');
            Jimp.read(originalImage, (err, store) => {
                if (err) throw err;
                store.resize(150, 150).quality(60).write(thumbNail);
            });
        }
    });
}

function singleImage(Image, imageName, folderName) {
    if (Image.length > 0) {
        createFolder(folderName);
        let originalImage = path.join(__dirname, '../public/images/big/' + folderName + '/' + i + '_' + imageName + '.jpg');
        let thumbNail = path.join(__dirname, '../public/images/small/' + folderName + '/' + i + '_' + imageName + '.jpg');
        var base64Data = RemoveContain(Image[0]);
        writeImages(base64Data, originalImage, thumbNail);
    }
}

function multipleImage(Image, imageName, folderName) {
    if (Image.length > 0) {
        createFolder(folderName);
        for (var i = 0; i < Image.length; i++) {
            let originalImage = path.join(__dirname, '../public/images/big/' + folderName + '/' + i_imageName + '.jpg');
            let thumbNail = path.join(__dirname, '../public/images/small/' + folderName + '/' + i_imageName + '.jpg');
            var base64Data = RemoveContain(Image[i]);
            writeImages(base64Data, originalImage, thumbNail);
        }
    }
}

function removeImage(imageName, folderName) {
    let originalImage = path.join(__dirname, '../public/images/big/' + folderName + '/' + imageName + '.jpg');
    let thumbNail = path.join(__dirname, '../public/images/small/' + folderName + '/' + imageName + '.jpg');
    let removeFolder = [originalImage, thumbNail];
    for (let ex of removeFolder) {
        if (fs.existsSync(ex)) {
            fs.unlink(ex, (err) => {
                return;
            });
        }
    }
}

module.exports = {
    oneImage: (image, id, fileType) => {
        singleImage(image, id, fileType);
    },

    multiImage: (image, id, fileType) => {
        multipleImage(image, id, fileType);
    },

    removeImage: (id, fileType) => {
        removeImage(id, fileType);
    }
};