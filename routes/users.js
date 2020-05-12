var express = require('express');
var router = express.Router();

const imageUpload = require('../shared/imageUpload');

const classData = (request) => {
  var imageList = request.body.imageList || '';
  if (imageList.length > 0)
    imageList = JSON.parse(request.body.imageList) || '';
  else
    imageList = '';

  return {
    imageList
  };
};

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.post('/uploadImage/', async function (request, response) {
  let Data = classData(request);
  let id = 1; // here is your image name
  imageUpload.oneImage(Data.imageList, id, 'FolderName');
});

module.exports = router;