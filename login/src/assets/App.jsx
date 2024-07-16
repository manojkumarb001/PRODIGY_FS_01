
import './App.css'
import Home from './Home.jsx'
import LoginPage from './LoginPage.jsx'
import Register from './Register.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/login' element={<LoginPage />}></Route>

      </Routes>


    </BrowserRouter>
  )
}

export default App
