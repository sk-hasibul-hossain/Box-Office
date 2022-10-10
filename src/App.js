//import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Navs from "./components/Navs";
import Home from "./pages/Home";
import Starred from "./pages/Starred";
import Show from "./pages/Show";

const theme = {
  mainColors: {
    blue: "#2400ff",
    gray: "#c6c6c6",
    dark: "#353535",
  },
};

function App() {
  //console.log("Hi");
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          {/*<Navs />*/}
          <Routes>
            <Route
              path="/"
              element={
                <Home />
                // <div>
                //   <h2>This is my home page</h2>
                // </div>
              }
            />
            <Route path="Home" element={<Home />} />
            <Route path="Starred" element={<Starred />} />
            <Route path="Show/:id" element={<Show />} />
            <Route path="*" element={<h2>404 error page</h2>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
