'use strict';
const config = require('../../../config');
const sql = require('mssql');

//ms sql server

const getListAccout = () => {
    let pool = new sql.ConnectionPool(config.sql); // kết nối với csdl với các config đã làm ở file config
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.accout;" // Lệnh query lấy danh sách book trong csdl
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
const searchAccout = (textSearch) => {
    const pattern = "%"+textSearch+"%";
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.accout WHERE name LIKE @pattern";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('pattern', sql.NVarChar, pattern)
            .query(query).then((recordset) => {
                pool.close();
                resolve(recordset.recordset)
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const createAccout = (data) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nINSERT INTO dbo.accout(name, password) VALUES (@name, @password);\nSELECT * FROM dbo.accout WHERE id = SCOPE_IDENTITY()";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('name', sql.NVarChar(255),data.name)
            .input('password', sql.NVarChar(255), data.password)
           
            .query(query).then(recordset => {
                pool.close();
                resolve(recordset.recordset[0])
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}

const getAccoutById = (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nSELECT * FROM dbo.accout WHERE id = @id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('id', sql.Int, id) // Truyền tham số vào query: tham số nhất là @book_id, thứ 2 là kiểu, thứ 3 là biến truyền vào
            .query(query).then(recordset => {
                pool.close();
                resolve(recordset.recordset) // Trả về một mảng các book
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const updateAccout = (data) => {
    console.log(data);
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nUPDATE dbo.accout SET name = @name, password = @password WHERE id = @id;\nSELECT * FROM dbo.accout WHERE id = @id";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('name', sql.NVarChar(255), data.name)
            .input('password', sql.NVarChar(255), data.password)
            .input('id', sql.Int, data.id)
            .query(query).then(recordset => {
                pool.close();
                resolve(recordset.recordset[0])
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
}
const deleteAccout = (id) => {
    let pool = new sql.ConnectionPool(config.sql);
    return new Promise((resolve, reject) => {
        const query = "USE book_store;\nDELETE dbo.accout WHERE id = @id;";
        pool.connect().then(() => {
            const request = new sql.Request(pool);
            request
            .input('id', sql.Int, id)
            .query(query).then(() => {
                pool.close();
                resolve({message: 'Delete successfully'})
            }).catch(err => {
                pool.close();
                reject(err);
            })
        }).catch(err => {
            reject(err);
        })
    })
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