import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UserStoreProvider } from './Stores/userStore';

//Components
import { Footer } from './Components/Footer/Footer';
import { Navbar } from './Components/Navbar/Navbar';

//Pages
import { WelcomePage } from './Pages/WelcomePage';
import { LoginPage } from './Pages/LoginPage';
import { AllAdsPage } from './Pages/AllAdsPage';
import { NewAdPage } from './Pages/NewAdPage';
import { AdDetailsPage } from './Pages/AdDetailsPage';
import { RegisterPage } from './Pages/RegisterPage';
import { DataRegisterPage } from './Pages/DataRegisterPage';
import { ProfilePage } from './Pages/ProfilePage';
import { OwnAdsPage } from './Pages/OwnAdsPage';
import { PasswordResetPage } from './Pages/PasswordResetPage';
import { SupportPage } from './Pages/SupportPage';
import { ProfilePicSelect } from './Pages/ProfilePicSelect';
import { ADMINPAGE } from './Pages/ADMINPAGE';

function App() {
  return (
    <BrowserRouter>
      <UserStoreProvider>
        <Navbar />

        <Routes>
          <Route path='/adminpage' element={<ADMINPAGE/>} />
          <Route path='/' element={<WelcomePage/>} />
          <Route path='/bejelentkezes' element={<LoginPage />} />
          <Route path='/regisztracio' element={<RegisterPage />} />
          <Route path='/elfelejtettjelszo' element={<PasswordResetPage />} />

          <Route path='/adatregisztracio' element={<DataRegisterPage />} />

          <Route path='/hirdetesek' element={<AllAdsPage />}/>
          <Route path='/hirdetes/:id' element={<AdDetailsPage />} />

          <Route path='/ujhirdetes' element={<NewAdPage />} />
          <Route path='/sajathirdetesek' element={<OwnAdsPage />} />

          <Route path='/profil' element={<ProfilePage />} />
          <Route path='/profilkepek' element={<ProfilePicSelect />} />

          <Route path='/support' element={<SupportPage/>} />

        </Routes>

        <Footer />
      </UserStoreProvider>
    </BrowserRouter>
  );
}

export default App;
