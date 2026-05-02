import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./Component/UserLayout/Layout";

import Landing from "./Pages/Landing";
import Aboutus from "./Component/UserLayout/Aboutus";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />} >
            <Route index element={<Landing />} />
            <Route path="/about" element={<Aboutus/>}/>
          </Route>
        
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
