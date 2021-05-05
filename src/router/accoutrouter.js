'use strict';

const express = require('express');
const router = express.Router();

const accoutcontroller = require('../controller/accoutcontroller'); // import controller

router.get('/', accoutcontroller.getListAccout); // Định nghĩa phương thức get sẽ lấy dữ liệu sách ra tại "/" http://localhost:8031/api/accout
router.get('/search', accoutcontroller.searchAccout); // http://localhost:8031/api/accout/search?text_search=thuong
router.post('/', accoutcontroller.createAccout);
router.get('/:id', accoutcontroller.getAccoutById);
router.put('/:id', accoutcontroller.updateAccout);//http://localhost:8031/api/accout/3
router.delete('/:id', accoutcontroller.deleteAccout);

module.exports = {
    routes: router //Xuất router
}