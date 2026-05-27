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
import Trips from "./Pages/Trips";
import PaymentSuccess from "./pages/PaymentSuccess";
import { BookingCancel, BookingSuccess } from "./Pages/BookingStatus.jsx";
import { Toaster } from 'react-hot-toast';
import GalleryPage from "./Pages/GalleryPage .jsx";
import ScrollToTop from "./Component/Common/ScrollToTop.jsx";
import { useState } from "react";
import ChatbotModal
  from "./Component/ChatbotModal.jsx";
import { MessageCircle } from "lucide-react";

const App = () => {
  const [openChat, setOpenChat] =
    useState(false);
  return (
    <div>
      <BrowserRouter>
      <ScrollToTop />

  <Toaster
    position="top-center"
    reverseOrder={false}
  />
    {/* CHAT BUTTON */}

        <button
          onClick={() =>
            setOpenChat(true)
          }
          className="fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full bg-emerald-500 shadow-2xl flex items-center justify-center hover:scale-110 transition"
        >
          <MessageCircle
            size={28}
            className="text-black"
          />
        </button>

        {/* CHATBOT MODAL */}

        <ChatbotModal
          open={openChat}
          onClose={() =>
            setOpenChat(false)
          }
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
            <Route path="/contact-us" element={<Contactus/>}/>
            <Route path="feature/:id" element={<Everestfeature/>}/>
            <Route path="/nepal" element={<Nepal/>}/>
            <Route path="/bhutan" element={<Bhutan/>}/>
            <Route path="/tibet" element={<Tibet/>}/>
            <Route path="/trips" element={<Trips/>}/>
            <Route path="/payment-success" element={<PaymentSuccess />}/>
            <Route path="/booking-success" element={<BookingSuccess />} />
            <Route path="/booking-cancel" element={<BookingCancel />} />
            <Route path="/gallery" element={<GalleryPage />} />
           
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
