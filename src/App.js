import { Routes, Route } from "react-router-dom";
import Home from "./routes/home/home.component";
import Navigation from "./routes/navigation/navigation.component";
import Authentication from "./routes/authentication/authentication.component";

const Shop = () => {
  return(
    <div>
        I am the shop page
    </div>
  );
};

const App = () => {
  return (
    //Render specifik components based on the url. This only can happen if the <App/> is nested inside
    //the <BrowserRouter/> component (se it in index.js)
    <Routes>
      <Route path="/" element={<Navigation/>}>
        {/* Index says: if the url ends with / render always the children Route with index */}
        <Route index element={<Home/>}/>
        <Route path="shop" element={<Shop/>}/>
        <Route path="auth" element={<Authentication/>}/>
      </Route>
    </Routes>
  );
};

export default App;