import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { defaults } from 'chart.js/auto';
import Home from "./routes/home";
import HealthProtal from "./routes/healthProtal";
import Login from "./components/login-signup/Login";
import Signup from "./components/login-signup/Signup";
import './index.css';
import './CSS/App.css'
import { GlobalProvider } from "./components/Context/Globalcontext";
import ToastWrapper from "./components/toastMessage/Index";
import DonationPage from "./routes/DonationPage";
<<<<<<< HEAD
import TestCart from "./routes/TestCart";
import SelectTest from "./routes/SelectTest";
=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751

defaults.responsive = true;
defaults.maintainAspectRatio = false
defaults.plugins.title.display = true;
defaults.plugins.title.align = "center";
defaults.plugins.title.font.size = 25;
defaults.plugins.title.color = "#5ca64f";

const root = document.getElementById("root");


ReactDOM.createRoot(root).render(
  <GlobalProvider>
    <BrowserRouter>
      <div className="main">
        <ToastWrapper/>
        <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/healthProtal" element={<HealthProtal />} />
          <Route path="/publicDonation" element={<DonationPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
<<<<<<< HEAD
          <Route path="/testCart" element={<TestCart/>} />
          <Route path="/selectTest" element={<SelectTest/>} />
=======
>>>>>>> d793f951326096cdb28314716fb9557a3606c751

        </Routes>
      </div>
    </BrowserRouter>
  </GlobalProvider>
);