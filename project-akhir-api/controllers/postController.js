const conn = require('../database')
const { uploader } = require('../routers/Uploader/uploader')
var fs = require('fs');

module.exports = {
    getConfirmOrNotPosts: (req, res) => {
        var sql = `SELECT * FROM posts JOIN transactions on posts.id = transactions.post_id `
        if(req.params.status !== 'Filter') {
            sql += `WHERE status = '${req.params.status}'`
        }
        sql += `ORDER BY publish_date DESC`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    getPosts: (req, res) => {
        var sql = `SELECT p.*, transactions.id AS idTransaction, transactions.image, transactions.status FROM posts as p JOIN transactions on p.id = transactions.post_id ORDER BY publish_date desc`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    getPostsByUserId: (req, res) => {
        var sql = `SELECT * FROM posts JOIN transactions on posts.id = transactions.post_id  WHERE posts.user_id = ${req.params.user_id} ORDER BY publish_date DESC`
        conn.query(sql, (err, results) => {
            console.log('Ini results getpostbyid')
            console.log(results)
            if(err) throw err;
            res.send(results)
        })
    },
    getSudahBayarPosts: (req, res) => {
        var sql = 
        `
        SELECT posts.*, t.status, t.image, t.user_id, t.post_id FROM posts JOIN transactions t on posts.id = t.post_id
        WHERE status = 'Confirmed' ORDER BY publish_date desc`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            console.log(results)
            res.send(results)
        })
    },
    updateBelumBayarToSudahPosts: (req, res) => {
        console.log(req.body)
        console.log(req.params)
        var sql = `UPDATE transactions SET status = '${req.body.status}' WHERE id = ${req.params.id}`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    deleteBelumBayarToSudahPosts: (req, res) => {
        var sql = `DELETE FROM posts WHERE id = ${req.params.id}`
        conn.query(sql, req.body, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    getPostsById: (req, res) => {
        var sql = `SELECT * FROM posts JOIN transactions ON posts.id = transactions.post_id WHERE transactions.post_id = ${req.params.id}`
        conn.query(sql, (err, results) => {
            console.log(results)
            if(err) throw err;
            res.send(results)
        })
    },
    addPosts: (req, res) => {
        try {
            const path = '/post/images'; //file save path
            const upload = uploader(path, 'POS').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image } = req.files;
                // console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                // console.log(imagePath)
    
                // console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                // console.log(data)
                data.profile_image = imagePath;
                
                var total = data.total
                delete data.total
                var sql = `INSERT INTO posts SET ?`
                conn.query(sql, data, (err, results) => {
                    if(err) throw err;
                    let dataTransactions = {
                        post_id: results.insertId,
                        user_id: data.user_id,
                        status: 'Waiting Confirmation',
                        total
                    }
                    console.log(dataTransactions)
                    var sql = `INSERT INTO transactions SET ?`
                    conn.query(sql, dataTransactions, (err, results2) => {
                        if(err) throw err;
                        res.send(results)
                    })
                })
            })
        } catch(err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    },
    editPosts: (req, res) => {
        var sql = `UPDATE posts SET ? WHERE id = ${req.params.id}`
        conn.query(sql, req.body, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    deletePosts: (req, res) => {
        console.log(req.params)
        var sql = `DELETE FROM posts WHERE id = ${req.params.id}`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            sql = `DELETE FROM transactions WHERE post_id = ${req.params.id}`
            conn.query(sql, (err, results) => {
                if(err) throw err;
                res.send(results)
            })
        })
    },
    uploadPembayaran: (req, res) => {
        // var sql = `SELECT * FROM posts WHERE id = ?`
        try {
            const path = '/post/images'; //file save path
            const upload = uploader(path, 'POS').fields([{ name: 'image'}]); //uploader(path, 'default prefix')
    
            upload(req, res, (err) => {
                if(err){
                    return res.status(500).json({ message: 'Upload picture failed !', error: err.message });
                }
    
                const { image } = req.files;
                // console.log(image)
                const imagePath = image ? path + '/' + image[0].filename : null;
                // console.log(imagePath)
    
                // console.log(req.body.data)
                const data = JSON.parse(req.body.data);
                // console.log(data)
                data.image = imagePath;
                
                var sql = `UPDATE transactions SET image = '${imagePath}' WHERE post_id =  ${req.params.id}`;
                conn.query(sql, (err, results) => {
                    if(err) {
                        console.log(err.message)
                        fs.unlinkSync('./public' + imagePath);
                        return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
                    }
                   
                    console.log(results);
                    res.send(results);
                })    
            })
        } catch(err) {
            return res.status(500).json({ message: "There's an error on the server. Please contact the administrator.", error: err.message });
        }
    }
}