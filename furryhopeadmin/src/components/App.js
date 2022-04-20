import React from 'react'

// Pages
import Login from './Login'
import AddData from './AddData'
import AddAdmin from './AddAdmin'
import AccountsList from './AccountsList'
import ManageData from './ManageData'
import UpdateData from './UpdateData'
import AnimalRegistration from './AnimalRegistration'
import AdoptionApplications from './AdoptionApplications'
import Adoption from './Adoption'
import StrayAnimalReports from './StrayAnimalReports'
import Donations from './Donations'
import Error from '../components/Error404'

import '../css/App.css'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

/*
 To be added
 1. Form handling (error handling, null values on form fields, etc.)
 2. adoption (from the mobile app)
*/

const App = () => {
    return (
        <div className="body-app">  
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route path="/manage" component={ManageData} />
                    <Route path="/add" component={AddData} />
                    <Route path="/accountsList" component={AccountsList} />
                    <Route path="/addAdmin" component={AddAdmin} />
                    <Route path="/animalRegistration" component={AnimalRegistration} />
                    {/* <Route path="/adoptions" component={AdoptionApplications} /> */}
                    <Route path="/adoption/:id" component={Adoption} />
                    <Route path="/update/:id" component={UpdateData} />
                    <Route path="/reports" component={StrayAnimalReports} />
                    <Route path="/donations" component={Donations} />
                    <Route path="*" component={Error} />
                </Switch>  
            </Router>
        </div>
    )
}

export default App
