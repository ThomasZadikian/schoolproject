const express = require('express');
const path = require('path');
const cors = require('cors');
const userDelete = require('./src/core/services/userServices/userDeleteService.cjs')
const userCreate = require('./src/core/services/userServices/userCreateService.cjs')
const userLogin = require('./src/core/services/userServices/userLoginService.cjs')
const portfolioCreate = require('./src/core/services/portfolioServices/portfolioCreateService.cjs')
const imageUploadService = require('./src/core/services/artworkServices/imageUploadService.cjs')
const imageRetrieveService = require('./src/core/services/artworkServices/imageRetrieveService.cjs')
var bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.static(path.join(__dirname, 'dist')));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(express.json());

app.post('/api/delete', userDelete); 
app.post('/api/create', userCreate);
app.post('/api/login', userLogin);
app.post('/api/createPortfolio', portfolioCreate);
app.post('/api/imageUploadService', imageUploadService);
app.post('/api/imageRetrieveService', imageRetrieveService);

app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
