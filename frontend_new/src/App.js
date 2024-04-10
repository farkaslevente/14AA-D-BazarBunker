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
import { ProfilePage } from './Pages/ProfilePage';
import { OwnAdsPage } from './Pages/OwnAdsPage';
import { PasswordResetPage } from './Pages/PasswordResetPage';
import { SupportPage } from './Pages/SupportPage';
import { ProfilePicSelect } from './Pages/ProfilePicSelect';
import { ResetPasswordLogin } from './Pages/ResetPasswordLogin';
import { NewPasswordPage } from './Pages/NewPasswordPage';

import { ADMINPAGE } from './Pages/ADMINPAGE';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <BrowserRouter>
      <UserStoreProvider>
        <Navbar />

        <Routes>
          <Route path='/' element={<WelcomePage />} />
          <Route path='/bejelentkezes' element={<LoginPage />} />
          <Route path='/regisztracio' element={<RegisterPage />} />

          <Route path='/elfelejtettjelszo' element={<PasswordResetPage />} />
          <Route path='/elfelejtettjelszobejelentkezes' element={<ResetPasswordLogin />} />
          <Route path='/ujjelszo' element={<NewPasswordPage />} />

          <Route path='/hirdetesek' element={<AllAdsPage />} />
          <Route path='/hirdetes/:id' element={<AdDetailsPage />} />

          <Route element={<PrivateRoutes />}>
            <Route path='/ujhirdetes' element={<NewAdPage />} />
            <Route path='/sajathirdetesek' element={<OwnAdsPage />} />

            <Route path='/profil' element={<ProfilePage />} />
            <Route path='/profilkepek' element={<ProfilePicSelect />} />

            <Route path='/support' element={<SupportPage />} />

            <Route path='/adminpage' element={<ADMINPAGE />} />
          </Route>
        </Routes>

        <Footer />
      </UserStoreProvider>
    </BrowserRouter>
  );
}

export default App;
