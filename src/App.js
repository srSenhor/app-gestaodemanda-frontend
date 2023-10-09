import { BrowserRouter, Routes, Route } from "react-router-dom";
import PageHome from "./pages/pageHome";
import PageLogin from "./pages/pageLogin";
import PageSignup from "./pages/pageSignup";
import PageMain from "./pages/pageMain";

export default function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route index element = {<PageHome/>}/>
          <Route path = '/' element = {<PageHome/>}/>
          <Route path = '/login' element = {<PageLogin/>}/>
          <Route path = '/signup' element = {<PageSignup/>}/>
          <Route path = '/main' element = {<PageMain/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
