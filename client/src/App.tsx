import { Routes, Route } from 'react-router';
import { HomePage } from './components/homepage';
import { NavBar } from "./components/navbar"
import  AuthPage  from './components/auth';
import LoginPage from './components/login';

function App() {
  return (
    <>
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<AuthPage/>} />
        {/* <Route path="/services" element={<ServiceList />} />
        <Route path="/create-service" element={<CreateServiceForm />} />
        <Route path="/profile" element={<ProfilePage />} />*/}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
      
    </>
  )
}

export default App
