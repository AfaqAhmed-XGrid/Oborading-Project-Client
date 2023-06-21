import React from 'react'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import { Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import { Toaster } from 'react-hot-toast'
import ForgotPassword from './pages/ForgotPassword'
import UserProfile from './pages/UserProfile'
import ChangePassword from './pages/ChangePassword'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/signin' element=<Signin />/>
        <Route path='/signup' element=<Signup />/>
        <Route path='/forgotpassword' element=<ForgotPassword />/>
        <Route path='/changepassword' element=<ChangePassword />/>
        <Route path='/userprofile' element=<UserProfile />/>
      </Routes>
      <Toaster />
    </div>
  )
}

export default App
