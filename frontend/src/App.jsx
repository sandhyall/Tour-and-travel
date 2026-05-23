import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/UserLayout/Layout";

import Landing from "./Pages/Landing";
import Aboutus from "./Component/UserLayout/Aboutus";
import MeetOurTeam from "./Component/Common/MeetOurTeam";
import WhyAce from "./Component/Feature/WhyAce";
import CorporateSocialInitiative from "./Component/Feature/CorporateSocialInitiative";
import LegalDocuments from "./Component/Feature/legaldoucment";
import TermsAndCondition from "./Component/Feature/TermsAndCondition";
import Newsletter from "./Component/Feature/Newsletter";
import Contactus from "./Component/Feature/Contactus";
import Everestfeature from "./Pages/Everestfeature";
import Nepal from "./Pages/Nepal";
import Bhutan from "./Pages/Bhutan";
import Tibet from "./Pages/Tibet";
import PaymentSuccess from "./pages/PaymentSuccess";
import { BookingCancel, BookingSuccess } from "./Pages/BookingStatus.jsx";
import { Toaster } from 'react-hot-toast';

const App = () => {
  return (
    <div>
      <BrowserRouter>
      <Toaster
        position="top-center"
        reverseOrder={false}
      />
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Landing />} />
            <Route path="/About-us" element={<Aboutus/>}/>
            <Route path="/meet-our-team" element={<MeetOurTeam/>}/>
            <Route path="/why-ace" element={<WhyAce/>}/>
            <Route path="/csi" element={<CorporateSocialInitiative/>}/>
            <Route path="/legal-documents" element={<LegalDocuments/>}/>
            <Route path="/terms-and-conditions" element={<TermsAndCondition/>}/>
            <Route path="/sign-up-for-newsletter" element={<Newsletter/>}/>
            <Route path="/contact" element={<Contactus/>}/>
            <Route path="feature/:id" element={<Everestfeature/>}/>
            <Route path="/nepal" element={<Nepal/>}/>
            <Route path="/butan" element={<Bhutan/>}/>
            <Route path="/tibet" element={<Tibet/>}/>
            <Route path="/payment-success" element={<PaymentSuccess />}/>
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-cancel" element={<BookingCancel />} />
           
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
