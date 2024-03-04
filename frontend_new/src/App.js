import './App.css';
import { Navbar } from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { WelcomePage } from './Pages/WelcomePage';
import { LoginSignupPage } from './Pages/LoginSignupPage';
import { AllAdsPage } from './Pages/AllAdsPage';
import { NewAdPage } from './Pages/NewAdPage';
import { AdDetailsPage } from './Pages/AdDetailsPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar/>

        <Routes>
          <Route path='/' element={<WelcomePage/>}/>
          <Route path='/bejelentkezes' element={<LoginSignupPage/>}/>
          <Route path='/hirdetesek' element={<AllAdsPage/>}>
            <Route path=':hirdetesId' element={<AdDetailsPage/>}/>
          </Route>
          <Route path='/ujhirdetes' element={<NewAdPage/>}/>


          <Route path='/login' element={<LoginSignupPage/>}/>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
