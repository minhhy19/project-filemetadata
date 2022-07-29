const bodyParser = require('body-parser');
const multer  = require('multer');
var express = require('express');
var cors = require('cors');
require('dotenv').config()

const upload = multer({ dest: 'uploads/' })

var app = express();
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(bodyParser.json());

app.use(cors());
app.use(express.json());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', upload.single('upfile'), async function (req, res) {
  console.log(req.file);
  if (req.file) {
    const { originalname, mimetype, size } = req.file;
    res.json({
      name: originalname,
      type: mimetype,
      size
    });
  } else {
    res.json('File not found')
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
