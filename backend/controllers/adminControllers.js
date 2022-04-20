const Admin = require('../models/adminModel');
const Animal = require ('../models/animalModel') // The animal model
const UserFeedback = require('../models/userFeedbackModel')
const User = require('../models/userModel')
const Donation = require('../models/donationModel')
const DonationInventory = require('../models/donationInventoryModel.js')
const StrayAnimalReport = require('../models/strayAnimalReport')
const RegisterAnimal = require('../models/animalRegistrationModel')
const Adoption = require('../models/adoptionModel')
const InterviewSched = require('../models/interviewSchedModel')
const asyncHandler = require('express-async-handler');
const { generateToken } = require('../utils/generateToken');
const { emailTransport } = require('../utils/verifyUserUtils')
const { sendInterviewSchedTemplate, pickupTemplate } = require('../utils/emailTemplates');

const registerAdmin = asyncHandler(async (req, res) => {
    const { username, password, name } = req.body;

    // To check if an admin account exists
    const adminExists = await Admin.findOne({ username });

    // If an admin account already exists, we throw in an error
    if (adminExists) {
        res.status(400);
        throw new Error('Admin already exists.');
    }
    // If there's no equal admin account then create a new admin account
    // to create a new admin account
    const admin = await Admin.create({
        username,
        password,
        name,
    });

    // If the admin account was successfully created
    if (admin) {
        res.status(201).json({
            id: admin.id,
            username: admin.username,
            name: admin.name,
            token: generateToken(admin.id),
        })
    // If not an error occurs
    } else {
        res.status(400)
        throw new Error('Error Occured')
    }

    res.json({
        username,
        password,
        name,
    });
});

// Authenticating the account (logging in)
const authAdmin = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    // Finds the admin in the db
    const adminAcc = await Admin.findOne({ username });
    if (adminAcc && (await adminAcc.matchPassword(password))) {
        res.json({
            id: adminAcc.id,
            username: adminAcc.username,
            name: adminAcc.name,
            token: generateToken(adminAcc.id),
        });
    } else {
        res.status(400);
        throw new Error('Invalid Username or Password');
    }
});

const getFeedbacks = asyncHandler(async (req, res) => {
    const feedbacks = await UserFeedback.find()
    res.json(feedbacks);
})

const getReports = asyncHandler(async (req, res) => {
    const reports = await StrayAnimalReport.find()
    res.json(reports)
})

const getSpecificReport = asyncHandler(async (req, res) => {
    const report = await StrayAnimalReport.findById(req.params.id)

    if(report) {
        res.json(report)
    } else {
        res.status(404).json({ message: 'Could not find specific report.' })
    }
})

const dismissReport = asyncHandler(async (req, res) => {
    const { status } = req.body

    const report = await StrayAnimalReport.findById(req.params.id)
    if(report) {
        report.status = status
        const dismissedReport = await report.save()
        res.json(dismissedReport) 
    } else {
        res.status(404)
        throw new Error('Stray animal report was not found')
    }
})

const getAllRegistrations = asyncHandler(async (req, res) => {
    const registrations = await RegisterAnimal.find()
    res.json(registrations)
})

const registerAnimal = asyncHandler(async (req, res) => {
    const registration = await RegisterAnimal.findById(req.params.id)
    const registered = 'Registered'

    if(registration) {
        registration.registered = registered
        const updated = await registration.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Registration was not found.')
    }
})

const getAdoptionSubmissions = asyncHandler(async (req, res) => {
    const submissions = await Adoption.find()
    res.json(submissions)
})

const getAdoptionSubmissionPerAnimal = asyncHandler(async (req, res) => {
    const submissions = await Adoption.find({ animalId: req.params.id })
    
    if(submissions) {
        res.json(submissions)
    } else {
        res.status(404).json({ message: 'Could not find adoption applications'})
    }
})

const getAdoptionById = asyncHandler(async (req, res) => {
    const adoption = await Adoption.findById(req.params.id)

    if (adoption) {
        res.json(adoption)
    } else {
        res.status(404).json({ message: 'Could not find adoption application' })
    }
})

const deleteAdoptionById = asyncHandler(async (req, res) => {
    const adoption = await Adoption.findById(req.params.id)

    if(adoption) {
        await adoption.remove()
        res.json({ message: 'Successfully removed'})
    }
})

const updateAdoptionStatus = asyncHandler(async (req, res) => {
    const { adoptionStatus } = req.body
    const animal = await Animal.findById(req.params.id)

    if (animal) {
        animal.adoptionStatus = adoptionStatus

        const updated = await animal.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error(`Animal's data was not found`)
    }
})

const updateApplicationStatus = asyncHandler(async (req, res) => {
    const { adoptionStatus, applicationStatus } = req.body

    const adoption = await Adoption.findById(req.params.id)

    if (adoption) {
        adoption.adoptionStatus = adoptionStatus
        adoption.applicationStatus = applicationStatus

        const updated = await adoption.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error(`Adoption application couldn't be found.`)
    }
})

const getUserAccounts = asyncHandler(async (req, res) => {
    const users = await User.find()
    res.json(users)
})

const getAdminAccounts = asyncHandler(async (req, res) => {
    const admins = await Admin.find()
    res.json(admins)
})

const deleteUserAccount = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        await user.remove()
        res.json({ message: 'User account has been removed'})
    }
})

const deleteAdminAccount = asyncHandler(async (req, res) => {
    const admin = await Admin.findById(req.params.id)

    if (admin) {
        await admin.remove()
        res.json({ message: 'Admin account has been removed'})
    }
})

const createInterviewSched = asyncHandler(async (req, res) => {
    const { recipientEmail, date, time } = req.body
    const applicant = req.params.id

    if(!recipientEmail || !date || !time) {
        res.status(400)
        throw new Error('Please fill out all the necessary fields.')
    } else if (!applicant) {
        res.status(400)
        throw new Error('There is no applicant ID')
    } else {
        const interviewSchedSubmission = await InterviewSched.create({
            recipientEmail, date, time, applicant
        })

        if(interviewSchedSubmission) {
            res.status(201).json({
                recipientEmail: interviewSchedSubmission.recipientEmail,
                date: interviewSchedSubmission.date,
                time: interviewSchedSubmission.time,
                applicant: interviewSchedSubmission.applicant
            })
        } else {
            res.status(400)
            throw new Error('An error has occured')
        }
    }

    let mailOptions = {
        from: 'qjasalvador@tip.edu.ph',
        to: recipientEmail,
        subject: 'Marikina Veterinary Office - Interview for Adopting one of our animals',
        html: sendInterviewSchedTemplate(date, time)
    }

    emailTransport.sendMail(mailOptions, (error, info) => {
        if(error) {
            console.log(error)
        } else {
            console.log(`Email was sent to: ${info.response}`)
        }
    })
})

const getInterviewSched = asyncHandler(async (req, res) => {
    const interviewSched = await InterviewSched.find({ applicant: req.params.id })

    if(!interviewSched) {
        res.status(404)
        throw new Error('Interview Schedule not found')
    } else {
        res.json(interviewSched)
    }
})

const submitPickupMessage = asyncHandler(async (req, res) => {
    const { email, pickupDate, pickupTime, animalName, adopterName } = req.body

    if(!email || !pickupDate || !pickupTime || !animalName || !adopterName) {
        res.status(400)
        throw new Error('Please fill out all the fields')
    } else {
        let mailOptions = {
            from: 'qjasalvador@tip.edu.ph',
            to: email,
            subject: 'Your adoption has been accepted - FurryHope',
            html: pickupTemplate(pickupDate, pickupTime, animalName, adopterName)
        }

        emailTransport.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`Email was sent to: ${info.response}`)
            }
        })
    }
})

const getDonations = asyncHandler(async (req, res) => {
    const donations = await Donation.find()
    res.json(donations)
})

const getDonationById = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
    if(donation) {
        res.json(donation)
    } else {
        res.status(404)
        throw new Error('Could not find specific adoption')
    }
})

const deleteDonation = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)

    if(donation) {
        await donation.remove()
        res.json({ message: 'Removed donation.' })
    }
})

const receivedDonation = asyncHandler(async (req, res) => {
    const donation = await Donation.findById(req.params.id)
    const received = 'Received'

    if(donation) {
        donation.received = received
        const updated = await donation.save()
        res.json(updated)
    } else {
        res.status(404)
        throw new Error('Could not find donation')
    }
})

const addToInventory = asyncHandler(async (req, res) => {
    const { itemName, quantity, donatedBy, dateOfDonation } = req.body

    if(!itemName || !quantity || !donatedBy || !dateOfDonation)  {
        res.status(400)
        throw new Error('')
    } else {
        const addToInventorySubmission = await DonationInventory.create({
            itemName, quantity, donatedBy, dateOfDonation
        })

        if(addToInventorySubmission) {
            res.status(201).json({
                itemName: addToInventorySubmission.itemName,
                quantity: addToInventorySubmission.quantity,
                donatedBy: addToInventorySubmission.donatedBy,
                dateOfDonation: addToInventorySubmission.dateOfDonation
            })
        } else {
            res.status(400)
            throw new Error('An error occurred, could not add to the inventory.')
        }
    }
})

module.exports = {
    registerAdmin,
    authAdmin,
    getFeedbacks,
    getReports,
    getSpecificReport,
    dismissReport,
    getAllRegistrations,
    registerAnimal,
    getAdoptionSubmissions,
    getAdoptionSubmissionPerAnimal,
    getAdoptionById,
    deleteAdoptionById,
    updateAdoptionStatus,
    updateApplicationStatus,
    getUserAccounts,
    getAdminAccounts,
    deleteUserAccount,
    deleteAdminAccount,
    createInterviewSched,
    getInterviewSched,
    submitPickupMessage,
    getDonations,
    getDonationById,
    deleteDonation,
    receivedDonation,
    addToInventory,
};