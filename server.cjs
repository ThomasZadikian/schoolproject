const express = require('express');
const path = require('path');
const cors = require('cors');
const userDelete = require('./src/core/services/userServices/userDeleteService.cjs')
const userCreate = require('./src/core/services/userServices/userCreateService.cjs')
const userLogin = require('./src/core/services/userServices/userLoginService.cjs')
const portfolioCreate = require('./src/core/services/portfolioServices/portfolioCreateService.cjs')

const app = express();
const PORT = process.env.PORT || 3000; 

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'dist')));

app.post('/api/delete', userDelete); 
app.post('/api/create', userCreate);
app.post('/api/login', userLogin);
app.post('/api/createPortfolio', portfolioCreate);

app.listen(PORT, function() {
  console.log('Server running on port ' + PORT);
});
