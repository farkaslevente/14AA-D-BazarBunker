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

//Route protection
import PrivateRoutes from './utils/PrivateRoutes';
import ReversePrivateRoutes from './utils/ReversePrivateRoutes';
import { useEffect, useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('isLoggedIn') === 'true');
  useEffect(() => {

    if (!localStorage.getItem('isLoggedIn')) {
      localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    }
  }, [isLoggedIn]);
  return (
    <BrowserRouter>
      <UserStoreProvider>
        <Navbar />

        <Routes>
          {/* Can access any time */}
          <Route path='/' element={<WelcomePage />} />
          <Route path='/hirdetesek' element={<AllAdsPage />} />
          <Route path='/hirdetes/:id' element={<AdDetailsPage />} />

          {/* Can't access once logged in */}
          <Route element={<ReversePrivateRoutes />}>
            <Route path='/bejelentkezes' element={<LoginPage />} />
            <Route path='/regisztracio' element={<RegisterPage />} />
            <Route path='/elfelejtettjelszo' element={<PasswordResetPage />} />
            <Route path='/elfelejtettjelszobejelentkezes' element={<ResetPasswordLogin />} />
          </Route>

          {/*Can't access once logged out*/}
          <Route element={<PrivateRoutes />}>
            <Route path='/ujjelszo' element={<NewPasswordPage />} />

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
