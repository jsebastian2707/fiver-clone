import { Routes, Route } from 'react-router';
import { HomePage } from './components/homepage';
import { NavBar } from "./components/navbar"
import RegisterPage  from './components/register';
import LoginPage from './components/login';
import ProfilePage from './components/profile';
import BecomeSellerPage from './components/becomeSeller';
import { Toaster } from "@/components/ui/sonner";


function App() {
  return (
    <>
      <Toaster position="top-right" richColors /> 
      <NavBar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/register" element={<RegisterPage/>} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/becomeSeller" element={<BecomeSellerPage />}/>
        {/* <Route path="/services" element={<ServiceList />} />
        <Route path="/create-service" element={<CreateServiceForm />} />
        <Route path="/profile" element={<ProfilePage />} />*/}
        <Route path="*" element={<h2>404 - Página no encontrada</h2>} />
      </Routes>
      
    </>
  )
}

export default App
