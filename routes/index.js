var express = require('express');
var router = express.Router();
const ccap = require('ccap');
var crypto = require('crypto');
var _md5 = function (text) {
  var md5 = crypto.createHash('md5');
  text = (text || '').toString();
  return md5.update(text).digest('base64');
};
var gen_fuc = function () {
  return Math.random().toString(30).slice(2, 6);
};


/* GET home page. */
router.get('/', function (req, res, next) {
  var width = req.query.width || '';
  var height = req.query.height || '';
  var offset = req.query.offset || 30;
  var quality = req.query.quality || 100;
  var fontsize = req.query.fontsize || 40;

  offset = ~~offset;
  quality = ~~quality;
  fontsize = ~~fontsize;

  width = ~~width;
  height = ~~height;

  width = Math.min(width, 1000);
  width = Math.max(width, 128);

  height = Math.min(height, 500);
  height = Math.max(height, 48);

  // return res.send({
  //   width: width,
  //   height: height
  // });
  var ary = ccap({
    width: width,
    height: height,
    offset: offset,
    quality: quality,
    fontsize: fontsize,
    generate: gen_fuc
  }).get();
  var txt = ary[0];
  var buf = ary[1];
  res.writeHeader(200, {
    'x-tag': _md5(txt)
    //'Content-Type': 'text/jpeg'
  });
  res.end(buf);

  // res.render('index', {
  //   title: 'Express'
  // });
});

module.exports = router;