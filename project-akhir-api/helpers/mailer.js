const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'heybrdwy@gmail.com',
        pass: 'omeqafqoqwvvroxo'
    },
    tls: {
        rejectUnauthorized: false
    }
})

module.exports = transporter;