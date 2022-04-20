const nodemailer = require('nodemailer')

const generateResetPasswordTemplate = (url) => {
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
                <div style="max-width: 620px; margin: 0 auto; font-family: sans-serif; color: #272727">
                    <h1 style="background: #f6f6f6; padding: 10px; text-align: center; color: #272727;">Response to your reset password request</h1>
                    <p style="color: #272727;">Click the link below to reset your password</p>
                    <div style="text-align: center;">
                        <a href="${url}" style="font-family: sans-serif; margin: 0 auto; padding: 20px; text-align: center;
                        background: #e63946; border-radius: 5px; font-size: 20px 10px; color: #fff; cursor: pointer;
                        text-decoration: none; display: inline-block;">
                            Reset Password
                        </a>
                    </div>
                </div>
            </body>
        </html>
    `
}

const plainEmailTemplate = (heading, message) => {
    return `
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equip="X-UA-Compatible" content="IE=edge">
                <style>
                    @media only and screen (max-width: 620px) {
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
                        ${heading}
                    </h1>
                    <p style="color: #272727; text-align: center;">${message}</p>
                </div>
            </body>
        </html>
    `
}

module.exports = { generateResetPasswordTemplate, plainEmailTemplate }