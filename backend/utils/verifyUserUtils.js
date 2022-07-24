const nodemailer = require('nodemailer')

const generateCode = () => {
    let verCode = ''

    for (let i = 0; i <= 3; i++) {
        const randomNum = Math.round(Math.random() * 9)
        verCode += randomNum
    }
    
    return verCode
}

const emailTransport = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    auth: {
        // Palitan mo to ng values sa .env
        user: "qjasalvador@tip.edu.ph",
        pass: "tipofthetopoftheworld"
    }
})

// Function we're going to use to send the verification code to the user's email
const mailTransport = () => nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USERNAME,
        pass: process.env.MAILTRAP_PASSWORD
    }
});

const emailTemplate = (code) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <style>
                @media only screen and (max-width: 620px) {
                    h1 {
                        font-size: 20px;
                        padding: 5px;
                    }
                }
            </style>
        </head>
        <body>
            <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727;">
                <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">
                    Thank you for registering and we hope that you would enjoy using the application.
                </h1>
                <p>To verify your account, use this code to be able to login:</p>
                <p style="width: 80px; margin: 0 auto; font-weight: bold; text-align: center; background: #f6f6f6; border-radius: 5px; font-size: 25px;">${code}</p>
            </div>
        </body>
    `
}

module.exports = { generateCode, mailTransport, emailTransport, emailTemplate } 