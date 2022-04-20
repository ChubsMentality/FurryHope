const express = require('express')
const router = express.Router()
const {
    registerAdmin,
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
    updateApplicationStatus,
    getUserAccounts,
    getAdminAccounts,
    deleteUserAccount,
    deleteAdminAccount,
    dismissReport,
    createInterviewSched,
    getInterviewSched,
    submitPickupMessage,
    getDonations,
    getDonationById,
    deleteDonation,
    receivedDonation,
    addToInventory,
} = require('../controllers/adminControllers.js');

// Routes (/api/admins)
router.route('/').post(registerAdmin); // To add an admin account

// Get user and admin accounts
router.route('/userAccounts').get(getUserAccounts)
router.route('/adminAccounts').get(getAdminAccounts)

router.route('/getFeedbacks').get(getFeedbacks)

router.route('/getReports').get(getReports)
router.route('/getReports/:id').get(getSpecificReport)
router.route('/dismissReport/:id').put(dismissReport)

// Delete user and admin accounts
router.route('/deleteUser/:id').delete(deleteUserAccount)
router.route('/deleteAdmin/:id').delete(deleteAdminAccount)

// endpoint when trying in postman (/api/admins/loginAdmin)
router.route('/loginAdmin').post(authAdmin) // To login

router.route('/createInterviewSched/:id').post(createInterviewSched)

router.route('/getInterviewSched/:id').get(getInterviewSched)

router.route('/sendPickupMessage').post(submitPickupMessage)

router.route('/getDonations').get(getDonations)

router.route('/getDonationById/:id').get(getDonationById)

router.route('/deleteDonation/:id').delete(deleteDonation)

router.route('/updateReceivedDonation/:id').put(receivedDonation)

router.route('/addToDonationInventory').post(addToInventory)

router.route('/adoptions').get(getAdoptionSubmissions)

router.route('/adoptionsPerAnimal/:id').get(getAdoptionSubmissionPerAnimal)

router.route('/adoptions/:id').get(getAdoptionById).delete(deleteAdoptionById)

router.route('/updateAdoptionStatus/:id').put(updateAdoptionStatus)

router.route('/getAllRegistrations').get(getAllRegistrations)

router.route('/registerAnimal/:id').put(registerAnimal)

router.route('/updateApplication/:id').put(updateApplicationStatus)

module.exports = router;