const sendInterviewSchedTemplate = (date, time) => {
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
                <p>Message</p>
                <p>Good day, we would like to invite you to an interview to assess whether or not you are qualified to adopt the animal you applied to adopt.</p>

                <p>Interview Details (Date and Time)</p>
                <p>Date: <span>${date}</span></p>
                <p>Time: <span>${time}</span></p>
            </div>
        </body>
        </html>
    `
}

const rejectAdoptionTemplate = (adopterName, animalName) => {
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
                <p>Message</p>
                <p>
                    Good day ${adopterName}, we would like to inform you that your application to adopt ${animalName} has been rejected
                </p>
            </div>
        </body>
        </html>
    `
}

const pickupTemplate = (pickupDate, pickupTime, animalName, adopterName) => {
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
                <p>Message</p>
                <p>
                    Good day ${adopterName}, we would like to inform you that your application to adopt ${animalName} has been approved
                    and you can pickup your new pet on ${pickupDate} at exactly ${pickupTime}, Have a wonderful day.
                </p>
            </div>
        </body>
        </html>
    `
}

module.exports = { sendInterviewSchedTemplate, pickupTemplate }