const conn = require('../database')
const Crypto = require('crypto')

module.exports = {
    loginPost: (req,res) => {
        var email = req.body.email
        var password = Crypto.createHmac("sha256", "puripuriprisoner")
        .update(req.body.password).digest("hex");
        console.log(req.body)
        console.log(password)
        if(email && password) {
            var sql = `SELECT * FROM users WHERE email = ? AND password = ?`
            conn.query(sql, [email, password], (err, results) => {
                if(results.length > 0){
                    req.session.loggedin = true;
                    req.session.email = email;
                    return res.status(200).send(results)
                } else {
                    res.status(200).send({message: 'Incorrect Email or Password'})
                }
                res.end();
            })
        } else {
            res.send('Please enter Email and Password!')
            res.end();
        }
    },
    keepLogin: (req, res) => {
        var sql = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`
        conn.query(sql, (err, results) => {
            if(err) throw err;
            if(results.length > 0){
                req.session.loggedin = true;
                req.session.email = req.body.email;
                return res.status(200).send(results)
            } else {
                res.send('Incorrect Email and Password!')
            }
        }) 
    }
}