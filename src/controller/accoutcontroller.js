'use strict';
const accoutData = require('../data/accout'); // import module kết nối với cơ sở dữ liệu

const getListAccout = async (req, res, next) => {
    console.log(req.query, req.params, req.body);
    try {
        const accout = await accoutData.getListAccout();
        res.status(200).json(accout); //Thành công trả về list book
    } catch (err) {
        res.status(400).send(err.message); // trả về lỗi thì lấy dữ liệu thất bại
    }
}
const searchAccout = async (req, res, next) => {
    try {
        const text_search = req.query.text_search; // get text search by query
        if (text_search.length > 0) {
            const accout = await accoutData.searchAccout(text_search);
            res.send(accout);
        } else {
            res.send({ message: 'There is no text search to searching' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}
const createAccout = async (req, res, next) => {
    try {
        let data = req.body;
        if(!req.body.name){
            return res.status(400).json({message: "chua co ten"});
        }
        const accout = await accoutData.createAccout(data);
        res.send(accout);
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const getAccoutById = async (req, res, next) => {
    console.log(req.params);
    try {
        let id = req.params.id;
    
        if (id) { //Kiểm trả id
            id = parseInt(id);
            if(Number.isInteger(id)){
                const accout = await accoutData.getAccoutById(id);
                res.send(accout[0]); // trả về một phần tử vì id là duy nhất
            }else{
                res.send({message: "not a number"})
            }
        } else {
            res.send({ message: 'Id is not valid' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

const updateAccout = async (req, res, next) => {
    try {
        const id = req.params.id;
        let data = req.body;
        data.id = id;
        const accout = await accoutData.updateAccout(data);
        res.send(accout);
    } catch (err) {
        res.status(400).send(err.message);
    }
}
const deleteAccout = async (req, res, next) => {
    try {
        let id = req.params.id;
        if (id) {
            id = parseInt(id);
            const message = await accoutData.deleteAccout(id);
            res.send(message);
        } else {
            res.send({ message: 'Id is not valid' });
        }
    } catch (err) {
        res.status(400).send(err.message);
    }
}

module.exports = {
    getListAccout,
    searchAccout,
    createAccout,
    getAccoutById,
    updateAccout,
    deleteAccout,

    // Xuất phương thức
}