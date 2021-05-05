	'use strict';
	const config = require('../../../config');
	const sql = require('mssql');
	
	//ms sql server
	
	const getListBook = () => {
	    let pool = new sql.ConnectionPool(config.sql); // kết nối với csdl với các config đã làm ở file config
	    return new Promise((resolve, reject) => {
	        const query = "USE book_store;\nSELECT * FROM dbo.book;" // Lệnh query lấy danh sách book trong csdl
	        pool.connect().then(() => { // Tạo kết nối
	            const request = new sql.Request(pool); // Tạo request
	            request.query(query).then(recordset => { //Tiến hành query
	                pool.close(); //Đóng kết nối
	                resolve(recordset.recordset) // trả về dữ liệu lấy được
	            }).catch(err => {
	                pool.close(); //Đóng kết nối
	                reject(err); //Trả về lỗi khi query thất bại
	            })
	        }).catch(err => {
	            reject(err); //Trả về lỗi khi kết nối với cơ sở dữ liệu thất bại
	        })
	    })
	}


	module.exports = {
	    getListBook // Xuất phương thức
	}
