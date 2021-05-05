'use strict';
const bookData = require('../data/book'); // import module kết nối với cơ sở dữ liệu

const getListBook = async (req, res, next) => {
    try{
        const books  = await bookData.getListBook();
        res.send(books); //Thành công trả về list book
    }catch(err){
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}

module.exports = {
    getListBook // Xuất phương thức
}
