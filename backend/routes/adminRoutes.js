const express = require('express')
const router = express.Router()
const {
    registerAdmin,
    getAdminInfo,
    authAdmin,
    getFeedbacks,
    getReports,
    getSpecificReport,
    getAdoptionSubmissions,
    getAdoptionSubmissionPerAnimal,
    getAdoptionById,
    deleteAdoptionById,
    updateAdoptionStatus,
    getAllRegistrations,
    registerAnimal,
    sendRegisteredMessage,
    updateApplicationStatus,
    getUserAccounts,
    getAdminAccounts,
    deleteUserAccount,
    deleteAdminAccount,
    dismissReport,
    createInterviewSched,
    getInterviewSched,
    submitPickupMessage,
    sendRejectMessage,
    getDonations,
    getDonationById,
    deleteDonation,
    receivedDonation,
    addToInventory,
    getDonationInventory,
    updateHasBeenInterviewed,
    updateAdmin,
    deleteFromInventory,
    getFeedback,
    deleteFeedback,
    updateFeedbackRead,
} = require('../controllers/adminControllers.js');

// Routes (/api/admins)
router.route('/').post(registerAdmin); // To add an admin account

router.route('/getAdmin/:id').get(getAdminInfo)

// Get user and admin accounts
router.route('/userAccounts').get(getUserAccounts)
router.route('/adminAccounts').get(getAdminAccounts)

router.route('/getFeedbacks').get(getFeedbacks)

router.route('/getFeedback/:id').get(getFeedback).delete(deleteFeedback)

router.route('/feedbackRead/:id').put(updateFeedbackRead)

router.route('/getReports').get(getReports)
router.route('/getReports/:id').get(getSpecificReport)
router.route('/dismissReport/:id').put(dismissReport)

// Delete user and admin accounts
router.route('/deleteUser/:id').delete(deleteUserAccount)
router.route('/deleteAdmin/:id').delete(deleteAdminAccount)

// endpoint when trying in postman (/api/admins/loginAdmin)
router.route('/loginAdmin').post(authAdmin) // To login

router.route('/updateAdmin/:id').put(updateAdmin)

router.route('/createInterviewSched/:id').post(createInterviewSched)

router.route('/getInterviewSched/:id').get(getInterviewSched)

router.route('/sendPickupMessage').post(submitPickupMessage)

router.route('/sendRejectMessage').post(sendRejectMessage)

router.route('/getDonations').get(getDonations)

router.route('/getDonationById/:id').get(getDonationById)

router.route('/deleteDonation/:id').delete(deleteDonation)

router.route('/updateReceivedDonation/:id').put(receivedDonation)

router.route('/addToDonationInventory').post(addToInventory)

router.route('/getDonationInventory').get(getDonationInventory)

router.route('/removeFromInventory/:id').delete(deleteFromInventory)

router.route('/adoptions').get(getAdoptionSubmissions)

router.route('/adoptionsPerAnimal/:id').get(getAdoptionSubmissionPerAnimal)

router.route('/adoptions/:id').get(getAdoptionById).delete(deleteAdoptionById)

router.route('/updateAdoptionStatus/:id').put(updateAdoptionStatus)

router.route('/hasBeenInterviewed/:id').put(updateHasBeenInterviewed)

router.route('/getAllRegistrations').get(getAllRegistrations)

router.route('/registerAnimal/:id').put(registerAnimal)

router.route('/sendRegisteredMessage').post(sendRegisteredMessage)

router.route('/updateApplication/:id').put(updateApplicationStatus)

module.exports = router;