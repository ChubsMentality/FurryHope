import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import { 
    addAdminReducer, 
    adminLoginReducer, 
    getAnimalRegistrationsReducer,
    registerAnimalReducer, 
    adoptionApplicationsReducer, 
    adoptionDeleteReducer, 
    adoptionUpdateReducer, 
    deleteAdminAccReducer, 
    deleteUserAccReducer, 
    strayAnimalReportsReducer, 
    dismissReportReducer, 
    getSpecificAdoptionReducer,
    getInterviewSchedReducer,
    sendInterviewMessageReducer, 
    getDonationsReducer,
    deleteDonationReducer,
    hasBeenInterviewedReducer,
    receivedDonationReducer,
    addtoInventoryReducer,
    getInventoryReducer,
    getFeedbacksReducer,
    deleteFeedbackReducer,
    feedbackViewedReducer,
} from './reducers/adminReducers'
import { animalCreateReducer, animalDataReducer, animalDeleteReducer, animalUpdateReducer } from './reducers/animalReducer'

const reducer = combineReducers({
    // This will contain all of the reducers
    adminLogin: adminLoginReducer,
    addAdmin: addAdminReducer,
    animalData: animalDataReducer,
    animalCreate: animalCreateReducer,
    animalUpdate: animalUpdateReducer,
    animalDelete: animalDeleteReducer,
    getRegistrations: getAnimalRegistrationsReducer,
    animalRegister: registerAnimalReducer,
    adoptionApplications: adoptionApplicationsReducer,
    specificAdoptionState: getSpecificAdoptionReducer,
    adoptionDelete: adoptionDeleteReducer,
    adoptionUpdate: adoptionUpdateReducer,
    adminAccDelete: deleteAdminAccReducer,
    userAccDelete: deleteUserAccReducer,
    strayReports: strayAnimalReportsReducer,
    dismissReport: dismissReportReducer,
    getInterviewSchedState: getInterviewSchedReducer,
    sendInterviewMessageState: sendInterviewMessageReducer,
    getDonationsState: getDonationsReducer,
    donationDelete: deleteDonationReducer, 
    interviewedState: hasBeenInterviewedReducer,
    receivedDonation: receivedDonationReducer,
    addToInventoryState: addtoInventoryReducer,
    donationInventoryState: getInventoryReducer,
    feedbacksState: getFeedbacksReducer,
    deleteFeedbackState: deleteFeedbackReducer,
    feedbackViewedState: feedbackViewedReducer,
})

// Gets the admin info from the local storage
const adminInfoFromStorage = localStorage.getItem('adminInfo') ? JSON.parse(localStorage.getItem('adminInfo')) : null

const initialState = {
    adminLogin: { adminInfo: adminInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store;


/*

 FLOW OF REDUX

 UI -> action -> reducer -> store
 !                            !
 ------------------------------

 - The UI dispatches a certain action and will dispatch the reducer and it will update the store
   then the store will update the value of the state which will then update the UI.
 
*/