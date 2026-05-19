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


const App = () => {
  return (
    <div>
      <BrowserRouter>
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
            <Route path="/butan" element={<Bhutan/>}/>
            <Route path="/tibet" element={<Tibet/>}/>
            
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
