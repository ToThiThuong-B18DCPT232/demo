'use strict';
var express = require('express'); //import module express
const config = require('./config'); // để lấy config từ file config
const cors = require('cors'); //import modul cors

var app = express(); //khoi tao express app
const bookRouter = require('./src/router/bookRouter'); // import router
const accoutrouter = require('./src/router/accoutrouter');
const pageRouter = require('./pageRouter');


app.use("/static", express.static("public"));

app.use(cors()); // cho phep do main nao truy request den api 
app.use(express.json()); // để sử dụng json
app.use(express.urlencoded({ extended: true }));
app.use('/api/books', bookRouter.routes); // http://localhost:8031/api/books url để tạo request
app.use('/api/accout', accoutrouter.routes);
app.use("/", pageRouter.routes);

app.listen(config.port, () => { //Lắng nghe và chạy server
	//Nếu thành công sẽ in ra dùng ntn trong console.log
	console.log('Server is running on http://localhost:' + config.port);
});


