'use strict';

const express = require('express');
const router = express.Router();

const bookController = require('../controller/bookController'); // import controller
//http://localhost:8031/api/books
router.get('/', bookController.getListBook); // Định nghĩa phương thức get sẽ lấy dữ liệu sách ra tại "/"
module.exports = {
    routes: router //Xuất router
}
