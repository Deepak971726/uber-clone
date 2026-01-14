 
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Start from './pages/Start'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import CaptainSignup from './pages/CaptainSignup'
import CaptainLogin from './pages/CaptainLogin'
import UserProtectWrapper from './pages/UserProtectWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainLogout from './pages/CaptainLogout'
import CaptainProtectWrapper from './pages/CaptainProtectWrapper'

function App() {
   

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Start/>}/>
           
            
          
          <Route path='/home'
            element={ <UserProtectWrapper>
                      <Home/>
                    </UserProtectWrapper>
                   }/>
            
            <Route path='/logout' element={
              <UserProtectWrapper>
                <UserLogout/>
              </UserProtectWrapper>
            }/>
            
          <Route path='/captain-home' element={
            <CaptainProtectWrapper>
            <CaptainHome/>
            </CaptainProtectWrapper>
          }/>
          <Route path='/captain-logout' element={
            <CaptainProtectWrapper>
            <CaptainLogout/>
            </CaptainProtectWrapper>
          }/>
          
          
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='/captain-signup' element={<CaptainSignup/>} />
          <Route path='/captain-login' element={<CaptainLogin/>}/>
        </Routes>
        
      </BrowserRouter>
  )
}

export default App
