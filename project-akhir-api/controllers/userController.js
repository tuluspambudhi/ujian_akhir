const conn = require('../database');
const Crypto = require('crypto')
const transporter = require('../helpers/mailer')

module.exports = {
    getUsers: (req, res) => {
        const sql = 'SELECT * FROM users';
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    getUsersById: (req, res) => {
        const sql = `SELECT * FROM users WHERE id = ${req.params.id}`;
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    getUsersByEmailPass: (req, res) => {
        const sql = `SELECT email, password FROM users`;
        conn.query(sql, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    addUsers: (req, res) => {
        var data = req.body;
        var hashPassword = Crypto.createHmac("sha256", "puripuriprisoner")
                            .update(data.password).digest("hex");
            data.password = hashPassword
        var sql = `INSERT INTO users SET ?`
        conn.query(sql, data, (err, results) => {
            if(err) throw err;

            var linkVerifikasi = `http://localhost:3000/verified?email=${data.email}&password=${hashPassword}`;
            var mailOptions = {
                from: 'Tulus <heybrdwy@gmail.com>',
                to : data.email,
                subject: 'Verifikasi Email untuk Dev',
                html: `Tolong click link ini untuk verifikasi : 
                        <a href="${linkVerifikasi}">Join Dev!</a>`
            }

            sql = `SELECT * FROM users WHERE id = ${results.insertId}`
            conn.query(sql, (err, results) => {
                if(err) throw err;

                transporter.sendMail(mailOptions, (err2,res2) => {
                    if(err2) { 
                        console.log(err2) 
                        return res.status(500).send({ status: 'error', err: err2 })
                    }
                    console.log('Success!')
                    res.status(200).send(results)
                })

            })
        })
    },
    editUsers: (req, res) => {
        var sql = `UPDATE users SET ? WHERE id = ${req.params.id}`
        conn.query(sql, req.body, (err, results) => {
            if(err) throw err;
            res.send(results)
        })
    },
    emailVerifikasi: (req,res) => {
        var { email, password } = req.body;
        var sql = `Select * from users where email='${email}'`;
        conn.query(sql, (err,results) => {
            if(err) return res.status(500).send({ status: 'error', err })

            if(results.length === 0) {
                return res.status(500).send({ status: 'error', err: 'User Not Found!'})
            }

            sql = `Update users set user_status = 'Verified' where email = '${email}' and password = '${password}'`
            conn.query(sql, (err,results1) => {
                if(err) return res.status(500).send({ status: 'error', err })

                res.status(200).send(results)
            })
        })
    },
    resendEmailVer: (req,res) => {
        var { email } = req.body;

        var sql = `SELECT * from users where email='${email}'`
        conn.query(sql, (err,results) => {
            if(err) return res.status(500).send({ status: 'error', err })

            if(results.length === 0) {
                return res.status(500).send({ status: 'error', err: 'User Not Found!'})
            }

            var linkVerifikasi = `http://localhost:3000/verified?email=${results[0].email}&password=${results[0].password}`;
            var mailOptions = {
                from: 'Tulus <heybrdwy@gmail.com>',
                to: results[0].email,
                subject: 'Verifikasi Email untuk Instagrin',
                html: `Tolong click link ini untuk verifikasi : 
                        <a href="${linkVerifikasi}">Join Dev</a>`
            }

            transporter.sendMail(mailOptions, (err2,res2) => {
                if(err2) { 
                    console.log(err2) 
                    return res.status(500).send({ status: 'error', err: err2 })
                }
                
                console.log('Success!')
                return res.status(200).send(results)
            })
        })
    },

}